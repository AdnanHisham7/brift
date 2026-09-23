import re
import os

routes = [
    'dist/index.html',
    'dist/pricing/index.html',
    'dist/book-a-demo/index.html',
    'dist/cost-of-inaction/index.html',
    'dist/product/money/index.html',
    'dist/product/materials/index.html',
    'dist/product/workforce/index.html',
    'dist/product/reports/index.html',
    'dist/product/trust-and-control/index.html',
    'dist/solutions/owners/index.html',
    'dist/solutions/site-managers/index.html',
    'dist/about/index.html',
    'dist/privacy-policy/index.html',
    'dist/terms/index.html',
]

print("=== SEO AUDIT ON ALL BUILT PAGES ===")
for path in routes:
    if not os.path.exists(path):
        print(f"MISSING: {path}")
        continue
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    title = re.findall(r'<title>(.*?)</title>', html)
    desc = re.findall(r'<meta name="description" content="(.*?)"', html)
    canon = re.findall(r'<link rel="canonical" href="(.*?)"', html)
    h1 = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
    json_lds = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
    
    clean_h1 = re.sub(r'<[^>]+>', ' ', h1[0]).strip() if h1 else 'NONE'
    clean_h1_str = ' '.join(clean_h1.split())
    
    print(f"\n[{path}]")
    print(f"  Title: {title[0] if title else 'NONE'}")
    print(f"  Canonical: {canon[0] if canon else 'NONE'}")
    print(f"  H1: {clean_h1_str[:60]}")
    print(f"  JSON-LD Schemas: {len(json_lds)}")

print("\n--- Robots.txt ---")
with open('dist/robots.txt', 'r', encoding='utf-8') as f:
    print(f.read().strip())

print("\n--- Sitemap ---")
with open('dist/sitemap-index.xml', 'r', encoding='utf-8') as f:
    print(f.read().strip())
