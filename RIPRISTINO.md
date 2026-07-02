# Come ripristinare il vecchio sito

Il sito precedente (la one-page "vanilla") è congelato nel branch **`sito-v1`**
e in tutta la storia git precedente al merge della v2. Nulla è andato perso.

## Ripristino consigliato (sicuro, non riscrive la storia)

Annulla il merge della v2 con un revert:

```sh
git checkout main && git pull
git revert -m 1 <sha-del-merge-v2>   # lo sha è nel log: "Merge branch 'claude/school-website-redesign-qtpjfr'"
git push origin main
```

Il sito torna esattamente com'era; la v2 resta nella storia e nel branch
`claude/school-website-redesign-qtpjfr`, pronta per essere ripresa.

## Ripristino "macchina del tempo" (riscrive la storia di main)

Solo se si vuole cancellare anche il merge dalla storia:

```sh
git checkout main
git fetch origin sito-v1
git reset --hard origin/sito-v1
git push --force-with-lease origin main
```

## Verifica

Dopo il push, l'hosting che serve la root di `main` ripubblica il vecchio
sito da solo (se il deploy è automatico) — altrimenti ricaricare i file
come si è sempre fatto.

## Per aggiornare il sito nuovo (finché resta in produzione)

```sh
cd v2
npm install          # solo la prima volta
npm run build
npm run publish:root # aggiorna la root del repo dalla build
cd .. && git add -A && git commit -m "aggiornamento sito" && git push
```

I contenuti si modificano in `v2/src/content/lezioni/` (lezioni) e
`v2/src/data/*.json` (eventi, citazioni, testi delle sezioni).
