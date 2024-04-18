// Database Connection (Safe to share with the client-side)

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rjgsmdzgdviwibreksmg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZ3NtZHpnZHZpd2licmVrc21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxNzc5MTQsImV4cCI6MjAyNzc1MzkxNH0.1JM-dhMAHZfGErJ8jgIha-a84GszPqDuKpF4fviwuoE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
