export default async (city,filters)=> {
    const {data, error, refresh} = await useFetch(`/api/cars/${city}`,{
        params: {
            ...filters,
        }
    })
    console.log()
    if(error.value) {
        throw createError({
            ...error.value,
            statusMessage:'Unable to Fetch cars'
        })
    }
    return {data, refresh}
}