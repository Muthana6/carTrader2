export default defineNuxtRouteMiddleware((to, from) => {
    if(to.path.includes("login")||to.path.includes("signup")){
        return
    }
    const user = useSupabaseUser()
    if(user.value){return}
    return navigateTo("/login");

})