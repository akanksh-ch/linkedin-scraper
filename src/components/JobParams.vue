<script setup>
    const id = defineModel('id');
    const role = defineModel('role');
    const location = defineModel('location');
    const props = defineProps({
        removeItem: {
            type: Function
        }
    })
</script>
<template>
    <div>
        <label :for="`role-${id}`">Role<input :id="`role-${id}`" name="role" type="text" v-model="role" /></label>
        <label :for="`location-${id}`">Location<input :id="`location-${id}`" name="location" type="text" v-model="location" /></label>
        <buton v-if="id > 1" @click="removeItem(id)" style="color: red; border: 1px solid grey; border-radius: 5rem; padding: 0.5rem; font-size: 90%;">Remove</buton>
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