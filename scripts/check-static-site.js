const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const pages = [
    "index.html",
    "about.html",
    "services.html",
    "gallery.html",
    "contact.html",
    "privacy-policy.html",
    "cookies.html",
    "terms.html",
    "404.html"
];

const stalePatterns = [
    /Portfolio/i,
    /Blog/i,
    /contact_process/i,
    /from\.html/i,
    /AIza/i,
    /Barber HTML/i,
    /support@colorlib/i,
    /youremail/i,
    /Buttonwood/i,
    /Rosemead/i,
    /patrick/i
];

const missing = [];
const stale = [];

function isExternal(value) {
    return /^(https?:|tel:|mailto:|viber:|data:|javascript:|#)/i.test(value);
}

for (const page of pages) {
    const fullPath = path.join(root, page);
    if (!fs.existsSync(fullPath)) {
        missing.push(page);
        continue;
    }

    const html = fs.readFileSync(fullPath, "utf8");
    const visibleText = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ");
    for (const pattern of stalePatterns) {
        if (pattern.test(visibleText)) {
            stale.push(`${page}: ${pattern}`);
        }
    }

    const attrs = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);
    for (const attr of attrs) {
        if (isExternal(attr)) {
            continue;
        }
        const withoutHash = attr.split("#")[0];
        if (!withoutHash) {
            continue;
        }
        const local = path.join(root, withoutHash.replace(/^\.\//, ""));
        if (!fs.existsSync(local)) {
            missing.push(`${page} -> ${attr}`);
        }
    }
}

if (missing.length || stale.length) {
    console.error("Static check failed");
    if (missing.length) {
        console.error("Missing local references:");
        missing.forEach((item) => console.error(`- ${item}`));
    }
    if (stale.length) {
        console.error("Stale template text:");
        stale.forEach((item) => console.error(`- ${item}`));
    }
    process.exit(1);
}

console.log("Static check passed.");
