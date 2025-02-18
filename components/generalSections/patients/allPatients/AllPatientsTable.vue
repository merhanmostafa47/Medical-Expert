<template>
  <v-data-table
    hide-default-footer
    :items="allPatients"
    :items-per-page="pagination.per_page"
    hover
    :headers="headers"
  >
    <template v-slot:item.name="{ item }">
      <div class="flex items-center gap-2">
        <BaseImage class="w-8 h-8 rounded-md" :src="item.image_url" :alt="item.name" /> <span class="text-start">{{ item.name }}</span>
      </div>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"
            ><Icon
              name="qlementine-icons:menu-dots-16"
              class="text-secondary-clr"
              size="20"
              v-bind="props"
          /></v-btn>
        </template>
        <v-list class="px-2 py-0">
          <v-list-item class="px-2">
            <NuxtLink class="text-main-clr" :to="localePath(`/doctor/patients/${item.user_id}`)">
              <v-list-item-title><Icon name="material-symbols:visibility" size="20" />
          {{ $t("BUTTONS.view") }}</v-list-item-title>
            </NuxtLink>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script setup>
const patientsStore = usePatientsStore();
const  { allPatients, pagination } = storeToRefs(patientsStore);

const headers = [ 
  { title: "Name", key: "name" },
  { title: "Patient ID", key: "user_id", align: "center" },
  { title: "Patient phone number", key: "phone", align: "center" },
  { title: "Date of Birth", key: "dob", align: "center" },
  { title: "Gender", key: "gender", align: "center" },
  { title: "Actions", key: "actions", align: "center" },
];
</script>

<style lang="postcss">
.v-table {
  background-color: unset !important;
  &__wrapper {
    table {
      min-width: 800px;
      border-spacing: 0 0.75rem !important;
      border-collapse: separate;
      table-layout: fixed;
      thead {
        tr {
          th {
            @apply bg-main-clr text-white hover:!text-white text-center;
            border-bottom: none !important;
            &:first-child {
              border-top-left-radius: 1rem;
              border-bottom-left-radius: 1rem;
            }
            &:last-child {
              border-top-right-radius: 1rem;
              border-bottom-right-radius: 1rem;
            }
          }
        }
      }
      tbody {
        .v-data-table__tr {
          @apply bg-white;
          td {
            @apply text-secondary-clr text-center;
            border-bottom: 1px solid var(--secondary-clr) !important;
            border-top: 1px solid var(--secondary-clr) !important;
            &:first-child {
              border-left: 1px solid var(--secondary-clr) !important;
              border-top-left-radius: 1rem !important;
              border-bottom-left-radius: 1rem !important;
            }
            &:last-child {
              border-right: 1px solid var(--secondary-clr) !important;
              border-top-right-radius: 1rem !important;
              border-bottom-right-radius: 1rem !important;
            }
          }
        }
      }
    }
  }
}
</style>
