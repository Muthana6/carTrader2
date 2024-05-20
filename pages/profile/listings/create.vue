

<template>
<div>
  <div class="mt-24">
    <h1 class="text-6xl "> Create a new listing</h1>
  </div>


  <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
    <CarAdSelect title="Make *" :options="makes" name="make" @change-input="onChangeInput"/>
    <CarAdInput v-for="input in inputs" :key="input.id" @change-input="onChangeInput"
                :title="input.title" :name="input.name" :placeholder="input.placeholder"/>
    <CarAdTextarea @change-input="onChangeInput" title="Description *" name="description" placeholder="" />
    <CarAdImage @change-input="onChangeInput"/>
    <div>
      <button @click="handleSubmit" :disabled="isButtonDisabled" class="bg-blue-400 text-white rounded py-2 px-7 mt-3">Submit</button>
      <p v-if="errorMessage" class="mt-3 text-red-400">{{errorMessage}}</p>
    </div>
  </div>
</div>
</template>

<script setup >
import {useCars} from "~/composables/useCars.js";
const {makes} = useCars()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
// console.log(user.value.id, 'iddddddd')

const info = useState('adInfo',()=> {
  return{
    make:'',
    model:'',
    year:'',
    miles:'',
    price:'',
    city:'',
    seats:'',
    description:'',
    image: null
  }
})

const inputs = [
  {
    id:1,
    title: "Model *",
    name: "model",
    placeholder:"Civic"
  },  {
    id:2,
    title: "Price *",
    name: "price",
    placeholder:"1000$"
  }, {
    id:3,
    title: "Year *",
    name: "year",
    placeholder:"2024"
  },  {
    id:4,
    title: "Miles *",
    name: "miles",
    placeholder:"0"
  },  {
    id:5,
    title: "City *",
    name: "city",
    placeholder:"Rostock"
  },  {
    id:6,
    title: "Number of Seats *",
    name: "seats",
    placeholder:"2"
  },  {
    id:7,
    title: "Features *",
    name: "features",
    placeholder:"No Accidents"
  },
]

const errorMessage = ref("")
const onChangeInput = (data,name) => {
  info.value[name]= data
}

// definePageMeta({
//   layout:"custom",
//   middleware: [
//     'auth'
//   ]
// })

const isButtonDisabled = computed(()=> {
  for (let key in info.value) {
    if (!info.value[key]){
      return true
    }
    return false
  }
})

const handleSubmit = async () => {
  // upload pictures
  const fileName = Math.floor(Math.random() * 10000000000)
  const{data, error} = await supabase.storage.from("images").upload("public/" + fileName, info.value.image)
  if (error){
    return errorMessage.value ="cannot upload image"
  }


  const body = {
    ...info.value,
    city: info.value.city.toLowerCase() ,
    features: info.value.features.split(", "), // return them in aan array
    numberOfSeats: parseInt(info.value.seats),
    miles: parseInt(info.value.miles),
    price: parseInt(info.value.price),
    year: parseInt(info.value.year),
    name: `${info.value.make} ${info.value.model}`,
    listerId: user.value.id,
    image: data.path
  }
  delete body.seats

  try {
    const response = await $fetch("/api/car/listings", {
      method: "post",
      body
    })
    navigateTo('/profile/listings')
  } catch (err) {
    errorMessage.value =err.statusMessage
    await supabase.storage.from("images").remove(data.path)
  }
}
</script>
<style scoped>

</style>