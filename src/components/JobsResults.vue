<script setup>
  const jobs = defineModel('jobs', {default: []})
</script>

<template>
  <div :class="wrapper">
    <div class="job" v-if="jobs.length > 0" v-for="job in jobs" :key="job.title">
      {{ job }}
    </div>  
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .job {
    border: solid hsla(0, 0%, 100%, 0.5) 1px;
    border-radius: 0.25rem;
    margin: 1rem;
  }

</style>