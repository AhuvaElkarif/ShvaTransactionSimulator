# Shva — Transaction Approval Simulator

A full-stack **Transaction Approval Simulator**. A user picks a **region** (country) and a
**time**, submits a transaction, and the backend decides **Approved** or **Rejected** based on
whether that exact moment falls within the region's local **banking hours (08:00–18:00)**. Every
submission (approved *and* rejected) is stored in MSSQL; approved ones are listed as cards.

Built with **React + TypeScript + styled-components** (frontend) and **.NET 9 Web API + EF Core +
MSSQL** (backend), structured with **Clean Architecture**.

---

## ✨ Features

| Requirement | Status |
| --- | --- |
| Responsive React UI recreating the layout | ✅ |
| State management (region, time, approved list) | ✅ |
| Clean, scalable RESTful .NET API | ✅ |
| Banking-hours business rule (timezone-aware, DST-correct) | ✅ |
| MSSQL persistence via EF Core (all transactions) | ✅ |
| Endpoint returning only approved transactions | ✅ |
| **Bonus:** Docker Compose (one command) | ✅ |
| **Bonus:** Localization EN/Hebrew with RTL/LTR | ✅ |
| **Bonus:** Authentication (JWT login/signup) | ✅ |
| Unit tests for the core rule (29 tests) | ✅ |

---

## 🧱 Architecture

### Backend — Clean Architecture (`server/`)

```
Shva.API            → Controllers, Program.cs (DI, CORS, Swagger, JWT), middleware
   ↓ depends on
Shva.Infrastructure → EF Core DbContext, repositories, TimeZone/JWT/Hasher services
   ↓ depends on
Shva.Application    → DTOs, interfaces (ports), use-case services, validators
   ↓ depends on
Shva.Domain         → Entities, enums, Region catalog, BankingHours rule (no dependencies)
```

Dependencies point **inward**: the Domain knows nothing about EF Core, ASP.NET, or JWT. The
Application layer defines interfaces (`ITimeZoneService`, `ITransactionRepository`, …) that
Infrastructure implements, so the core logic is independently testable. The pure banking-hours rule
lives in the Domain (`BankingHours`); the timezone conversion (an I/O concern) is injected.

### Frontend — feature-first React (`client/`)

Every component is split into **markup** (`Component.tsx`) and **styles**
(`Component.styles.ts`); all logic lives in **custom hooks** (`hooks/`), API calls in `api/`, and
types in `types/` — so components stay declarative.

```
src/
├── api/          axios client (+ auth interceptor) and endpoint functions
├── components/   common/ · layout/ · auth/ · transactions/  (each = .tsx + .styles.ts)
├── context/      AuthProvider + auth context
├── hooks/        useTransactionForm, useSimulateTransaction, useApprovedTransactions,
│                 useRegions, useAuth, useLanguage
├── i18n/         i18next config + en/he locales
├── pages/        SimulatorPage, LoginPage, SignupPage
├── providers/    AppThemeProvider (binds theme direction to language)
├── routes/       ProtectedRoute
├── styles/       theme, GlobalStyle, typed theme declaration
├── types/        shared DTO types
└── utils/        date/time + region-flag helpers
```

**State management:** UI state (selected region & time) via the `useTransactionForm` hook; server
state (regions, approved transactions) via **TanStack Query**, which also revalidates the approved
list after an approval; auth/session via React Context.

---

## 🧠 The business rule (how approval is decided)

1. The client sends an **absolute instant** (`timestamp`, ISO 8601) and a `region` key.
2. The backend converts that instant to the region's **local wall-clock time** using
   `TimeZoneInfo` with **IANA** time zone ids (portable across Windows/Linux via ICU).
3. It is **Approved** when the local time is within **`[08:00, 18:00)`** — 08:00 is approved,
   exactly 18:00 is rejected — otherwise **Rejected**.
4. The transaction is persisted either way.

| Region | IANA time zone |
| --- | --- |
| France | `Europe/Paris` |
| Israel | `Asia/Jerusalem` |
| Cyprus | `Asia/Nicosia` |
| Italy | `Europe/Rome` |
| United States | `America/New_York` (Eastern — see notes) |
| Japan | `Asia/Tokyo` |

> The frontend sends the chosen **time** combined with today's date (as a UTC instant); the backend
> then derives the selected region's local time from that instant.

Daylight saving is handled automatically, so the same UTC instant maps to different local hours in
summer vs. winter. This is covered by unit tests.

---

## 🔌 API reference

