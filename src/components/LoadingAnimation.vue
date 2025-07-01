<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    const loading = defineModel('loading', {type: Boolean})
    const index = ref(0)
    const intervalID = ref(0)
    const result = ref('.oading')
    
    onMounted(() => {
        /*
        intervalID.value = setInterval(() => {
        */
            result.value = "Loading".slice(0, index.value) + '.' + "Loading".slice(index.value + 1)
            index.value += 1
            if (index.value > "Loading".length) {
                index.value = 0
            }
            /*
        }, 100)
    */
    })
    
    //onBeforeUnmount(() => clearInterval(intervalID))
</script>

<template>
<p>{{ result }}</p>    

<!--Debug elements-->
<p>state: {{ loading }}</p>
<button @click="loading = loading ? false : true">Flip state</button>
</template>

<style scoped>
</style>