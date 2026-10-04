import { issueSignedToken, presignUrl } from "@vercel/blob";

export const runtime = "nodejs";

type Photo={pathname:string;name:string};
type Body={lang?:string;name?:string;email?:string;phone?:string;location?:string;address?:string;service?:string;description?:string;timing?:string;website?:string;photos?:Photo[]};

const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]||c));
const val=(x:unknown,max=4000)=>typeof x==="string"?x.trim().slice(0,max):"";

async function sendEmail(payload:unknown){
  const key=process.env.RESEND_API_KEY;
  if(!key) throw new Error("Missing RESEND_API_KEY");
  const res=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"authorization":`Bearer ${key}`,"content-type":"application/json"},body:JSON.stringify(payload)});
  if(!res.ok) throw new Error(`Resend ${res.status}`);
}

export async function POST(request:Request){
  try{
    const b=(await request.json()) as Body;
    if(val(b.website)) return Response.json({ok:true});
    const name=val(b.name,120), email=val(b.email,200), phone=val(b.phone,80), location=val(b.location,160);
    const address=val(b.address,300), service=val(b.service,200), description=val(b.description,5000), timing=val(b.timing,160);
    if(!name||!email||!phone||!location||!service||!description||!timing||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Response.json({error:"Invalid request"},{status:400});
    const photos=Array.isArray(b.photos)?b.photos.slice(0,6).filter(p=>p&&typeof p.pathname==="string"&&p.pathname.startsWith("requests/")):[];
    const links:string[]=[];
    for(const p of photos){
      const validUntil=Date.now()+7*24*60*60*1000;
      const token=await issueSignedToken({pathname:p.pathname,operations:["get"],validUntil});
      const {presignedUrl}=await presignUrl(token,{pathname:p.pathname,operation:"get",validUntil});
      links.push(`<li><a href="${presignedUrl}">${esc(p.name||"Foto")}</a> <small>(link 7 dagen geldig)</small></li>`);
    }
    const adminHtml=`<h2>Nieuwe aanvraag via rentready.be</h2><p><strong>Naam:</strong> ${esc(name)}<br><strong>E-mail:</strong> ${esc(email)}<br><strong>Telefoon:</strong> ${esc(phone)}<br><strong>Postcode/gemeente:</strong> ${esc(location)}<br><strong>Adres:</strong> ${esc(address||"-")}<br><strong>Dienst:</strong> ${esc(service)}<br><strong>Timing:</strong> ${esc(timing)}</p><h3>Beschrijving</h3><p>${esc(description).replace(/\n/g,"<br>")}</p>${links.length?`<h3>Foto's</h3><ul>${links.join("")}</ul>`:"<p><em>Geen foto's toegevoegd.</em></p>"}`;
    await sendEmail({from:"Rent Ready Website <website@rentready.be>",to:["info@rentready.be"],reply_to:email,subject:`Nieuwe aanvraag - ${name} - ${location}`,html:adminHtml});
    const lang=b.lang==="fr"?"fr":b.lang==="en"?"en":"nl";
    const confirmations={
      nl:{subject:"We hebben uw aanvraag ontvangen | Rent Ready",body:`Beste ${esc(name)},<br><br>Bedankt voor uw aanvraag bij Rent Ready. We hebben uw gegevens goed ontvangen en nemen zo snel mogelijk contact met u op.<br><br>Met vriendelijke groet,<br>Rent Ready`},
      fr:{subject:"Nous avons bien reçu votre demande | Rent Ready",body:`Bonjour ${esc(name)},<br><br>Merci pour votre demande auprès de Rent Ready. Nous l'avons bien reçue et nous vous contacterons dès que possible.<br><br>Bien à vous,<br>Rent Ready`},
      en:{subject:"We received your request | Rent Ready",body:`Hello ${esc(name)},<br><br>Thank you for your request. Rent Ready has received your details and we will contact you as soon as possible.<br><br>Kind regards,<br>Rent Ready`}
    }[lang];
    await sendEmail({from:"Rent Ready <info@rentready.be>",to:[email],reply_to:"info@rentready.be",subject:confirmations.subject,html:`<p>${confirmations.body}</p>`});
    return Response.json({ok:true});
  }catch(e){console.error(e);return Response.json({error:"Submission failed"},{status:500});}
}
