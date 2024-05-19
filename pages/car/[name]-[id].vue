<script setup >


import {computed} from "vue";
const {cars} = useCars()

const route = useRoute()
const car = computed(()=> {
  return cars.find((car) => {
    return car.id === parseInt(route.params.id)
  })
})

useHead({
  title: route.params.name
})

definePageMeta({
  layout:'custom'
})
if(!car.value){
  //  this is a server customf error
  throw createError({
    statusCode: 404,
    message:'Car Doesnt Exist'
  })
}

</script>

<template>
  <div v-if="car">
    <CarDetailHero :car="car"/>
    <CarDetailAttributes :features="car.features"/>
    <CarDetailDescription :description="car.description"/>
    <CarDetailContact/>
  </div>
</template>

<style scoped>

</style>