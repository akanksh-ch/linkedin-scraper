<script setup>
  const jobs = defineModel('jobs', {default: []})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Company</th>
        <th>Description</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(job, i) in jobs" :key="i">
        <td>{{ job.title }}</td>
        <td>{{ job.company }}</td>
        <td>{{ job.description }}</td>
        <td>{{ job.location }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
  table, th, td {
    border: 1px solid white
  }
</style>