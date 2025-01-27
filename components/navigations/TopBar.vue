<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  notifications: {
    type: Array,
    required: false,
  },
});

// Set authed data in store
import { useAuthStore } from "@/stores/AuthData.js";
const authStore = useAuthStore();
</script>
<template>
  <div class="topbar">
    <h1 class="page_title">
      {{ title }}
    </h1>
    <div class="notifications_and_profile">
      <button>
        <NuxtImg src="/media/icons/bell.svg" class="size-5" alt="notifications" />
      </button>
      <div class="user__info">
        <div class="info">
          <h3 class="user_name">{{authStore.userName}}</h3>
          <p class="user_work">
            {{authStore.userRole}}
          </p>
        </div>
        <div class="user__img">
          <NuxtImg :src="authStore.avatar ?? '/media/icons/user-placeholder.png'"alt="user" />
        </div>
      </div>
    </div>
  </div>
</template>
