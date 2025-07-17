<script setup>
    import JobsForm from './JobsForm.vue';
    import JobsResults from './JobsResults.vue';
    import { onMounted, ref } from 'vue';
    import { getAuth } from '../auth';
    
    const session = ref();
    
    onMounted(async () => {
        session.value = await getAuth();
    })
    
    const jobs = ref([
        //{title: 'Software Testing Engineer', company: 'Dell', location: 'Birmingham, United Kingdom', url: 'https://example.com', description: 'foo'}
    ])
</script>

<template>
    <JobsForm v-model:jobs="jobs"/>
    <JobsResults v-model:jobs="jobs"/>
</template>