<script setup>
  import {ref} from "vue";

  const email = ref('')
  const password = ref('')
  const supabase = useSupabaseClient()

  const error = ref(null)
  const isPending = ref(false)

  const login = async (email, password) => {
    error.value = null
    isPending.value = true

    try {
      console.log('tryiing')
      const { user, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if(user){
        console.log('success')
      }

      if (signInError) {
        console.log('signIn Errpr')
        throw new Error(signInError.message);
      }
      error.value = null
      isPending.value = false
      return user;

    } catch (signInError) {
      console.error('Sign-in error:', signInError.message)
      error.value = 'Incorrect login credentials'
      isPending.value = false
    }
  }

  const user = useSupabaseUser()

  const handleSubmit = async ()=> {
    await login(email.value, password.value)
    email.value = ''
    password.value = ''
    if(user){
      navigateTo('/')
    }

  }
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col">
<!--    <p>{{ currentUser}}</p>-->
    <h3>Login</h3>
    <input class=" "
           type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">


    <div class="error" v-if="error">{{error}}</div>

    <button v-if="!isPending"
            class="block my-2">Login</button>
    <button v-if="isPending"
            class="block my-2"
            disabled>Loading...</button>
    <NuxtLink to="/signup" class="text-blue-400 text-center">dont have an email, signup here</NuxtLink>
  </form>
  yRpzITZNQ8xBdP64

</template>





<style scoped>
:root {
  --primary: #4f515a;
  --secondary: #ebebeb;
  --warning: #da0f41;
}
/* forms */
form {
  max-width: 400px;
  margin: 30px  auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 6px 8px 10px rgba(50,50,50,0.05);
  border: 1px solid  #4f515a;
  background: white;
}
input, textarea {
  border-bottom: 1px solid #4f515a;
  padding: 10px;
  outline: none;
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin: 20px auto;
}

button {
  border: 1px solid cornflowerblue;
  border-radius: 10px;
  padding: 5px;
  color: cornflowerblue;
}
button:hover {
  background: cornflowerblue;
  color: white;
}

</style>