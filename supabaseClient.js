// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://mqygivjwarphxxjxltn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qNMD-uuGWGlbvdH7kUYbsw_mSB9pgsQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
