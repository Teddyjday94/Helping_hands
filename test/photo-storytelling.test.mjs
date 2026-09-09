import assert from 'node:assert/strict';
 import fs from 'node:fs';
 import path from 'node:path';
 
const project = path.join(import.meta.dirname, '..');
 const htmlPath = path.join(project, 'index.html');
 const html = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf8') : '';
 
 assert.match(html, /class="[^"]*\btransformations\b[^"]*"/, 'the page should include a before-and-after section');
 assert.equal((html.match(/<article class="comparison(?:\s[^"]*)?"/g) || []).length, 2, 'the page should include two property comparisons');
 assert.equal((html.match(/class="comparison-range"/g) || []).length, 2, 'each comparison should have an accessible range control');
 assert.match(html, /crew-team\.jpg/, 'the real three-person crew photo should anchor the team section');
 assert.match(html, /crew-mowing\.jpg/, 'the team section should include a mowing action photo');
 assert.match(html, /crew-trimming\.jpg/, 'the team section should include a trimming action photo');
 
 for (const asset of [
   'transformation-driveway-before.jpg',
   'transformation-driveway-after.jpg',
   'transformation-front-before.jpg',
   'transformation-front-after.jpg',
   'crew-team.jpg',
   'crew-mowing.jpg',
   'crew-trimming.jpg',
 ]) {
   assert.ok(fs.existsSync(path.join(project, 'assets', asset)), `missing required photo asset: ${asset}`);
 }
 
 assert.match(html, /aria-label="Reveal the finished driveway cleanup"/, 'the driveway comparison needs a descriptive control label');
assert.match(html, /aria-label="Reveal the finished front lawn"/, 'the front-lawn comparison needs a descriptive control label');

assert.match(html, /class="hero-badge"/, 'the refreshed hero should include a local-service badge');
assert.match(html, /class="hero-metrics"/, 'the refreshed hero should surface useful service facts');
assert.equal((html.match(/class="service-tag"/g) || []).length, 4, 'each service should have a quick visual tag');
assert.match(html, /class="section-shape"/, 'the modern layout should include the shared section accent');

console.log('Photo storytelling checks passed.');
 
