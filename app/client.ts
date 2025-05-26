import { createClient } from 'honox/client'

try {
  console.log('Before createClient() call');
  createClient();
  console.log('After createClient() call - Hydration should be complete or in progress.');
} catch (e) {
  console.error('Error during or after createClient():', e);
  alert('Error during or after createClient(): ' + (e instanceof Error ? e.message : String(e)));
}
