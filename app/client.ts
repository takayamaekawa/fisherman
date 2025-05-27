import { createClient } from 'honox/client'

try {
  createClient();
} catch (e) {
  console.error('Error during or after createClient():', e);
  alert('Error during or after createClient(): ' + (e instanceof Error ? e.message : String(e)));
}
