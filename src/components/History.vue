<script setup>
    import { supabase } from '../lib/supabaseClient';
    import { timeAgo } from '@egamagz/time-ago';
    import { ref } from 'vue';
    
    const listings = ref()
    
    async function fetchHistory() {
        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
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
    }
</script>

<template>
    <button @click="fetchHistory">Fetch History</button> 
    <div v-for="listing in listings" :key="listing.created_at">
        <p>{{ timeAgo(new Date(listing.created_at)) }}</p>
        <h3>{{ listing.linkedin_listings.title }}</h3>
        <p>{{ listing.linkedin_listings.company }}</p>
        <p>{{ listing.linkedin_listings.description }}</p>
        <p>{{ listing.linkedin_listings.location }}</p>
    </div>
</template>