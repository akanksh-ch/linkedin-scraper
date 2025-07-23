<script setup>
    import { supabase } from '../lib/supabaseClient';
    import { ref, onMounted } from 'vue';
    import HistoryListing from './HistoryListing.vue';
    
    const listings = ref()
    
    onMounted(async () => {
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
        .limit(10) // for "Load More" feature later
        
        listings.value = [...data]
        console.log(data)
    })
</script>

<template>
    <div v-for="listing in listings" :key="listing.id">
        <HistoryListing :listing="listing" />
    </div>
</template>

<style scoped>
div {
    border-radius: 5px;
    border: solid 1px white;
    margin: 1rem;
    padding: 2rem;
    border-radius: 5px;
}
</style>