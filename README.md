# TechLinks

**TechLinks** is a web platform by **Digital Grow Global** that connects customers in Sri Lanka with trusted local technicians: electricians, plumbers, AC engineers, solar installers, CCTV specialists and appliance repairers.

Customers search and filter technicians, then contact them by phone or WhatsApp. Site owners manage the technician directory from a password-protected admin area.

## Features

- **Technician directory** at `/technicians`, filterable by keyword, city, category and rating. Filtering runs on the server from URL search params, so it works without client JavaScript.
- **Home page** with a hero, service categories, featured technicians, a how-it-works section and platform stats.
- **Admin dashboard** at `/admin` to add, edit, hide and delete technicians. Access uses a signed, HTTP-only session cookie.
- **Contact form** at `/contact` with server-side validation, using Server Actions.
- **About page** and a floating WhatsApp button.
- Responsive, light-theme UI with the brand palette defined in Tailwind CSS v4.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript (strict) |
| Linting | ESLint 9 with `eslint-config-next` |
| Storage | JSON file (`data/technicians.json`) |

`next.config.ts` enables `cacheComponents` and `partialPrefetching`. Public technician data is cached with the `technicians` tag, and admin changes expire that tag.

## Getting started

### Prerequisites

- Node.js 20 or later
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` file in the project root:

```bash
# Required to enable /admin
ADMIN_PASSWORD=choose-a-strong-password

# Optional: secret used to sign the session cookie (defaults to ADMIN_PASSWORD)
ADMIN_SECRET=a-long-random-string
```

Without `ADMIN_PASSWORD`, the admin area stays disabled.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check the project |

## Project structure

```
app/
  page.tsx             Home page
  technicians/         Directory with server-side filtering
  admin/               Admin dashboard and Server Actions
  contact/             Contact page and enquiry Server Action
  about/               About page
components/            Shared UI (cards, navbar, footer, forms, admin forms)
lib/
  data.ts              Categories, types, seed technicians, stats
  store.ts             JSON file storage and cached reads
  auth.ts              Admin password check and signed session cookie
  ratings.ts           Rating helpers
data/technicians.json  Live technician list (created from seed data on first run)
public/                Images and logo
docs/                  Project proposal
```

## Data storage and deployment

Technicians are stored in `data/technicians.json`, which the app creates from the seed data on first run. This needs a writable filesystem, so it suits a standard Node server or VPS.

Serverless platforms such as Vercel have a read-only filesystem. To deploy there, replace `lib/store.ts` with a database (for example Postgres or SQLite via a hosted service) before using the admin area.

## Known limitations

- The contact form validates input but does not deliver it yet. Enquiries are only logged on the server (`app/contact/actions.ts`).
- There is no automated test suite.
- Category counts and site stats are placeholder values in `lib/data.ts`.

## Roadmap

- Deliver contact enquiries by email or CRM
- Move storage to a database
- Customer accounts, reviews and bookings
- Technician self-registration and verification

## License

Proprietary. All rights reserved by Digital Grow Global.
