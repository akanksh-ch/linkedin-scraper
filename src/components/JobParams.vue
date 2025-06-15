<script setup>
    const role = defineModel('role');
    const location = defineModel('location');
</script>
<template>
    <div>
        <label :for="role">Role<input :id="role" name="role" type="text" v-model="role" /></label>
        <label :for="location">Location<input :id="location" name="location" type="text" v-model="location" /></label>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        gap: 1rem;
        margin: 1rem;
        border: solid hsla(0, 0%, 100%, 0.5) 1px;
        padding: 1rem;
        border-radius: 0.25rem;
    }
    
    input {
        margin-left: 1rem;
    }
</style>