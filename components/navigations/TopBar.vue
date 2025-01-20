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
          <h3 class="user_name">Ahmed Tarek</h3>
          <p class="user_work">
            Doctor
          </p>
        </div>
        <div class="user__img">
          <NuxtImg src="/media/images/doctor.svg" alt="user" />
        </div>
      </div>
    </div>
  </div>
</template>
