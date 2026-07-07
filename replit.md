# AfriScout

## Overview

AfriScout is an African multi-sport talent discovery platform connecting raw athletic talent from across Africa with global scouts, coaches, and programs through a verified, trust-first system.

**12 Sports:** Athletics, Football, Basketball, Boxing, Rugby Sevens, Wrestling, Swimming, Judo, Taekwondo, Cycling, Volleyball, Weightlifting

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (Tailwind CSS, framer-motion, lucide-react)
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── afriscout/         # React + Vite frontend (served at /)
│   └── api-server/        # Express API server (served at /api)
├── lib/
│   ├── api-spec/          # OpenAPI spec
│   ├── api-client-react/  # Generated React Query hooks
│   ├── api-zod/           # Generated Zod schemas
│   └── db/                # Drizzle ORM schema + DB connection
└── scripts/               # Utility scripts
```

## Database Schema (public schema)

- `athletes` — core profiles: sport, event, metrics, verification + `idVerified`, `academyName/Verified`, `height/weight`, `bio`, `isVerified`, `idDocType/Url`
- `clips` — video clips with `angle` (match|isolated), `recordedAt`, `competition`, `drillName`, `timestampNotes`
- `coaches` — coach profiles
- `scouts` — applications + approval status
- `saved_searches` — saved filter presets
- `watchlists` — scout → athlete watchlist relationships
- `trial_requests` — scout contact/trial requests with placement fee tracking
- `combine_events` — paid/free combine listings; `combine_registrations` — athlete registrations
- `users` — user accounts with Stripe fields
- `physical_tests` — standardized test battery per sport (40m, vertical, shuttle, beep, VO2, plank, etc.) + `benchmarks` table
- `messages` — athlete ↔ scout direct messaging (inbox/thread/sent)
- `notifications` — scout new-match alerts (polled every 30s, dismissible green notification bar)

## Pages & Routes

| Page | Path | Description |
|------|------|-------------|
| Landing | `/` | Hero, stats band, sport grid, pricing CTA |
| Search | `/search` | Filter athletes by sport, event, region, metrics |
| Profile | `/profile/:id` | Profile + ID/academy badges, two-angle clips, physical test grid, Export PDF, Message, Request Trial, Watchlist |
| Register | `/register` | 3-step wizard: (1) Personal Info + hard ID/age check + academy badge, (2) Mandatory two-angle video, (3) Sport-specific physical tests |
| Scout Apply | `/scout-apply` | Pro scout application form |
| Scout Portal | `/scout-portal` | Watchlist management + trial pipeline |
| Pricing | `/pricing` | FREE tier + Starter $99, Pro $249, Elite $499; SLA badges; placement fee explainer |
| Combines | `/combines` | Combine events browser with sport/region filters |
| Messenger | `/messages` | Inbox + compose + thread replies (athlete ↔ scout direct messaging) |
| Club Directory | `/clubs` | Browse verified clubs/academies, filter by sport/region/tier, stats |
| Club Profile | `/clubs/:id` | Club detail, open positions, athlete requests, accept/decline/monitor |
| Club Register | `/clubs/new` | 3-step club registration wizard (info → profile → contact + open positions) |
| Invoices | `/invoices` | Auto-generated 6% commission invoices with status (pending/paid/overdue) + printable HTML invoice |
| Admin | `/admin` | Scout approvals, athlete verification, trials table, combine creator |

## Key UX Features

- **Notification bar**: Green banner below header, polls every 30s, shows new athlete matches, "+N more" badge, "View Profile" + "Dismiss all"
- **Mandatory two-angle video**: Step 2 of registration enforces match footage (competition) + isolated footage (drills), both with timestamp notes and recording date
- **Hard age/ID check**: Registration Step 1 requires DOB (age 14-40 validated inline), ID document type (passport/national_id/birth_certificate) — admin verifies, never shown to scouts
- **Academy verification badge**: Academy name on register → admin grants badge → shows amber badge on profile
- **Physical test grid**: Sport-specific test battery (Athletics: 40m/60m/100m/jump/Cooper; Football: T-test/beep; Basketball: wingspan/lane agility; Boxing: reaction/push-up/plank; etc.)
- **Club Profiles**: Clubs register with name, country, tier, sports, description, open positions (sport+position+age range), achievements, and "what we look for". Athletes browse directory and send scouting requests with a personal message. Clubs accept/decline/monitor from their profile. 4 tiers: Grassroots / Academy / Semi-Pro / Professional
- **Scout ToS Gate (6% commission)**: Scouts cannot DM any athlete or declare a signing until they accept the AfriScout Scout Agreement. ToS enforced at the API layer (POST /messages and POST /invoices/sign return 403 `tos_required`). Acceptance recorded with timestamp + version on the scouts table (`tos_accepted_at`, `tos_version`).
- **Automated Invoicing**: When a scout clicks "Declare Signing" on an approved trial in their portal, they fill in club name + gross contract value + currency. The system auto-generates an invoice (`AS-YYYY-XXXXXX` numbering) at 6% commission with a 30-day due date. Invoices page tracks pending/paid/overdue stats and offers a printable HTML invoice for download.
- **PDF export**: "Export PDF" button on profile uses browser print API with print CSS (white bg, hidden nav/notif bar, clean layout)
- **24hr response SLA**: Badge on pricing tiers (Starter=24hr, Pro=12hr, Elite=4hr)
- **Free/Club tier**: $0 forever, no card, 50 profiles/month, 1 saved search — so grassroots clubs actually use it
- **Currency localization**: Auto-detects browser locale, maps to 25+ African currencies, psychologically rounded prices (nearest 500)

## API Routes

All routes under `/api/`:
- `/athletes` — CRUD + verification + metrics
- `/clips` — CRUD + verify/flag
- `/scouts` — CRUD + approval
- `/coaches` — CRUD
- `/saved-searches` — CRUD
- `/watchlists` — scout watchlist (GET/POST/DELETE)
- `/trial-requests` — trial requests (GET/POST/PATCH)
- `/combine-events` — CRUD + registration
- `/messages` — inbox, sent, thread, POST, PATCH read, unread-count
- `/notifications` — GET, unread-count, POST, PATCH read, PATCH read-all, POST seed-matches
- `/physical-tests` — GET by athleteId, POST, PATCH verify, GET benchmarks

## Business Model

- **Scout subscriptions**: Free (club) + Starter $99/mo + Pro $249/mo + Elite $499/mo
- **Placement fees**: 20% (Starter), 15% (Pro), 10% (Elite) of contract value when trial converts
- **Combine events**: Optional paid entry fees ($0–$75+)
- **24hr SLA guarantee**: Starter=24hr, Pro=12hr, Elite=4hr

## Stripe Integration

- Stripe connector ID: `connector:ccfg_stripe_01K611P4YQR0SZM11XFRQJC44Y` (not yet connected)
- User dismissed OAuth flow — need to re-connect via Integrations panel or provide API keys as secrets
- Once connected: install `stripe` + `stripe-replit-sync` at workspace root, create stripeClient.ts, register webhook BEFORE express.json(), seed 3 products

## Design System

- Dark charcoal background (#0a0a0a range)
- Primary green (#16a34a)
- Accent gold/amber
- **Bold decorative numbers** scattered as design feature (giant ghosted text, e.g. "54", "12", "3", "$$$")
- Glass panel cards: `glass-panel` utility class
- Font: display font for headings (extrabold/black weight)
- `glow-primary` / `glow-text` effects on CTAs

## Seeded Data

- 28+ sample athletes across all 12 sports
- 5 combine events (East Africa Athletics, West Africa Football, Boxing Camp, Rugby Sevens, Central Africa Multi-Sport)
- 1 pending scout application, 1 approved scout
