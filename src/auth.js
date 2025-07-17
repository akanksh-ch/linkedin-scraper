import { supabase } from "./lib/supabaseClient";
import { ref } from "vue";

const session = ref()

export async function getAuth() {
  const { data, error } = await supabase.auth.getSession()
  session.value = data.session

  supabase.auth.onAuthStateChange((_event, _session) => {
    session.value = _session
  })

  return session
}