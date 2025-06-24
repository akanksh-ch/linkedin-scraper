<script setup>
    import JobsPage from './components/JobsPage.vue';
    import Auth from './Auth.vue';
    import { onMounted, ref } from 'vue';
    import { supabase } from './lib/supabaseClient';
    
    const session = ref();
    onMounted(() => {
      supabase.auth.getSession().then(({ data }) => {
        session.value = data.session
      })
      supabase.auth.onAuthStateChange((_, _session) => {
        session.value = _session
      })
    })
</script>
<template>
     <JobsPage v-if="session" :session="session" />
    <Auth v-else/>
</template>