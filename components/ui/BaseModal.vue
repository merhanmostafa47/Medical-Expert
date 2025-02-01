<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
</script>

<template>
    <div v-if="isOpen" class="modal__backdrop" @click="emit('close')">
      <div class="modal">
        <slot></slot>
      </div>
    </div>
</template>

<style scoped>
.modal__backdrop {
  @apply fixed inset-0 size-full bg-[#D9D9D9BF] flex justify-center items-center z-[1005];
}

.modal {
  @apply bg-[#FEFEFE] rounded-3xl max-w-[550px] m-5;
}
</style>

