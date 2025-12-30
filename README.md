# Expense 2026 (PWA + Sync)

This is a web app that can be hosted on any static host (GitHub Pages / Netlify / Vercel).
On iPhone: open in Safari → Share → Add to Home Screen.

## Sync (Supabase)
Create a Supabase project and run `supabase_schema.sql` in the SQL editor.
Then open the app and enter:
- Supabase URL
- Supabase anon key
- Family Code (same on both phones)

Security note: exposing `anon` is normal, but your table must be protected with RLS/policies for real security.
This starter keeps setup easy; keep your family code hard to guess, and we can harden security later.
