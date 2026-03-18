-- Enable row level security and policies for checkins
alter table if exists checkins enable row level security;

--
-- Policy helpers
--
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = current_schema()
      and tablename = 'checkins'
      and policyname = 'Allow checkin owners'
  ) then
    create policy "Allow checkin owners" on checkins
      for all
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = current_schema()
      and tablename = 'checkins'
      and policyname = 'Allow all checkins'
  ) then
    create policy "Allow all checkins" on checkins
      for all
      using (true)
      with check (true);
  end if;
end;
$$;

grant select, insert, update, delete on table checkins to authenticated;
