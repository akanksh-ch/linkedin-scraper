<script setup>

import { timeAgo } from '@egamagz/time-ago';
import { ref } from 'vue';

const { listing } = defineProps({listing: Object})
const showMore = ref(false)

console.log(listing)

</script>

<template>
    <p>{{ timeAgo(new Date(listing.created_at)) }}</p>
    <h3><a :href="listing.linkedin_listings.url">{{ listing.linkedin_listings.title }}</a></h3>
    <p><b>{{ listing.linkedin_listings.company }}</b></p>
    <p :style="showMore ? '-webkit-line-clamp: 0' : '-webkit-line-clamp: 5'" >{{ listing.linkedin_listings.description }}</p>
    <p>{{ listing.linkedin_listings.location }}</p>
    <button @click="showMore = !showMore">{{ showMore ? "Show Less" : "Show More"}}</button>
</template>

<style scoped>
p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /*-webkit-line-clamp: 3;*/
    overflow: hidden;
}

button {
    position: relative;
    top: 0;
    left: 50%;
    transform: translate(-50%, -0);
    background-color: #007AFF;
    color: white;
    border-radius: 1rem;
    border: none;
    font-size: 1rem;
    padding: 0.4rem;
    outline: none;
    margin-bottom: 1rem;
}
</style>