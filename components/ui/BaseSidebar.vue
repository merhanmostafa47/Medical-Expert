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
        <div v-if="isOpen" class="sidebar__backdrop" @click="emit('close')">
          <div class="sidebar">
            <slot></slot>
          </div>
        </div>
    </template>
    
    <style scoped>
    .sidebar__backdrop {
      @apply fixed inset-0 size-full bg-[#D9D9D9BF] flex justify-end items-end z-[1005] transition-all duration-300 ease-linear;
    }
    
    .sidebar {
      @apply bg-white rounded-ss-3xl rounded-es-3xl xl:w-[30%] lg:w-1/2 w-full h-full p-5 transition-all duration-300 ease-linear;
    }
    </style>
    
    