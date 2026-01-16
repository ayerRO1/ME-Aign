# Tracker Meniu 14 Zile

Aplicație web React pentru tracking zilnic al unui meniu pe 14 zile (2 mese/zi) cu repetare, streak și remindere best‑effort. Totul rulează local, fără backend.

## Pornire rapidă

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Funcționalități

- Plan 14 zile repetabil, cu seed complet (ingrediente, gramaje, pași, calorii)
- Tracking zilnic: mese, suplimente, mișcare, notițe
- Calendar lunar cu status, streak curent și cel mai bun
- Setări: fereastră de mâncat (max 8 ore), ore mese, remindere
- Persistență locală (IndexedDB via localforage)
- PWA (vite-plugin-pwa)

## Notificări

Notificările web sunt best‑effort: funcționează cât timp aplicația este deschisă, iar comportamentul în background depinde de browser/PWA. Aplicația include “Remindere în aplicație” ca fallback.

## Structură proiect

- `src/app/` layout și tabs
- `src/components/ui/` componente UI reutilizabile
- `src/features/` ecrane (Azi, Calendar, Plan, Setări)
- `src/store/` Zustand
- `src/lib/` utilitare (date, notificări, storage)
- `src/data/defaultPlan.ts` seed plan
- `src/styles/` tokens și CSS global
