<script setup>
// import useLogout from "~/composables/useLogout.js";
//
import {ref} from "vue";

const user = useSupabaseUser()
// const {logout} = useLogout()
const supabase = useSupabaseClient()

const error = ref(null)
const isPending = ref(false)

const logout = async () => {
  error.value = null
  isPending.value = true

  try {
    console.log('Attempting to log out...')
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      console.log('Logout error')
      throw new Error(signOutError.message);
    }

    console.log('Logout successful');
    error.value = null
  } catch (err) {
    console.error('Logout error:', err.message)
    error.value = 'Failed to log out'
  } finally {
    isPending.value = false
  }
}




</script>

<template>
  <header class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md">
    <NuxtLink class="text-3xl font-mono" href="/">cartrader <icon name="fa-solid:car-side"></icon></NuxtLink>
    <!--    If logged in-->
    <div v-if="user" class="flex">
      <NuxtLink to="/profile/listings" class="mr-5">
        Profile
      </NuxtLink>
      <p @click="logout" class="cursor-pointer">Logout</p>
    </div>

    <!--    If not logged in-->
    <NuxtLink v-else to="/login">Login</NuxtLink>

  </header>
</template>

<style scoped>

</style>