/**
 * Optional, read-only aid for translating Trafik Ürünleri product content.
 * No runtime integration, application edits, or external API calls.
 *
 * node scripts/i18n-product-batches.mjs summary
 * node scripts/i18n-product-batches.mjs categories
 * node scripts/i18n-product-batches.mjs batch 1 25
 * node scripts/i18n-product-batches.mjs snapshot > /tmp/tr-product-source.json
 * node scripts/i18n-product-batches.mjs changed /tmp/tr-product-source.json
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'data/products.json'), 'utf8'));
if (!Array.isArray(catalog)) throw new Error('data/products.json must be an array');
const products = catalog.filter(p => p && p.id !== 'TEST-1');
const ids = new Set();
for (const p of products) {
  if (!p.id || !p.kod || !p.slug || ids.has(p.id)) throw new Error('Invalid/duplicate product identifier: '+p.id);
  ids.add(p.id);
}
const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
const text = p => ({ id:p.id, kod:p.kod, slug:p.slug, category:p.category, name:p.name || '', description:p.description || '' });
const digest = p => crypto.createHash('sha256').update(JSON.stringify([p.category, p.name, p.description])).digest('hex');
const state = () => ({ format:'tr-product-source-v1', digests:Object.fromEntries(products.map(p => [p.id, digest(p)])) });
const mode = process.argv[2];
let output;
if (mode === 'summary') {
  output = { language:'tr', allRecords:catalog.length, realProducts:products.length, excludedTestRecords:catalog.length-products.length,
    categories:categories.length, missingNames:products.filter(p => !p.name).map(p => p.id), missingDescriptions:products.filter(p => !p.description).map(p => p.id),
    translateOnly:['name','description','category'], doNotChange:['id','kod','slug','price','price_kdv','stock','images','measurements','technical specifications'] };
} else if (mode === 'categories') {
  output = { language:'tr', categories };
} else if (mode === 'batch') {
  const index = Number(process.argv[3] || 1), size = Number(process.argv[4] || 25);
  if (!Number.isSafeInteger(size) || size < 1 || size > 100 || !Number.isSafeInteger(index) || index < 1 || index > Math.ceil(products.length / size)) throw new Error('Usage: batch <1-based-index> <size 1-100>');
  const all = [...products].sort((a,b) => a.id.localeCompare(b.id, 'tr'));
  output = { language:'tr', batch:index, totalBatches:Math.ceil(all.length/size), totalProducts:all.length,
    instruction:'Translate only name, description, category. Preserve id, kod, slug and all dimensions exactly.',
    products:all.slice((index-1)*size,index*size).map(text) };
} else if (mode === 'snapshot') {
  output = state();
} else if (mode === 'changed') {
  if (!process.argv[3]) throw new Error('Usage: changed <previous-snapshot.json>');
  const old = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
  if (old.format !== 'tr-product-source-v1' || !old.digests || Array.isArray(old.digests)) throw new Error('Invalid source snapshot');
  const now = state().digests;
  output = { language:'tr', changed:products.filter(p=>now[p.id] !== old.digests[p.id]).map(text),
    removedIds:Object.keys(old.digests).filter(id=>!Object.hasOwn(now,id)) };
} else {
  throw new Error('Use summary, categories, batch, snapshot or changed');
}
process.stdout.write(JSON.stringify(output,null,2)+'\n');
