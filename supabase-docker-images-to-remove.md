# Supabase Docker Images - Scheduled for Removal

**Date:** 2026-01-23  
**Reason:** Freeing disk space to enable Google Drive cache relocation  
**Estimated Space Savings:** ~5-7 GB (after layer deduplication)

## Images to Remove

| Image | Tag | Size |
|-------|-----|------|
| supabase/logflare | 1.27.0 | 676MB |
| public.ecr.aws/supabase/logflare | 1.27.0 | 676MB |
| public.ecr.aws/supabase/realtime | v2.68.4 | 463MB |
| supabase/postgres-meta | v0.95.1 | 375MB |
| public.ecr.aws/supabase/postgres-meta | v0.95.1 | 375MB |
| supabase/realtime | v2.68.0 | 463MB |
| supabase/storage-api | v1.33.0 | 628MB |
| public.ecr.aws/supabase/storage-api | v1.33.0 | 628MB |
| supabase/gotrue | v2.184.0 | 48.8MB |
| public.ecr.aws/supabase/edge-runtime | v1.69.28 | 681MB |
| supabase/supavisor | 2.7.4 | 960MB |
| public.ecr.aws/supabase/gotrue | v2.179.0 | 48MB |
| public.ecr.aws/supabase/postgrest | v13.0.5 | 437MB |
| public.ecr.aws/supabase/mailpit | v1.22.3 | 28.9MB |
| postgrest/postgrest | v12.2.0 | 322MB |
| public.ecr.aws/supabase/vector | 0.28.1-alpine | 111MB |
| kong | 2.8.1 | 149MB |
| public.ecr.aws/supabase/kong | 2.8.1 | 149MB |
| public.ecr.aws/supabase/imgproxy | v3.8.0 | 162MB |
| darthsim/imgproxy | v3.8.0 | 162MB |

**Raw Total:** ~7.5 GB (before layer deduplication)

## Removal Command

```bash
docker rmi \
  supabase/logflare:1.27.0 \
  public.ecr.aws/supabase/logflare:1.27.0 \
  public.ecr.aws/supabase/realtime:v2.68.4 \
  supabase/postgres-meta:v0.95.1 \
  public.ecr.aws/supabase/postgres-meta:v0.95.1 \
  supabase/realtime:v2.68.0 \
  supabase/storage-api:v1.33.0 \
  public.ecr.aws/supabase/storage-api:v1.33.0 \
  supabase/gotrue:v2.184.0 \
  public.ecr.aws/supabase/edge-runtime:v1.69.28 \
  supabase/supavisor:2.7.4 \
  public.ecr.aws/supabase/gotrue:v2.179.0 \
  public.ecr.aws/supabase/postgrest:v13.0.5 \
  public.ecr.aws/supabase/mailpit:v1.22.3 \
  postgrest/postgrest:v12.2.0 \
  public.ecr.aws/supabase/vector:0.28.1-alpine \
  kong:2.8.1 \
  public.ecr.aws/supabase/kong:2.8.1 \
  public.ecr.aws/supabase/imgproxy:v3.8.0 \
  darthsim/imgproxy:v3.8.0

# Then prune dangling images
docker image prune -f
```

## Re-download Command (if needed later)

```bash
# Run from a Supabase project directory:
supabase start
# Or pull individually:
# docker pull public.ecr.aws/supabase/postgres:15.1.1.78
```

