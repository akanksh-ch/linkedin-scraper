<script setup>
    const role = defineModel('role', {default:'Software Engineer'});
    const location = defineModel('location', {default:'London, United Kingdom'});
    const jobs = defineModel('jobs', {default: [], type: Array})
    
    function fetchJobs() {
        /*
        const url = 'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search'
        const keywords = role.value.toLowerCase().split(' ').join('+') // The job role converted to lower+case format
        const location_data = encodeURI(location.value)
        
        console.log(`${url}?keywords=${keywords}&location=${location_data}`)
        */
        
        console.log('fetchJobs triggered!')
        jobs.value.push({title: 'Software Testing Engineer', company: 'Dell', description: 'we want a passionate tester', location: 'Birmingham, United Kingdom', url: 'https://example.com'})
    }

</script>
<template>
    <form>
        <label :for="role">Role<input :id="role" name="role" type="text" v-model="role" /></label>
        <label :for="location">Location<input :id="location" name="location" type="text" v-model="location" /></label>
    </form>
    <button @click="fetchJobs">Fetch Jobs</button>
</template>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        gap: 1rem;
        margin: 1rem;
        border: solid hsla(0, 0%, 100%, 0.5) 1px;
        padding: 1rem;
        border-radius: 0.25rem;
    }
    
    input, button {
        margin-left: 1rem;
    }
    
    button {
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