<script setup>
    import { supabase } from '../lib/supabaseClient';
    import { timeAgo } from '@egamagz/time-ago';
    import { ref } from 'vue';
    
    const listings = ref([])
    
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
        
        listings.append(data)
        console.log(data)
    }
</script>

<template>
    <button @click="fetchHistory">Fetch History</button> 
</template>