<script setup >
const route = useRoute()

useHead({
  title:route.params.make?
      route.params.make.toUpperCase():
      route.params.city.toUpperCase()
})

</script>

<template>
  <div
      class="mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16 w-3/5"
  >
    <div class="mt-32 flex">
      <NuxtErrorBoundary>
        <CarSideBar/>
        <NuxtPage/>
        <!-- Template for the client error       -->
        <template #error="{error}">
          <div class="text-center mx-auto flex flex-col">
            <h1 class="text-3xl text-red-600">Sorry, Something went Wrong</h1>
            <code>{{error}}</code>
            <button @click="error.value = null" class="text-white bg-blue-400 px-10 py-4 rounded mt-4">
              Go Back
            </button>
          </div>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>

</template>

<style scoped>

</style>