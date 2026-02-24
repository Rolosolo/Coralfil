## ReefMaker v2.0 - Core Launch
This version (2.0.0) includes the complete Coralfill™ synthesis engine, satellite intelligence overlays, and industrial manufacturing export tools.

### Launch Checklist
1. **Database Migration**: Ensure Supabase is seeded. Trigger via `GET /api/migrate` (authenticated) or run the migration script.
2. **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `UPSTASH_VECTOR_REST_URL`
   - `UPSTASH_VECTOR_REST_TOKEN`
3. **Vercel Configuration**: Connect your GitHub repository to Vercel and set the environment variables above.

---
*Powered by ReefMaker AI*

