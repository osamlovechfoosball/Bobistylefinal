const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const logoPath = path.join(root, "assets", "img", "logo", "logo.png");
const outputPath = path.join(
  root,
  "assets",
  "img",
  "social",
  "bobi-style-social-preview-v1.png"
);

const width = 1200;
const height = 630;

const background = Buffer.from(`
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
       xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg" cx="50%" cy="43%" r="72%">
        <stop offset="0%" stop-color="#1b2029"/>
        <stop offset="48%" stop-color="#10141a"/>
        <stop offset="100%" stop-color="#050609"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
  </svg>
`);

async function createSocialPreview() {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const logo = await sharp(logoPath)
    .resize({ width: 620, height: 560, fit: "contain", withoutEnlargement: true })
    .png()
    .toBuffer();

  await sharp(background)
    .composite([{ input: logo, gravity: "centre" }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath);

  const metadata = await sharp(outputPath).metadata();
  console.log(`${outputPath} (${metadata.width}x${metadata.height}, ${metadata.channels} channels)`);
}

createSocialPreview().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
