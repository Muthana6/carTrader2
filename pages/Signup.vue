<script setup>
</script>

<template>

  <form @submit.prevent="handleSubmit" class="flex flex-col ">
    <h3>Signup</h3>
    <input class=" "
           type="email" placeholder="Email" v-model="email">
    <input class=" "
           type="text" placeholder="Display Name" v-model="displayName">
    <input type="password" placeholder="Password" v-model="password">

    <div class="error" v-if="error">{{error}}</div>

    <button v-if="!isPending">Signup</button>
    <button v-if="isPending" disabled>Loading...</button>
    <NuxtLink to="/login" class="text-blue-400 text-center my-2">Already have email, sign in here</NuxtLink>

  </form>


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