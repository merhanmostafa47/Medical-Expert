import { useAuthStore } from "~/stores/AuthData";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!authStore.userToken) {
    return navigateTo("/auth/login");
  }
});
