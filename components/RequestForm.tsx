"use client";

import { useState, type FormEvent } from "react";

type Lang = "nl" | "fr" | "en";
type UploadedPhoto = { pathname: string; name: string };

const copy = {
  nl: {
    title:"Dienst aanvragen", intro:"Vertel ons kort wat er moet gebeuren. Met enkele foto's kunnen we uw aanvraag sneller inschatten.",
    name:"Naam", email:"E-mail", phone:"Telefoon", location:"Postcode / gemeente", address:"Volledig adres (optioneel)",
    service:"Type dienst", description:"Wat moet er gebeuren?", timing:"Gewenste timing", photos:"Foto's (optioneel)",
    photoHelp:"Maximaal 6 foto's. Foto's helpen ons om uw aanvraag sneller in te schatten.",
    choose:"Foto's kiezen", submit:"Aanvraag versturen", sending:"Aanvraag versturen…",
    services:["Kleine herstellingen & woningservice","Verhuur- of verkoopklaar maken","Inspectie, plaatsbeschrijving & sleutelservice","Andere / meerdere diensten"],
    timings:["Zo snel mogelijk","Binnen 1 week","Binnen 2-4 weken","Flexibel / in overleg"],
    select:"Maak een keuze", success:"Bedankt. Uw aanvraag is goed ontvangen. We nemen zo snel mogelijk contact met u op.",
    error:"Er ging iets mis. Probeer opnieuw of neem contact op via WhatsApp.", whatsapp:"Liever via WhatsApp?",
    back:"← Terug naar Rent Ready", required:"Verplicht"
  },
  fr: {
    title:"Demander un service", intro:"Décrivez brièvement ce qu'il faut faire. Quelques photos nous permettent d'évaluer votre demande plus rapidement.",
    name:"Nom", email:"E-mail", phone:"Téléphone", location:"Code postal / commune", address:"Adresse complète (optionnel)",
    service:"Type de service", description:"Que faut-il faire ?", timing:"Délai souhaité", photos:"Photos (optionnel)",
    photoHelp:"Maximum 6 photos. Elles nous aident à évaluer votre demande plus rapidement.",
    choose:"Choisir des photos", submit:"Envoyer la demande", sending:"Envoi de la demande…",
    services:["Petites réparations & services pour le logement","Préparation à la location ou à la vente","Inspection, état des lieux & gestion des clés","Autre / plusieurs services"],
    timings:["Dès que possible","Dans la semaine","Dans 2 à 4 semaines","Flexible / à convenir"],
    select:"Faites un choix", success:"Merci. Votre demande a bien été reçue. Nous vous contacterons dès que possible.",
    error:"Une erreur s'est produite. Réessayez ou contactez-nous via WhatsApp.", whatsapp:"Vous préférez WhatsApp ?",
    back:"← Retour à Rent Ready", required:"Obligatoire"
  },
  en: {
    title:"Send a request", intro:"Tell us briefly what needs to be done. A few photos help us assess your request more quickly.",
    name:"Name", email:"Email", phone:"Phone", location:"Postcode / municipality", address:"Full address (optional)",
    service:"Type of service", description:"What needs to be done?", timing:"Preferred timing", photos:"Photos (optional)",
    photoHelp:"Maximum 6 photos. Photos help us assess your request more quickly.",
    choose:"Choose photos", submit:"Send request", sending:"Sending request…",
    services:["Small repairs & property services","Preparing a property for rent or sale","Inspection, condition report & key service","Other / multiple services"],
    timings:["As soon as possible","Within 1 week","Within 2-4 weeks","Flexible / to be agreed"],
    select:"Select an option", success:"Thank you. We received your request and will contact you as soon as possible.",
    error:"Something went wrong. Please try again or contact us via WhatsApp.", whatsapp:"Prefer WhatsApp?",
    back:"← Back to Rent Ready", required:"Required"
  }
} as const;

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) throw new Error("invalid-file");
  const bitmap = await createImageBitmap(file);
  const max = 1600;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("image-processing");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", .82));
  if (!blob) throw new Error("image-processing");
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type:"image/jpeg" });
}

export default function RequestForm({lang}:{lang:Lang}) {
  const t=copy[lang];
  const [files,setFiles]=useState<File[]>([]);
  const [busy,setBusy]=useState(false);
  const [done,setDone]=useState(false);
  const [error,setError]=useState("");

  async function uploadPhoto(file: File): Promise<UploadedPhoto> {
    const compressed=await compressImage(file);
    if (compressed.size > 3.5*1024*1024) throw new Error("file-too-large");
    const fd=new FormData();
    fd.append("file", compressed);
    const res=await fetch("/api/request-photo",{method:"POST",body:fd});
    if(!res.ok) throw new Error("upload");
    return res.json();
  }

  async function onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const formEl=e.currentTarget;
      const data=new FormData(formEl);
      const photos:UploadedPhoto[]=[];
      for(const file of files) photos.push(await uploadPhoto(file));
      const payload={
        lang,
        name:String(data.get("name")||""), email:String(data.get("email")||""), phone:String(data.get("phone")||""),
        location:String(data.get("location")||""), address:String(data.get("address")||""),
        service:String(data.get("service")||""), description:String(data.get("description")||""),
        timing:String(data.get("timing")||""), website:String(data.get("website")||""), photos
      };
      const res=await fetch("/api/request",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
      if(!res.ok) throw new Error("submit");
      setDone(true); formEl.reset(); setFiles([]);
      if(typeof window!=="undefined" && "gtag" in window) (window as any).gtag("event","generate_lead",{method:"request_form"});
    } catch { setError(t.error); }
    finally { setBusy(false); }
  }

  if(done) return <div className="request-success"><h2>{t.title}</h2><p>{t.success}</p><a className="btn btn-gold" href={`/${lang}`}>{t.back}</a></div>;

  return <form className="request-form" onSubmit={onSubmit}>
    <div className="request-heading"><h1>{t.title}</h1><p>{t.intro}</p></div>
    <div className="request-grid">
      <label>{t.name}<span>*</span><input name="name" required autoComplete="name"/></label>
      <label>{t.email}<span>*</span><input name="email" type="email" required autoComplete="email"/></label>
      <label>{t.phone}<span>*</span><input name="phone" type="tel" required autoComplete="tel"/></label>
      <label>{t.location}<span>*</span><input name="location" required autoComplete="postal-code"/></label>
      <label className="wide">{t.address}<input name="address" autoComplete="street-address"/></label>
      <label>{t.service}<span>*</span><select name="service" required defaultValue=""><option value="" disabled>{t.select}</option>{t.services.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>{t.timing}<span>*</span><select name="timing" required defaultValue=""><option value="" disabled>{t.select}</option>{t.timings.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="wide">{t.description}<span>*</span><textarea name="description" required rows={6}/></label>
      <div className="wide photo-field"><strong>{t.photos}</strong><p>{t.photoHelp}</p><label className="file-button">{t.choose}<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e=>setFiles(Array.from(e.target.files||[]).slice(0,6))}/></label>{files.length>0&&<span className="file-count">{files.length}/6</span>}</div>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
    </div>
    {error&&<p className="form-error" role="alert">{error}</p>}
    <div className="request-submit"><button className="btn btn-gold" disabled={busy}>{busy?t.sending:t.submit}</button><a href="https://wa.me/32456990622">{t.whatsapp}</a></div>
  </form>;
}
