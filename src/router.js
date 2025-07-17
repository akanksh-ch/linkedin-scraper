import {createRouter, createWebHistory } from "vue-router";
import { getAuth } from "./auth";

import JobsPage from "./components/JobsPage.vue";
import Auth from "./Auth.vue";

const routes = [
    { path: '/', component: JobsPage},
    { path: '/login', component: Auth},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


router.beforeEach(async (to, _from) => {
    const session = await getAuth()
    
    if (to.path != '/login' && session.value == null) {
        return { path: '/login' }
    }
    
    if (to.path == '/login' && session.value != null) {
        return { path: '/' } 
    }
})

export default router