
import { createClient } from '@supabase/supabase-js';

// Conexión al proyecto específico proporcionado
const supabaseUrl = 'https://tdmzobmaqlulrdkctjem.supabase.co'; 
// Clave anon/public correcta (JWT)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkbXpvYm1hcWx1bHJka2N0amVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNjYzNjgsImV4cCI6MjA4MDg0MjM2OH0.gIA3wUnrebAPQiaF4nDOWFj8OiSBCCYargfianf7eaY';

export const supabase = createClient(supabaseUrl, supabaseKey);
