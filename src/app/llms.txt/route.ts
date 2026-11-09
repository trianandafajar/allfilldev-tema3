import { siteConfig } from "@/config/site";
import { getAllPages } from "@/lib/site-pages";
import { absoluteUrl } from "@/lib/seo";

export function GET() {
  const pages = getAllPages()
    .map((page) => `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`)
    .join("\n");

  const body = `# ${siteConfig.name}\n\n> ${siteConfig.description}\n\n## Halaman\n\n${pages}\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
