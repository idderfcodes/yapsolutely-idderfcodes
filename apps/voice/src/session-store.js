export function createSessionStore() {
  const sessions = new Map();

  return {
    set(streamSid, session) {
      sessions.set(streamSid, session);
      return session;
    },
    get(streamSid) {
      return sessions.get(streamSid) || null;
    },
    delete(streamSid) {
      sessions.delete(streamSid);
    },
    values() {
      return [...sessions.values()];
    },
  };
}