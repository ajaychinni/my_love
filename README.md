# aug1 💌

An interactive Happy Girlfriend's Day letter for Srishuu — envelope → love letter → 6-question
memory quiz (each right answer unlocks a photo) → a "forever?" question where the No button runs
away → confetti → a day counter running from 12 May 2026 to infinity.

Plain HTML/CSS/JS. No build step, no dependencies. Just open `index.html`.

## Files

| file | what's in it |
|---|---|
| `index.html` | all 19 slides + the hand-drawn SVG cartoon couple |
| `styles.css` | theme, animations, mobile layout |
| `app.js` | **all the quiz copy lives in the CONFIG block at the top** — edit freely |
| `Assets/photos/` | web-sized copies of the 4 quiz photos (originals stay off this repo) |
| `Assets/song.mp3` | background music (see below) |

## Changing the words

Everything she reads is in two places:

- **`app.js` → the CONFIG block at the top** — the letter, all 6 questions, the right/wrong replies,
  the photo captions, the No-button taunts, and `MET_DATE`.
- **`index.html`** — the narrative slides (Happy Girlfriend's Day, the taunt, "R u ready", the kisses
  slide, "You are amazing", winner, ending).

Change a file, refresh the browser. That's the whole workflow.

## Swapping the music

Right now `Assets/song.mp3` is a **placeholder**: Pachelbel's Canon in D (solo piano) from
[this public-domain recording](https://archive.org/details/PachelbelsCanoninD), trimmed to its warm
middle section (2:45–5:50 of the original 7:41) and encoded mono 96 kbps → 2.2 MB. It loops.

The song Ajju actually wants here is *A Thousand Years* by Christina Perri, which is a copyrighted
Atlantic recording and can't be published on a public URL — the Canon is standing in because it's
the same slow wedding-piano register.

To use a different song, drop your own file in as `Assets/song.mp3` (or `Assets/song.m4a`) — no code
changes needed. The 🎵 button hides itself automatically if no file is there.

**To repeat only the best part** instead of the whole track, set the two timestamps in `app.js`:

```js
const SONG_LOOP = { start: 48, end: 76 };   // seconds — loops just that section forever
```

Leave them `null` to loop the whole file. Find the numbers by playing the track anywhere and noting
where the hook starts and ends.

Note the site is public, so don't publish a copyrighted track here.

## Running it locally

```sh
python3 -m http.server 8000     # then open http://localhost:8000
```

## Publishing (GitHub Pages)

1. Repo **Settings → General → Change visibility → Public** (free Pages needs a public repo).
2. **Settings → Pages** → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)` → Save.
3. Wait ~60s → live at `https://ajaychinni.github.io/aug1/`.

## Photos are encrypted

GitHub Pages has no password protection — anything published there is fetchable by anyone with the
URL. So the photos aren't published in the clear: they ship as **AES-256-GCM ciphertext** and are
decrypted in her browser only when the password is right. The `.enc` files on the server are useless
without it, which is why this repo can stay public.

- **Password: `12052026`** — the day we met (hint on the lock screen: *"jis din hum mile the — DD MM YYYY"*)
- Punctuation is stripped before the key is derived, so `12/05/2026` and `12 05 2026` also unlock
- Key derivation: PBKDF2-SHA256, 250,000 rounds, random 16-byte salt
- A wrong password fails the GCM auth tag, so there's no partial decrypt

### Re-encrypting after changing a photo

Plaintext JPEGs are gitignored and must never be committed. To change a photo or the password:

```sh
# put the new web-sized jpg at Assets/photos/qN.jpg, then:
node tools/encrypt-photos.mjs 12052026    # rewrites *.enc and enc.json
```

If you change the password, update the hint in `index.html` (`#s-lock`) too.

### What this does and doesn't protect

It stops anyone who has the link from seeing the photos — which is the actual thing to worry about
here. Eight digits at 250,000 PBKDF2 rounds puts an offline brute-force well out of reach of anyone
who isn't seriously motivated (100 million candidates, each costing a full key derivation).

Whenever the password changes, the old ciphertext has to be purged from git history too — otherwise
the previous `.enc` files stay fetchable from the old commits and are still openable with the old
password.

`Assets/personal_photos/` (the full-res originals) is gitignored and never leaves the Mac.
