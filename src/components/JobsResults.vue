<script setup>
  const jobs = defineModel('jobs', {default: []})
</script>

<template>
  <div class="wrapper">
    <div class="job" v-if="jobs.length > 0" v-for="job in jobs" :key="job.title">
      <strong><a :href=job.url>{{ job.title }}</a></strong> - <strong>{{ job.company }}</strong>
      <p>{{ job.location }}</p>
    </div>  
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .job {
    border: solid hsla(0, 0%, 100%, 0.5) 1px;
    border-radius: 0.25rem;
    margin: 1rem;
    padding: 1rem;
  }
  a {
    text-decoration: none;
  }
  a:link {
    color: hsl(220, 100%, 50%) 
  }
</style>