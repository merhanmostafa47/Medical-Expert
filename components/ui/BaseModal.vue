<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close'])
</script>

<template>

    <div v-if="isOpen" class="modal__backdrop" @click="$emit('close')">
      <div class="modal">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit consequuntur nesciunt temporibus suscipit, esse deserunt placeat? Ipsum distinctio, aliquam numquam explicabo nulla fugit aspernatur deleniti animi omnis quas praesentium perferendis ut rem dignissimos est, saepe labore optio itaque magni dolores cupiditate porro! Voluptatem praesentium voluptates reiciendis quos impedit a animi illum, eos distinctio! Molestiae mollitia iusto in vero qui exercitationem totam molestias impedit animi illo eius facere sint modi veniam delectus voluptatibus labore illum, aspernatur expedita dolor pariatur? Hic dolorem accusantium debitis expedita ducimus deserunt iure repudiandae quod eaque exercitationem dignissimos eveniet itaque nesciunt facere illum provident, nobis pariatur?
        <slot></slot>
      </div>
    </div>
</template>

<style scoped>
.modal__backdrop {
  @apply fixed inset-0 size-full bg-[#D9D9D9BF] flex justify-center items-center z-50;
}

.modal {
  @apply bg-[#FEFEFE] rounded-3xl max-w-[550px] m-5;
}
</style>