Base URL (local dev): `http://localhost:5080` · Swagger UI: `http://localhost:5080/swagger`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/regions` | Supported regions (for the selector) |
| `POST` | `/api/transactions/simulate` | Evaluate + persist a transaction |
| `GET` | `/api/transactions/approved?limit=20` | Approved transactions (newest first) |
| `POST` | `/api/auth/signup` | Register → returns JWT |
| `POST` | `/api/auth/login` | Authenticate → returns JWT |

**Simulate** request / response:

```jsonc
// POST /api/transactions/simulate
{ "region": "IL", "timestamp": "2026-06-25T07:00:00Z" }

// 200 OK
{
  "id": "…",
  "region": "IL",
  "regionName": "Israel",
  "status": "Approved",
  "submittedAtUtc": "2026-06-25T07:00:00+00:00",
  "localTimeAtRegion": "2026-06-25T10:00:00",
  "reason": "Local time 10:00 in Israel is within banking hours (08:00–18:00)."
}
```

Validation and errors are returned as RFC 7807 problem responses (HTTP 400/401/404/409).

---

## 🚀 Run it

### Option A — Docker Compose (everything, one command)

Requires Docker Desktop.

```bash
docker compose up --build
```

- Client: <http://localhost:8080>
- API / Swagger: <http://localhost:5080/swagger>
- SQL Server: `localhost:1433` (sa / `Shva_Str0ng_P@ss`)

The API applies EF Core migrations on startup (retrying until SQL Server is healthy), so the schema
is created automatically.

### Option B — Local development

**Prerequisites:** .NET 9 SDK, Node.js 20+/22+, and **SQL Server LocalDB** or SQL Express
(the default connection string targets `(localdb)\MSSQLLocalDB`).

**1. Backend**

```bash
cd server
# Install the EF CLI once if needed:  dotnet tool install --global dotnet-ef
dotnet ef database update --project src/Shva.Infrastructure --startup-project src/Shva.API
dotnet run --project src/Shva.API
# API on http://localhost:5080  (Swagger at /swagger)
```

> Startup also auto-applies migrations, so the `dotnet ef database update` step is optional — but
> it's the explicit way to create the DB up front.

**2. Frontend** (in a second terminal)

```bash
cd client
npm install
npm run dev
# App on http://localhost:5173
```

The client reads the API URL from `client/.env` (`VITE_API_BASE_URL`, default
`http://localhost:5080`).

---

## ⚙️ Configuration

| Setting | Where | Default |
| --- | --- | --- |
| DB connection | `server/src/Shva.API/appsettings.json` → `ConnectionStrings:DefaultConnection`, or env `ConnectionStrings__DefaultConnection` | LocalDB |
| JWT | `Jwt:{Issuer,Audience,Key,ExpiryMinutes}` (override `Jwt__Key` via env) | dev values |
| CORS origins | `Cors:AllowedOrigins` (env `Cors__AllowedOrigins__0`, …) | `http://localhost:5173` |
| API base URL (client) | `client/.env` → `VITE_API_BASE_URL` | `http://localhost:5080` |

---

## 🌍 Localization & 🔐 Auth

- **Localization:** EN/Hebrew toggle (top-right) powered by `react-i18next`. Switching to Hebrew
  flips the entire layout to **RTL** (the theme's `direction` + CSS logical properties); the
  preference is persisted.
- **Auth:** Signup/login issue a JWT (BCrypt-hashed passwords). The simulator page is protected by a
  client-side route guard; the token is attached automatically to API requests. The simulate/approved
  endpoints remain usable anonymously and attribute the submission to the user when a token is present.

---

## 🧪 Tests

```bash
cd server
dotnet test
```

29 xUnit tests cover the banking-hours boundaries and the full simulation pipeline across all four
regions, including DST-sensitive cases (summer vs. winter), persistence of rejected transactions,
and rejection of unsupported regions.

---

## 📝 Notes & decisions

- **.NET 9** is targeted (the installed SDK). The architecture is identical on .NET 8 LTS.
- **USA = Eastern Time** (`America/New_York`) as the canonical US zone, since the US spans several
  zones. Easily extended to a sub-zone selector.
- **Time semantics:** the client sends an absolute instant; the backend derives the region's local
  time from it — matching "what was the local time in the selected country at that exact moment."
- Migrations are applied on startup for convenience; in production you'd gate this behind a flag or
  run them as a separate step.
- The UI is a faithful, responsive interpretation of the brief; it is structured so restyling to the
  exact Figma is contained to `styles/theme.ts` and the `*.styles.ts` files.
