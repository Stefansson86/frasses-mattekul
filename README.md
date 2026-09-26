# Frasses Mattekul ⚽

En enkel, minimalistisk och pedagogisk matte-webapp för **Frans (5 år)** som älskar fotboll!

## Funktioner

- ⚽ **Fotbollstema**: Skjut bollen i mål vid rätt svar med jubel, nät-rassel och "MÅÅÅL!"
- ➕➖ **Plus & Minus**: Välj mellan addition, subtraktion eller blandad match.
- 🟢 **Anpassat för 5 år**:
  - **Nivå 1–5 (Lätt)**: Perfekt för att börja räkna på fingrarna och med bollar (inga nollor).
  - **Nivå 1–10 (Klurigt)**: För när Frans vill utmana sig själv.
- 🖐️ **Togglingsbar räknehjälp**: Klickbara fotbollar som studsar och räknas när Frans pekar på skärmen. Kan stängas av eller sättas på med ett enkelt klick för att träna huvudräkning!
- 🔊 **Goda ljudeffekter**: Bollspark, måljubel och domarvissla (utan talsyntes/röst). Går även att stänga av helt med ljudknappen.
- 🏆 **Pokalskåp & Målstatistik**: 5 mål ger en matchseger och en pokal i Frans prishylla (sparas i webbläsarens `localStorage`).
- 🌿 **Gröna toner**: Sköna fotbollsgröna nyanser, stora tryckvänliga knappar utan plotter.

## Kör lokalt

```bash
npm install
npm run dev
```

## Deploy till GitHub Pages

Projektet är konfigurerat för GitHub Pages med relativ sökväg (`base: './'`) och en färdig GitHub Actions workflow i `.github/workflows/deploy.yml`.

Gå till repositoryts inställningar på GitHub -> **Settings** -> **Pages** -> **Build and deployment** -> Source: **GitHub Actions**.
