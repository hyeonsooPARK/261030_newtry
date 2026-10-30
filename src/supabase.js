import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import {
  supabaseUrl,
  supabaseKey
} from "./supabase-config.js";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
