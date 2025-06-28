<script setup>
import { ref } from 'vue'
import { supabase } from './lib/supabaseClient'

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    console.log('This is the email:', email.value)
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
        options: {
          emailRedirectTo: 'https://linkedin-scraper-peach.vercel.app/'
      }
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form  @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 >Log into Linkedin Scraper</h1>
      <p >Sign in via magic link with your email below</p>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input
          type="submit"
          
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template><style>
    form {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>