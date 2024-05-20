<script setup >
useHead({
  title: 'CarTrader'
})

const user = useSupabaseUser()

// Create a computed property that depends on the user state
const isAuthenticated = computed(() => !!user.value)

// Watch the isAuthenticated computed property
watch(isAuthenticated, (newValue, oldValue) => {
  if (!newValue) {
    // User is not authenticated, redirect to login
    navigateTo('/login')
  }
})

if(!user){
  navigateTo('/login')
}
definePageMeta({
  middleware:[
  ]
})

</script>

<template>
  <div>
    <CarHero/>
  </div>

</template>

<style scoped>

</style>