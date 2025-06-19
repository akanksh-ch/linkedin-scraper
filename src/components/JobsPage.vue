<script setup>
    import JobsForm from './JobsForm.vue';
    import JobsResults from './JobsResults.vue';
    import { ref } from 'vue';
    
    const jobs = ref([
        {title: 'Software Testing Engineer', company: 'Dell', location: 'Birmingham, United Kingdom', url: 'https://example.com'}
    ])
</script>

<template>
    <JobsForm v-model:jobs="jobs"/>
    <JobsResults v-model:jobs="jobs"/>
</template>