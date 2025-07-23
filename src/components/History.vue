<script setup>
    import { supabase } from '../lib/supabaseClient';
    import { ref, onMounted } from 'vue';
    import HistoryListing from './HistoryListing.vue';
    
    const listings = ref()
    const loading = ref(true)
    
    async function fetchHistory(before = new Date().toISOString()) {
        const { data: { user } } = await supabase.auth.getUser()
        const { data, _error } = await supabase
        .from('queries')
        .select(`
            id,
            created_at,
            role,
            location,
            listing_id,
            linkedin_listings (
                id,
                title,
                company,
                description,
                location,
                url
            )`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .lt('created_at', before)
        .limit(10) // for "Load More" feature later
        
        listings.value = [...data]
        loading.value = false
        console.log(data)
    }
    
    onMounted(fetchHistory)
</script>

<template>
    
    <div class="loader" v-if="loading"></div>
    <div v-else v-for="listing in listings" :key="listing.id">
        <HistoryListing :listing="listing" />
    </div>
    <button @click="fetchHistory(listings.at(-1).created_at)">Load more</button>
</template>

<style scoped>
div {
    border-radius: 5px;
    border: solid 1px white;
    margin: 1rem;
    padding: 2rem;
    border-radius: 5px;
}

/* HTML: <div class="loader"></div> */
.loader {
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  border: none;
  clip-path: inset(0 3ch 0 0);
  animation: l4 1s steps(4) infinite;
}
.loader:before {
  content:"Loading..."
}
@keyframes l4 {to{clip-path: inset(0 -1ch 0 0)}}

.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
    
button {
    position: relative;
    top: 0;
    left: 50%;
    transform: translate(-50%, -0);   
}
</style>