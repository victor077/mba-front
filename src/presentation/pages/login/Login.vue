<script  setup lang="ts">
import { defineProps } from 'vue'
const { authentication } = defineProps({
    authentication: Function
})

const login = async () => {
    const params = {
        email: 'any_username',
        password: 'any_password'
    }

    try {
        const response = await authentication.auth(params)
        console.log(response); 
    } catch (error) {
        console.error(error)
    } finally {
        console.log('finally')
    }
}

</script>
<template>
    <div>
        <h1>Login</h1>
        <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>
<style scoped>
    h1 {
        color: red;
    }
</style>
