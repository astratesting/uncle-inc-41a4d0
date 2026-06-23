# Repository Directory Structure

## Top-Level Structure

```
.
├── .built_technical
├── .built_web
├── .env.example
├── .env.local
├── .gitignore
├── .oc_session_id
├── BUILD_PLAN.md
├── README.md
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── trigger.txt
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── app/                    # Root Next.js app (original/legacy)
├── components/             # Root-level React components
├── frontend/               # Main frontend application
└── lib/                    # Root-level shared lib
```

## Auth Pages

### Root `app/(auth)/`
- `layout.tsx`
- `sign-in/page.tsx`
- `sign-up/page.tsx`
- `forgot-password/page.tsx`
- `reset-password/page.tsx`

### `frontend/app/(auth)/`
- `layout.tsx`
- `login/page.tsx`
- `sign-in/page.tsx`
- `signup/page.tsx`
- `sign-up/page.tsx`
- `sign-up/confirm/page.tsx`
- `verify/page.tsx`

## Dashboard Pages

### Root `app/dashboard/`
- `layout.tsx`
- `page.tsx`
- `analytics/page.tsx`
- `projects/page.tsx`
- `settings/page.tsx`

### `frontend/app/(dashboard)/`
- `layout.tsx`
- `overview/page.tsx`
- `dashboard-globals.css`
- `components/DashboardHeader.tsx`
- `components/FeedbackCounter.tsx`
- `components/FeedbackWidget.tsx`
- `components/RecentFeedback.tsx`
- `components/Sidebar.tsx`
- `components/SignupCounter.tsx`

### `frontend/app/dashboard/`
- `layout.tsx`
- `page.tsx`
- `analytics/page.tsx`
- `projects/page.tsx`
- `projects/new/page.tsx`
- `settings/page.tsx`

## API Routes

### Root `app/api/`
- `auth/callback/route.ts`
- `auth/demo-signin/route.ts`
- `auth/signout/route.ts`
- `feedback/route.ts`
- `waitlist/route.ts`

### `frontend/app/api/`
- `analytics/track/route.ts`
- `auth/login/route.ts`
- `auth/sign-out/route.ts`
- `auth/signup/route.ts`
- `auth/verify/route.ts`
- `stats/route.ts`
- `waitlist/route.ts`

## Lib Files

### Root `lib/`
- `auth.ts`
- `db/types.ts`
- `demo-data.ts`
- `utils.ts`

### `frontend/lib/`
- `analytics.ts`
- `schema.sql`
- `utils.ts`
- `api/auth/login.ts`
- `api/auth/signup.ts`
- `api/feedback.ts`
- `api/stats.ts`
- `supabase/client.ts`
- `supabase/middleware.ts`
- `supabase/server.ts`

## Components

### Root `components/`
- `Analytics.tsx`
- `FAQ.tsx`
- `Features.tsx`
- `FeedbackWidget.tsx`
- `Footer.tsx`
- `Hero.tsx`
- `Navbar.tsx`
- `Waitlist.tsx`
- `WhatWereBuilding.tsx`
- `dashboard/DashboardHeader.tsx`
- `dashboard/Sidebar.tsx`
- `ui/Button.tsx`
- `ui/Card.tsx`
- `ui/Input.tsx`

### `frontend/components/`
- `dashboard/DashboardHeader.tsx`
- `dashboard/ProfileCard.tsx`
- `dashboard/ProjectList.tsx`
- `dashboard/Sidebar.tsx`
- `dashboard/StatsGrid.tsx`
- `landing/CTA.tsx`
- `landing/Features.tsx`
- `landing/Footer.tsx`
- `landing/Hero.tsx`
- `landing/Nav.tsx`
- `ui/AuthFormCard.tsx`

## Summary

- **Auth pages**: Yes - present in both `app/(auth)/` and `frontend/app/(auth)/`
- **Dashboard pages**: Yes - present in `app/dashboard/`, `frontend/app/(dashboard)/`, and `frontend/app/dashboard/`
- **API routes**: Yes - 5 routes in `app/api/` and 7 routes in `frontend/app/api/`
- **Lib files**: Yes - 4 files in `lib/` and 10 files in `frontend/lib/` (including Supabase client/server, analytics, API helpers, schema)
- The project has two parallel structures: a root-level app and a `frontend/` directory, likely representing an incremental migration or rebuild.