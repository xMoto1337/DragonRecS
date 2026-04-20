-- Run this in the Supabase SQL Editor to set up the database

-- Inquiries table
create table if not exists inquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  name          text not null,
  email         text not null,
  phone         text,
  project_type  text,
  title         text,
  message       text,
  image_urls    jsonb default '[]'::jsonb,
  status        text default 'unread' check (status in ('unread', 'read', 'responded'))
);

-- Admin settings table
create table if not exists admin_settings (
  id     serial primary key,
  key    text unique not null,
  value  text not null
);

-- Insert default recipient_emails setting (update after setup)
insert into admin_settings (key, value)
values ('recipient_emails', '')
on conflict (key) do nothing;

-- Allow service role to read/write (RLS disabled for service role by default)
-- If you want extra security, enable RLS and add policies for service role only.

-- Storage buckets — create these in the Supabase dashboard:
-- 1. inquiry-images  (public)
-- 2. gallery         (public, optional — for uploading gallery images via dashboard)
