-- Rewire checkins foreign key to point directly at auth.users so syncing succeeds even if the profile row is missing.
alter table if exists checkins drop constraint if exists checkins_user_id_fkey;
alter table if exists checkins
  add constraint checkins_user_id_fkey
  foreign key (user_id)
  references auth.users(id)
  on delete cascade;
