<script setup>
    const role = defineModel('role', {default:'Software Engineer'});
    const location = defineModel('location', {default:'London, United Kingdom'});
</script>
<template>
    <form>
        <label :for="role">Role<input :id="role" name="role" type="text" v-model="role" /></label>
        <label :for="location">Location<input :id="location" name="location" type="text" v-model="location" /></label>
    </form>
    <button>Fetch Jobs</button>
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
    }
   </style>