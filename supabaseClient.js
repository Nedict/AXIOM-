import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// We use the raw strings directly in Vanilla JS
const supabaseUrl = 'https://mgqygivjwarphxxjxltn.supabase.co';
const supabaseKey = 'sb_publishable_qNMD-uuGWGlbvdH7kUYbsw_mSB9pgsQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
