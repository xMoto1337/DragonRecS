# Dragon Recreation Services — Setup Guide

## Overview
This is a Next.js 14 website with:
- Supabase (database + file storage)
- Resend (email notifications)
- Vercel (hosting)

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → **New Project** (free tier)
2. Open the **SQL Editor** and run the contents of `supabase-schema.sql`
3. Go to **Storage** → **New Bucket**:
   - Name: `inquiry-images` → check **Public bucket** → Create
4. Go to **Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2: Create Resend Account

1. Go to [resend.com](https://resend.com) → Sign up (free: 100 emails/day)
2. **API Keys** → Create API Key → copy it → `RESEND_API_KEY`
3. **Domains** → Add your domain for a professional `from` address
   - OR use `onboarding@resend.dev` for testing (only sends to verified addresses)
   - Update the `from:` field in `app/api/contact/route.ts` once your domain is verified

---

## Step 3: Push to GitHub

```bash
cd dragon-recreation
git init
git add .
git commit -m "Initial commit"
# Create a repo on github.com then:
git remote add origin https://github.com/YOURNAME/dragon-recreation.git
git push -u origin main
```

---

## Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your GitHub repo
2. In **Environment Variables**, add all 5 vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_PASSWORD` (choose a strong password)
3. Click **Deploy** — your site goes live at `your-project.vercel.app`

---

## Step 5: Configure Admin Panel

1. Visit `yoursite.vercel.app/admin`
2. Enter your `ADMIN_PASSWORD`
3. Go to the **Settings** tab
4. Enter the email address(es) that should receive quote notifications
5. Click **Save Settings**

---

## Step 6: Update Contact Details

Edit `components/Footer.tsx` and `app/contact/page.tsx` to replace:
- `(000) 000-0000` → real phone number
- `info@dragonrecreation.com` → real email
- `Florida & Surrounding Areas` → your actual service area

---

## Adding More Gallery Images

Drop new images into `public/gallery/` and add entries to `lib/gallery-data.ts`:

```ts
{
  src: "/gallery/YOUR_IMAGE.jpg",
  alt: "Description for accessibility",
  title: "Project Title",
  description: "Short project description",
  categories: ["Sports Courts"],  // one or more categories
},
```

---

## Local Development

```bash
# Copy env template
cp .env.local.example .env.local
# Fill in real values, then:
npm run dev
# → http://localhost:3000
```
