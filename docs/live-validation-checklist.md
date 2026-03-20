# Yapsolutely live validation checklist

Use this after deployment and credential insertion.

---

## Goal

Prove the MVP finish line end to end:

1. agent exists
2. number is assigned
3. real inbound call reaches runtime
4. AI conversation happens
5. call is persisted
6. transcript/tool actions appear in the dashboard

---

## 1) Pre-call checklist

Before placing a live call, confirm:

- an agent exists in the dashboard
- the agent has:
  - system prompt
  - first message
  - voice model
  - active status if required by your workflow
- a Twilio number is registered in `/numbers`
- that number is assigned to the intended agent
- settings page shows no critical missing env values
- voice runtime `/health` is passing publicly
- `VOICE_PIPELINE_MODE=live`

---

## 2) Inbound call test

Place a real call to the purchased Twilio number.

### Expected behavior

- Twilio hits `/twilio/inbound`
- runtime resolves the number to the assigned agent
- greeting/first message plays
- caller speech is transcribed
- Anthropic generates response
- Deepgram TTS audio is returned
- caller hears the response
- barge-in/interruption does not completely break the flow

---

## 3) Dashboard verification

Immediately after or during the call, verify:

### Calls list

- a new call record appears
- status looks reasonable
- caller number appears
- time appears
- transcript preview appears

### Call detail

- transcript timeline is populated
- user and agent events are visible
- system events are visible
- tool actions are visible if triggered
- metadata looks reasonable

---

## 4) Tool validation

If testing tool behavior, explicitly try:

### Lead capture

Have the caller provide:

- name
- email
- service/request
- preferred date/time

Expected result:

- tool event is logged
- captured lead details appear in call review UI

### SMS confirmation

Prompt the agent toward a flow where SMS confirmation should trigger.

Expected result:

- Twilio SMS action succeeds
- tool event appears in transcript/call review

### Graceful end call

Drive the conversation into a closing state.

Expected result:

- assistant finishes speaking
- call ends gracefully after playback completes
- final call status persists correctly

---

## 5) Failure checks

If the call fails, inspect:

### No call record created

Check:

- runtime can reach web app
- `RUNTIME_SHARED_SECRET` matches
- web envs are correct

### Call record created but no transcript

Check:

- Deepgram key
- runtime logs
- media stream connectivity
- live mode really enabled

### Transcript exists but no AI reply

Check:

- Anthropic key
- model config
- runtime logs for response generation errors

### AI reply exists but caller hears nothing

Check:

- Deepgram TTS key/model
- websocket stream path
- Twilio Media Stream behavior
- runtime logs

### Tools don’t fire

Check:

- prompt/tool routing
- Twilio SMS config
- runtime event logs

---

## 6) Pass criteria

A live validation pass is successful when:

- inbound call connects
- AI can answer at least one real exchange
- call record persists
- transcript persists
- at least one runtime/tool event can be seen in the dashboard if intentionally tested

---

## 7) Stretch pass criteria

A stronger pass is successful when:

- interruption/barge-in works acceptably
- call closes gracefully
- transcript quality is usable
- tool event summaries look correct
- the flow is demoable without manual patching during the call
