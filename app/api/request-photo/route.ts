import { put } from "@vercel/blob";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !file.type.startsWith("image/")) return Response.json({error:"Invalid file"},{status:400});
    if (file.size > 3.5 * 1024 * 1024) return Response.json({error:"File too large"},{status:413});
    const safe = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g,"-").slice(-80);
    const blob = await put(`requests/${Date.now()}-${safe}`, file, { access:"private", addRandomSuffix:true });
    return Response.json({ pathname:blob.pathname, name:file.name });
  } catch {
    return Response.json({error:"Upload failed"},{status:500});
  }
}
