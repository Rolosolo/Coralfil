---
description: how to deploy the ReefMaker application to coralfill.com
---
# Launching ReefMaker on Coralfill.com

Follow these steps to deploy your application to your new domain and setup a sandbox for team approval.

## 1. Hosting Environment (Vercel Recommended)
Since the app is built with Next.js, Vercel is the most seamless hosting provider.

1.  **Sign up/Login** to [Vercel](https://vercel.com).
2.  **Import your GitHub/GitLab repository** where this code is pushed.
3.  **Configure Environment Variables**:
    - Add `NEXT_PUBLIC_SUPABASE_URL`
    - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - Add `UPSTASH_VECTOR_REST_URL`
    - Add `UPSTASH_VECTOR_REST_TOKEN`
4.  **Deploy**: Vercel will automatically build and deploy your main branch.

## 2. Connecting coralfill.com (via Spaceship.com)
1.  In Vercel, go to **Project Settings > Domains**.
2.  Add `coralfill.com`.
3.  Vercel will provide **A Records** and a **CNAME** record.
4.  Login to [Spaceship.com](https://spaceship.com) and go to your domain's **DNS Settings**:
    - **A Record**: Point `@` to the Vercel IP provided.
    - **CNAME Record**: Point `www` to `cname.vercel-dns.com`.

## 3. Creating the Team Sandbox
For team approval before the final site launch, use **Preview Deployments**:

1.  **Create a Branch**: `git checkout -b staging`.
2.  **Push Changes**: `git push origin staging`.
3.  **Review URL**: Vercel will generate a unique URL for the `staging` branch (e.g., `reefmaker-staging.vercel.app`).
4.  **Team Approval**: Share this unique URL with your team. They can test the AI Synthesis Engine and SEO overlays there.

## 4. Final Launch
Once the team approves the sandbox:
1.  Merge `staging` into `main`.
2.  Vercel will trigger a production build.
3.  `coralfill.com` will be live with the latest Coralfill Brain features.

## 5. SSL & Monitoring
- Vercel provides automatic SSL (HTTPS). 
- Monitor your Supabase and Upstash usage during the launch period to ensure scaling remains smooth.
