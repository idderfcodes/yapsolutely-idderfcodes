# Yapsolutely deployment runbook

Use this runbook once credentials are ready and the repo is ready for real deployment wiring.

---

## Goal

Deploy:

- `apps/web` to Vercel
- `apps/voice` to Railway

Then wire:

- web environment variables
- voice runtime environment variables
- Twilio webhook URLs
- live provider mode

---

## 1) Deploy the web app on Vercel

### Create the project

1. Open Vercel
2. Import the repository
3. Configure the project root so the deployed app is `apps/web`
4. Confirm the framework is Next.js

### Add web environment variables

Add these in Vercel before or during deployment:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_URL`
- `AUTH_SECRET`
- `DEMO_AUTH_ENABLED`
- `RUNTIME_SHARED_SECRET`
- `DATABASE_URL`
- `DIRECT_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`
- `DEEPGRAM_API_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `TWILIO_SMS_FROM_NUMBER`
- `TRANSFER_NUMBER`
- `VOICE_PIPELINE_MODE`
- `VOICE_MODEL`
- `RECORDING_ENABLED`

### After deploy

1. Copy the deployed web URL
2. Set `NEXT_PUBLIC_APP_URL` to that real production URL
3. Redeploy if needed so all generated URLs match production

---

## 2) Deploy the voice runtime on Railway

### Create the project

1. Open Railway
2. Create a new project from the same repository
3. Configure the service to run from `apps/voice`
4. Set the start command to run the Node runtime if Railway does not detect it automatically

### Add voice runtime environment variables

Add these in Railway:

- `PORT`
- `NEXT_PUBLIC_APP_URL`
- `RUNTIME_SHARED_SECRET`
- `VOICE_PIPELINE_MODE`
- `DEEPGRAM_API_KEY`
- `DEEPGRAM_STT_MODEL`
- `DEEPGRAM_STT_ENDPOINTING_MS`
- `DEEPGRAM_UTTERANCE_END_MS`
- `DEEPGRAM_TTS_MODEL`
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL`
- `ANTHROPIC_MAX_TOKENS`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `TWILIO_SMS_FROM_NUMBER`
- `TRANSFER_NUMBER`
- `VOICE_STREAM_BASE_URL`
- `VOICE_STREAM_WSS_URL`
- `VOICE_MODEL`

### After deploy

1. Copy the public Railway runtime URL
2. Set:
   - `VOICE_STREAM_BASE_URL` to that host
   - `VOICE_STREAM_WSS_URL` to `wss://<your-runtime-host>/twilio/stream`
3. Redeploy if needed
4. Verify `GET /health` works on the public runtime URL
5. Verify `GET /readiness` works on the public runtime URL when sent with `x-yapsolutely-runtime-secret`

---

## 3) Production value alignment

Once both apps are deployed, make sure these values line up correctly:

### Web app

- `NEXT_PUBLIC_APP_URL=https://<your-vercel-url>`

### Voice runtime

- `NEXT_PUBLIC_APP_URL=https://<your-vercel-url>`
- `VOICE_STREAM_BASE_URL=https://<your-railway-url>` or host form expected by your runtime config
- `VOICE_STREAM_WSS_URL=wss://<your-railway-url>/twilio/stream`
- `VOICE_PIPELINE_MODE=live`

### Shared secret

- `RUNTIME_SHARED_SECRET` must be identical in web and voice runtime environments

---

## 4) Twilio configuration

Once the voice runtime is live, configure the Twilio phone number:

### Voice webhook

Set the inbound voice webhook to:

- `https://<your-runtime-host>/twilio/inbound`

### Status callback

Set call status callbacks to:

- `https://<your-runtime-host>/twilio/status`

### Number capabilities

Make sure the number supports:

- voice
- SMS if you want to validate the SMS tool

---

## 5) First post-deploy checks

### Web app

Verify:

- `/api/health` returns success
- `/api/readiness` returns success when you are signed in or when you send `x-yapsolutely-runtime-secret`
- dashboard loads
- settings page loads
- readiness shows production values instead of placeholders
- agents page works
- numbers page works
- calls page works

### Voice runtime

Verify:

- `/health` returns success
- `/readiness` returns success with `x-yapsolutely-runtime-secret`
- runtime shows correct pipeline mode
- runtime can resolve the web app URL
- no startup crashes in logs

---

## 6) Before live Twilio testing

Confirm all of these are true:

- Supabase DB values are real
- Anthropic key is real
- Deepgram key is real
- Twilio creds are real
- Twilio number is purchased
- web app is deployed
- voice runtime is deployed
- `RUNTIME_SHARED_SECRET` matches in both places
- `VOICE_PIPELINE_MODE=live`
- voice websocket URL is public and correct

---

## 7) What success looks like

The deployment phase is considered successful when:

1. web app is reachable publicly
2. voice runtime is reachable publicly
3. Twilio webhooks point to the real runtime
4. a real inbound call can hit the runtime
5. that call appears in the dashboard with transcript/log output

Operational endpoints available after this slice:

- `GET /api/health` for a fast public web-app health check
- `GET /api/readiness` for a detailed readiness snapshot (requires dashboard session or `x-yapsolutely-runtime-secret`)
- `GET /health` for a fast public voice-runtime health check
- `GET /readiness` for a detailed voice-runtime readiness snapshot (requires `x-yapsolutely-runtime-secret` when configured)

---

## 8) If something fails

Check in this order:

1. wrong env value
2. wrong deployment URL
3. `RUNTIME_SHARED_SECRET` mismatch
4. Twilio webhook pointing to wrong host/path
5. runtime not in `live` mode
6. Deepgram/Anthropic key not enabled or invalid
7. Twilio number missing voice capability
