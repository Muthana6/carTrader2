<script setup >
import {useRouter} from "#app";

const modal = ref({
  make: false,
  location: false,
  price: false
})
const router = useRouter()
const route = useRoute()
const city = ref('')
const {makes} = useCars()
const priceRange = ref({
  min: '',
  max: ''
})
const updateModal = (key)=> {
  modal.value[key] = !modal.value[key]
  console.log(key)
}

const onChangeLocation = () => {
  if(!city.value) return
  if(!isNaN(parseInt(city.value))){
    throw createError({
      statusCode: 400,
      message: 'invalid city format'
    })
  }

  updateModal('loaction')
  navigateTo(`/city/${city.value}/car/${route.params.make}`)
  city.value = ''
}

const onChangeMake= (make) => {
  updateModal("make")
  navigateTo(`/city/${route.params.city}/car/${make}`)
}

const priceRangeText = computed(() => {
  const minPrice = route.query.minPrice
  const maxPrice = route.query.maxPrice

  if(!minPrice && !maxPrice) return "Any"
  else if(!minPrice && maxPrice) {
    return `< $${maxPrice}`
  }
  else if(minPrice && !maxPrice) {
    return `> $${minPrice}`
  }
  else {
    return `$${minPrice}-$${maxPrice}`
  }
})

const onChangePrice= () => {
  updateModal('price')
  if(priceRange.value.max && priceRange.value.min){
    // if min>max ignore
    if(priceRange.value.min>priceRange.value.max){
      return
    }
  }
  router.push({
    query: {
      minPrice: priceRange.value.min,
      maxPrice: priceRange.value.max
    }
  })

}
</script>

<template>
  <div class="shadow border w-64 mr-10 z-30 h-[190px]">

    <!--    Location Start-->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3 @click="updateModal('location')">Location</h3>
      <h3 @click="updateModal('location')"
          class="text-blue-400 capitalize ml-1"> {{ route.params.city }}</h3>

      <div v-if="modal.location" class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white">
        <input type="text" class="border p-1 rounded" v-model="city" />
        <button
            @click="onChangeLocation"
            class="bg-blue-400 w-full mt-2 rounded text-white p-1">
          Apply
        </button>

      </div>
    </div>
    <!--    Location End-->

    <!--    Make Start-->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3 @click="updateModal('make')">Make</h3>
      <h3 class="text-blue-400 capitalize"
          @click="updateModal('make')">
        {{ route.params.make || 'Any' }}
      </h3>
      <div
          v-if="modal.make"
          class="absolute border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white">
          <h4 v-for="make in makes" :key="make"
              @click="onChangeMake(make)"
              class="w-1/3">
            {{make}}
          </h4>
      </div>
    </div>
    <!--    Make End-->

    <!--    Price Start-->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">

      <h3 @click="updateModal('price')">Price</h3>
      <h3 @click="updateModal('price')" class="text-blue-400 capitalize">{{priceRangeText}}</h3>
      <div v-if="modal.price"
           class="absolute border shadow left-56
            p-5 top-1 -m-1 bg-white" >
        <input type="number" placeholder="Min"
               v-model="priceRange.min" class="border p-1 rounded">
        <input type="number" placeholder="Max"
               v-model="priceRange.max" class="border p-1 rounded">
        <button @click="onChangePrice"
                class="bg-blue-400 w-full mt-2
                 rounded text-white p-1">
          Apply
        </button>
      </div>

    </div>
    <!--    Price End-->

  </div>

</template>

<style scoped>

</style>