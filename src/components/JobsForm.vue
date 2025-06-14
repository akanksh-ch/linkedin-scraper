<script setup>
    import JobParams from './JobParams.vue';
    import { ref } from 'vue';
    const params = ref([{'id': 1, 'role': 'Software Engineer', 'location':'London, United Kingdom'}])
    
    function removeItem(index) {
        if (params.value.length == 1) {
            console.log('Only 1 remaining in array, skipping...')
            return
        }
        let id_index = params.value.findIndex(param => param.id == index)
        if (id_index === -1) {
            return
        }
        console.log(params.value[id_index])
        params.value.splice(id_index, 1)
    }
</script>

<template>
    <form id="requirements">
        <JobParams :removeItem="removeItem" v-for="param in params" v-model:id="param.id" v-model:role="param.role" v-model:location="param.location"/> 
    </form>   
    <button style="margin: 1rem" @click="params.push({'id': Date.now(), 'role': 'Software Engineer', 'location':'London, United Kingdom'})
">+</button>
</template>