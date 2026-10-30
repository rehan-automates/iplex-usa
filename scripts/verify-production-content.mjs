import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function loadContent(environment) {
  const cache = new Map();
  function load(name) {
    if (cache.has(name)) return cache.get(name);
    if (name.endsWith(".json")) {
      // JSON modules (lib/asset-manifest.json): expose the data as the default export, like a bundler would.
      const data = JSON.parse(readFileSync(`lib/${name}`, "utf8"));
      const jsonExports = { ...data, default: data };
      cache.set(name, jsonExports);
      return jsonExports;
    }
    const exports = {};
    cache.set(name, exports);
    const { outputText } = ts.transpileModule(readFileSync(`lib/${name}.ts`, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    });
    vm.runInNewContext(outputText, {
      exports,
      require: (path) => load(path.replace(/^\.\//, "")),
      process: { env: { NODE_ENV: environment } },
      Intl,
      Date,
    });
    return exports;
  }
  return load("content");
}

function snapshot(content) {
  return JSON.stringify({
    work: content.visible(content.workProjects),
    blog: content.visible(content.blogPosts),
    team: content.teamForDisplay(),
    socials: content.visible(content.siteInfo.socials),
    legal: content.visible(content.siteInfo.legal),
    faq: content.visibleFaq(),
    draftEntry: content.visible([{ draft: true }]),
  });
}

const content = loadContent("production");
assert.equal(snapshot(content), snapshot(loadContent("development")), "Development and production content must match");
assert.equal(content.visible([{ draft: true }]).length, 1, "Draft metadata must not hide client preview content");

const team = content.teamForDisplay().members;
assert(team.length >= 3, "The team section must show all existing preview profiles");
const routes = ["/", "/about", "/services", "/contact", "/work", "/blog", "/privacy", "/terms",
  ...content.workProjects.map(({ slug }) => `/work/${slug}`),
  ...content.blogPosts.map(({ slug }) => `/blog/${slug}`)];
const artifact = (route) => `.next/server/app/${route === "/" ? "index" : route.slice(1)}.html`;
const pages = new Map(routes.map((route) => [route, readFileSync(artifact(route), "utf8")]));

for (const member of team) {
  assert(pages.get("/about").includes(member.name), `Production About page is missing ${member.name}`);
  assert(pages.get("/about").includes(member.photo.src), `Production About page is missing ${member.name}'s image`);
  assert(existsSync(`public${member.photo.src}`), `Missing team photo: ${member.photo.src}`);
}

for (const [route, className, expected] of [["/", "work-card", content.workProjects.length], ["/work", "work-card", content.workProjects.length], ["/", "blog-card", content.blogPosts.length], ["/blog", "blog-card", content.blogPosts.length]]) {
  const cards = [...pages.get(route).matchAll(/<article class="([^"]+)"/g)].filter((match) => match[1].split(" ").includes(className));
  assert.equal(cards.length, expected, `${route} must contain every ${className}`);
}

for (const [route, html] of pages) {
  assert(!html.includes("draft-badge"), `${route} contains a draft badge`);
  assert(!html.includes("/assets/placeholder.svg"), `${route} contains a placeholder image`);
  for (const { label } of content.siteInfo.legal) assert(html.includes(label), `${route} is missing footer link ${label}`);
  for (const { label } of content.siteInfo.socials) assert(html.includes(label), `${route} is missing social link ${label}`);
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="(\/[^"#?]*)[^"]*"/g)) {
    if (href.startsWith("//")) continue;
    assert(existsSync(artifact(href.replace(/\/$/, "") || "/")), `${route} links to missing page ${href}`);
  }
}

console.log(`Verified ${routes.length} production pages: development parity, ${team.length} team profiles, all work/blog cards, footer links, and internal destinations.`);
