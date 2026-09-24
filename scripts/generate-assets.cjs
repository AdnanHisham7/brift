const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generate() {
  const publicDir = path.join(__dirname, '..', 'public');
  const logoPath = path.join(publicDir, 'logo.png');

  console.log('Reading source logo from:', logoPath);
  const trimmedBuf = await sharp(logoPath).trim().toBuffer();
  
  // 1. High-res clean transparent white logo (public/logo.png & src/assets/logo-mark.png)
  const cleanLogoBuf = await sharp(trimmedBuf).resize({ width: 1200 }).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo.png'), cleanLogoBuf);
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'assets', 'logo-mark.png'), cleanLogoBuf);
  console.log('Saved clean public/logo.png and src/assets/logo-mark.png');

  // 2. Generate blue tinted logo (for light backgrounds where white is invisible)
  const { data, info } = await sharp(trimmedBuf).raw().toBuffer({ resolveWithObject: true });
  const blueData = Buffer.from(data);
  for (let i = 0; i < blueData.length; i += 4) {
    if (blueData[i+3] > 10) {
      blueData[i] = 58;    // R: #3A46E1
      blueData[i+1] = 70;  // G
      blueData[i+2] = 225; // B
    }
  }
  const blueLogoBuf = await sharp(blueData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize({ width: 1200 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo-blue.png'), blueLogoBuf);
  console.log('Saved public/logo-blue.png');

  // 3. Generate square app icons with brand blue background
  // Background: #3A46E1, 512x512 with white logo centered
  const iconLogo = await sharp(trimmedBuf).resize(360, 360, { fit: 'inside' }).toBuffer();
  const bg512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 58, g: 70, b: 225, alpha: 1 }
    }
  }).composite([{ input: iconLogo, gravity: 'center' }]).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), bg512);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), await sharp(bg512).resize(192, 192).toBuffer());
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), await sharp(bg512).resize(180, 180).toBuffer());
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), await sharp(bg512).resize(64, 64).toBuffer());
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), await sharp(bg512).resize(32, 32).toBuffer());
  fs.writeFileSync(path.join(publicDir, 'logo-icon.png'), await sharp(bg512).resize(64, 64).toBuffer());
  console.log('Saved favicons, apple-touch-icon, and PWA icons');

  // 4. Generate SVG Favicon
  const b64Logo = (await sharp(trimmedBuf).resize(220, 220, { fit: 'inside' }).png().toBuffer()).toString('base64');
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="16" fill="#3A46E1"/>
  <image href="data:image/png;base64,${b64Logo}" x="10" y="10" width="44" height="44" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon, 'utf8');
  console.log('Saved public/favicon.svg');

  // 5. Generate high-resolution 1200x630 OpenGraph / Twitter Social Card (og-image.png)
  const ogLogoW = 340;
  const ogLogoBuf = await sharp(trimmedBuf).resize({ width: ogLogoW }).png().toBuffer();
  const ogLogoB64 = ogLogoBuf.toString('base64');

  const ogSvg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow1" cx="80%" cy="20%" r="60%">
        <stop offset="0%" stop-color="#3A46E1" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#3A46E1" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glow2" cx="20%" cy="80%" r="50%">
        <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3A46E1"/>
        <stop offset="100%" stop-color="#6366F1"/>
      </linearGradient>
    </defs>
    
    <rect width="1200" height="630" fill="#0E1116"/>
    <rect width="1200" height="630" fill="url(#glow1)"/>
    <rect width="1200" height="630" fill="url(#glow2)"/>
    
    <!-- Top Pill Badge -->
    <rect x="80" y="80" width="280" height="36" rx="18" fill="#1E2433" stroke="#3A46E1" stroke-width="1.5"/>
    <circle cx="102" cy="98" r="5" fill="#10B981"/>
    <text x="118" y="103" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#A5B4FC" letter-spacing="1.5">CONSTRUCTION OPERATIONS OS</text>
    
    <!-- Main Headline -->
    <text x="80" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" fill="#FFFFFF" letter-spacing="-1.5">
      A Single Hub for Every Site.
    </text>
    
    <text x="80" y="345" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="400" fill="#94A3B8">
      Replaces scattered WhatsApps and pocket diaries with live finances,
    </text>
    <text x="80" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="400" fill="#94A3B8">
      daily photo updates, and automated leakage prevention.
    </text>

    <!-- Bottom Feature Badges -->
    <rect x="80" y="470" width="200" height="44" rx="12" fill="#1E2433" stroke="#334155" stroke-width="1"/>
    <text x="100" y="498" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#E2E8F0">100% Offline Sync</text>

    <rect x="300" y="470" width="220" height="44" rx="12" fill="#1E2433" stroke="#334155" stroke-width="1"/>
    <text x="320" y="498" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#E2E8F0">Zero Unverified Cash</text>

    <rect x="540" y="470" width="210" height="44" rx="12" fill="#1E2433" stroke="#334155" stroke-width="1"/>
    <text x="560" y="498" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#E2E8F0">7 Instant Reports</text>

    <!-- Right Brand Card -->
    <rect x="820" y="160" width="300" height="300" rx="36" fill="url(#badgeGrad)"/>
    <image href="data:image/png;base64,${ogLogoB64}" x="855" y="240" width="230" height="140" preserveAspectRatio="xMidYMid meet"/>
    <text x="970" y="405" font-family="system-ui, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">BRIFT</text>
  </svg>`);

  await sharp(ogSvg).png().toFile(path.join(publicDir, 'og-image.png'));
  console.log('Saved public/og-image.png (1200x630 social card)');

  // 6. Generate site.webmanifest
  const webmanifest = {
    name: "Brift — Construction Operations OS",
    short_name: "Brift",
    description: "A single hub for every construction site. Replaces spreadsheets, WhatsApp groups and memory with one reliable view.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFB",
    theme_color: "#3A46E1",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(webmanifest, null, 2), 'utf8');
  console.log('Saved public/site.webmanifest');
}

generate().catch(console.error);
