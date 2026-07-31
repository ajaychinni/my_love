/**
 * Encrypts the quiz photos so they're useless to anyone who doesn't know the password.
 *
 *   node tools/encrypt-photos.mjs <password>
 *
 * Reads  Assets/photos/q1..q4.jpg   (plaintext, gitignored — never published)
 * Writes Assets/photos/q1..q4.enc   (AES-256-GCM ciphertext — safe to publish)
 *        Assets/photos/enc.json     (salt + iteration count + a check token)
 *
 * The browser derives the same key from the password with PBKDF2 and decrypts in memory.
 * Getting the password wrong fails the GCM auth tag, so there's no "partial" decrypt.
 */
import { webcrypto as crypto } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PHOTOS = ['q1', 'q2', 'q3', 'q4'];
const ITERATIONS = 250_000;

const raw = process.argv[2];
if (!raw) {
  console.error('usage: node tools/encrypt-photos.mjs <password>');
  process.exit(1);
}
// must match the normalisation the lock screen does, so "12/05/2026" also unlocks
const password = raw.replace(/[^a-zA-Z0-9]/g, '');

const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');

async function deriveKey(password, salt) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

// [12-byte IV][ciphertext || 16-byte GCM tag]
async function seal(key, bytes) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes);
  const out = new Uint8Array(iv.length + ct.byteLength);
  out.set(iv, 0);
  out.set(new Uint8Array(ct), iv.length);
  return out;
}

const salt = crypto.getRandomValues(new Uint8Array(16));
const key = await deriveKey(password, salt);

for (const name of PHOTOS) {
  const plain = await readFile(join(ROOT, 'Assets/photos', name + '.jpg'));
  const sealed = await seal(key, plain);
  await writeFile(join(ROOT, 'Assets/photos', name + '.enc'), sealed);
  console.log(`  ${name}.jpg  ${(plain.length / 1024).toFixed(0)} KB  ->  ${name}.enc  ${(sealed.length / 1024).toFixed(0)} KB`);
}

// Tiny token so the lock screen can check the password without pulling a whole photo
const check = await seal(key, new TextEncoder().encode('srishuu'));

await writeFile(join(ROOT, 'Assets/photos/enc.json'), JSON.stringify({
  salt: hex(salt),
  iterations: ITERATIONS,
  check: hex(check),
  files: PHOTOS
}, null, 2) + '\n');

console.log(`\n✓ encrypted ${PHOTOS.length} photos (salt ${hex(salt).slice(0, 12)}…, ${ITERATIONS.toLocaleString()} PBKDF2 rounds)`);
