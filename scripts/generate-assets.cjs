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
  const srcAssetsDir = path.join(__dirname, '..', 'src', 'assets');
  const phonePath = path.join(srcAssetsDir, 'hero-phone-transparent.png');
  const ogLogoBuf = await sharp(trimmedBuf).resize(24, 24, { fit: 'inside' }).png().toBuffer();
  const ogLogoB64 = ogLogoBuf.toString('base64');
  const phoneBuf = await sharp(phonePath).resize(560, 560, { fit: 'contain' }).png().toBuffer();

  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="60%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#EEF2F6"/>
      </linearGradient>
      <radialGradient id="topGlow" cx="85%" cy="15%" r="55%">
        <stop offset="0%" stop-color="#3A46E1" stop-opacity="0.14"/>
        <stop offset="100%" stop-color="#3A46E1" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="bottomGlow" cx="15%" cy="85%" r="50%">
        <stop offset="0%" stop-color="#6366F1" stop-opacity="0.10"/>
        <stop offset="100%" stop-color="#6366F1" stop-opacity="0"/>
      </radialGradient>
      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3A46E1" stroke-width="1" stroke-opacity="0.045"/>
      </pattern>
      <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0F172A" flood-opacity="0.08"/>
      </filter>
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3A46E1"/>
        <stop offset="50%" stop-color="#4F46E5"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>
      <linearGradient id="blueBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3A46E1"/>
        <stop offset="100%" stop-color="#2D37BA"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    <rect width="1200" height="630" fill="url(#gridPattern)"/>
    <rect width="1200" height="630" fill="url(#topGlow)"/>
    <rect width="1200" height="630" fill="url(#bottomGlow)"/>
    <rect x="0" y="0" width="1200" height="5" fill="url(#textGrad)"/>
    <g transform="translate(70, 52)">
      <rect width="215" height="46" rx="23" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#cardShadow)"/>
      <rect x="6" y="6" width="34" height="34" rx="10" fill="url(#blueBoxGrad)"/>
      <image href="data:image/png;base64,${ogLogoB64}" x="11" y="11" width="24" height="24"/>
      <text x="50" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" fill="#0F172A" letter-spacing="-0.5">BRIFT</text>
      <rect x="116" y="14" width="86" height="18" rx="9" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1"/>
      <circle cx="126" cy="23" r="3.5" fill="#10B981"/>
      <text x="134" y="26.5" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#475569" letter-spacing="0.5">CON-OPS</text>
    </g>
    <g transform="translate(300, 57)">
      <rect width="230" height="36" rx="18" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1.2"/>
      <text x="115" y="23" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#3A46E1" text-anchor="middle" letter-spacing="1">A SINGLE HUB FOR EVERY SITE</text>
    </g>
    <g transform="translate(70, 160)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#0F172A" letter-spacing="-1.2">Stop running your sites on</text>
      <text x="0" y="56" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="url(#textGrad)" letter-spacing="-1.2">scattered chats &amp; diaries.</text>
    </g>
    <g transform="translate(70, 290)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="500" fill="#475569" letter-spacing="-0.2">A live operating system for construction firms ready to replace</text>
      <text x="0" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="500" fill="#475569" letter-spacing="-0.2">spreadsheets and guesswork with one reliable hub.</text>
    </g>
    <g transform="translate(70, 375)">
      <g transform="translate(0, 0)">
        <rect width="185" height="42" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#cardShadow)"/>
        <circle cx="21" cy="21" r="9" fill="#DCFCE7"/>
        <path d="M 17 21 L 20 24 L 26 18" stroke="#15803D" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="38" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1E293B">100% Offline Sync</text>
      </g>
      <g transform="translate(198, 0)">
        <rect width="195" height="42" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#cardShadow)"/>
        <circle cx="21" cy="21" r="9" fill="#DCFCE7"/>
        <path d="M 17 21 L 20 24 L 26 18" stroke="#15803D" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="38" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1E293B">Zero Phantom Labor</text>
      </g>
    </g>
    <g transform="translate(70, 432)">
      <g transform="translate(0, 0)">
        <rect width="215" height="42" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#cardShadow)"/>
        <circle cx="21" cy="21" r="9" fill="#EFF6FF"/>
        <path d="M 17 21 L 20 24 L 26 18" stroke="#3A46E1" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="38" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1E293B">Locked Cash Advances</text>
      </g>
      <g transform="translate(228, 0)">
        <rect width="165" height="42" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" filter="url(#cardShadow)"/>
        <circle cx="21" cy="21" r="9" fill="#FEF3C7"/>
        <path d="M 17 21 L 20 24 L 26 18" stroke="#B45309" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="38" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1E293B">7 Instant Reports</text>
      </g>
    </g>
    <g transform="translate(70, 545)">
      <circle cx="6" cy="6" r="4" fill="#3A46E1"/>
      <text x="18" y="10" font-family="system-ui, sans-serif" font-size="13.5" font-weight="700" fill="#0F172A">Official Con-Ops OS for Multi-Site Contractors</text>
      <text x="375" y="10" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#64748B">•  getbrift.com</text>
    </g>
    <circle cx="920" cy="315" r="230" fill="#3A46E1" fill-opacity="0.12"/>
  </svg>
  `;

  const overlaySvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="floatShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#0F172A" flood-opacity="0.16"/>
      </filter>
    </defs>
    <g transform="translate(630, 130)" filter="url(#floatShadow)">
      <rect width="210" height="66" rx="18" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2"/>
      <circle cx="34" cy="33" r="15" fill="#DCFCE7"/>
      <path d="M 28 33 L 32 37 L 40 29" stroke="#16A34A" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="58" y="28" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#64748B" letter-spacing="0.5">VERIFIED FUNDS</text>
      <text x="58" y="48" font-family="system-ui, sans-serif" font-size="14.5" font-weight="900" fill="#0F172A">₹62,00,000 Locked</text>
    </g>
    <g transform="translate(930, 470)" filter="url(#floatShadow)">
      <rect width="210" height="66" rx="18" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2"/>
      <circle cx="34" cy="33" r="14" fill="#FEF3C7"/>
      <circle cx="34" cy="33" r="6" fill="#D97706"/>
      <text x="58" y="28" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#B45309" letter-spacing="0.5">BASEMENT 0 BARS</text>
      <text x="58" y="48" font-family="system-ui, sans-serif" font-size="14.5" font-weight="900" fill="#0F172A">30 Workers Synced</text>
    </g>
  </svg>
  `;

  const baseOgImg = await sharp(Buffer.from(ogSvg)).png().toBuffer();
  const overlayOgBuf = await sharp(Buffer.from(overlaySvg)).png().toBuffer();

  const finalOgCard = await sharp(baseOgImg)
    .composite([
      { input: phoneBuf, left: 670, top: 35 },
      { input: overlayOgBuf, left: 0, top: 0 }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'og-image.png'), finalOgCard);
  console.log('Saved public/og-image.png (1200x630 studio card)');

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
