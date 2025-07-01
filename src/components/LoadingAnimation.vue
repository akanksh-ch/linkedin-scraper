<script setup>
    const loading = defineModel('loading', {type: Boolean})
</script>

<template>
<p>Loading</p>

<!--Debug elements-->
<!--
<p>state: {{ loading }}</p>
<button @click="loading = loading ? false : true">Flip state</button>
-->
</template>

<style scoped>
</style>