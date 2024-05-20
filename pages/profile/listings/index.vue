<script setup>
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
  layout:'custom',
  middleware:[

  ]
})
</script>

<template>
  <div>

    <div class="flex justify-between mt-24 items-center">
      <h1 class="text-6xl">My Listings</h1>
      <NuxtLink to="/profile/listings/create" class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer pb-1">
        +
      </NuxtLink>
    </div>

    <div class="shadow rounded p-3 mt-5">
<!--      <CarListingCard v-for="listing in listings" :key="listing.id" :listing="listing" @deleteClick="handleDelete"></CarListingCard>-->
    </div>

  </div>
</template>



<style scoped>

</style>