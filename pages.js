import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    try {
      const pages    = await kv.get("kb_pages")    || null;
      const sections = await kv.get("kb_sections") || null;
      const tagmap   = await kv.get("kb_tagmap")   || null;
      return res.status(200).json({ pages, sections, tagmap });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { pages, sections, tagmap, password } = req.body;
      if (password !== process.env.MGR_PW) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      if (pages)    await kv.set("kb_pages",    pages);
      if (sections) await kv.set("kb_sections", sections);
      if (tagmap)   await kv.set("kb_tagmap",   tagmap);
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
