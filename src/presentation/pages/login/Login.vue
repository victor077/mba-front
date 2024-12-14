<script  setup lang="ts">   
  import { defineProps, ref } from 'vue'
  const { authentication } = defineProps({
    authentication: Function
  })

  const email = ref<string>('')
  const password = ref<string>('')

  console.log(authentication);
  

  const login = async () => {
    const params = {
      email: email.value,
      password: password.value
    }

    console.log(params);
    

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
        <form @submit.prevent="login">
          <div>
            <label for="email">email</label>
            <input type="text" id="email" v-model="email" placeholder="Username" />
          </div>
          <div>
            <label for="password">Senha</label>
            <input type="password" id="password" v-model="password" placeholder="Password" />
          </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>
<style scoped>
  
</style>
