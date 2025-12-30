create table if not exists public.txns (
  id uuid primary key,
  family_code text not null,
  date date not null,
  amount numeric not null,
  ui_type text not null,
  mapped_type text not null,
  note text not null default '',
  category text not null default 'Misc',
  who text not null,
  deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists txns_family_updated on public.txns (family_code, updated_at);
alter table public.txns disable row level security;
