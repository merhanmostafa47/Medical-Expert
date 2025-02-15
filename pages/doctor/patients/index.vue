<template>

    <section class="flex flex-wrap items-center justify-between gap-2 px-5 mb-4">
      <BaseSearchInput placeholder="Search by patient ID" @search="search = $event" />
      <div class="flex items-center gap-3">
        <div
          class="flex overflow-hidden border rounded-md justify-space-around border-main-clr"
        >
          <Icon
            @click="toggleView"
            name="material-symbols:lists"
            :class="[
              'p-[2px] cursor-pointer transition',
              isTableView ? 'bg-main-clr text-white' : 'bg-white text-main-clr',
            ]"
            size="1.5rem"
          />
          <Icon
            @click="toggleView"
            name="material-symbols:cards"
            :class="[
              'p-[2px] cursor-pointer transition',
              !isTableView
                ? 'bg-main-clr text-white hover:bg-opacity-bg'
                : 'bg-white text-main-clr',
            ]"
            size="1.5rem"
          />
        </div>
        <NuxtLink class="btn main-btn" :to="localePath('/doctor/patients/add')">
          Add a new patient
          <Icon name="material-symbols:add" size="20" />
        </NuxtLink>
      </div>
    </section>

    <section v-if="allPatients.length">
      <allPatientsTable v-if="isTableView" />
      <allPatientsCards v-else />
      <v-pagination
        @update:modelValue="updateRouterQueryParam"
        v-model="page"
        :length="pagination.last_page"
        :total-visible="pagination.per_page"
      >
      </v-pagination>
    </section>
</template>

<script setup>
const { locale } = useI18n();
const router = useRouter();
const route = useRoute();

const page = ref(parseInt(route.query.page) || 1);

const isTableView = ref(true);
const toggleView = () => {
  isTableView.value = !isTableView.value;
};

const patientsStore = usePatientsStore();
const { allPatients, pagination } = storeToRefs(patientsStore);

const { data, error } = await useBaseFetch("GET", "patients", locale, null, {
  page: page.value,
});
if (!error.value) {
  patientsStore.setAllPatientsData(data.value);
}

const updateRouterQueryParam = async (newPage) => {
  await router.push({
    query: {
      ...route.query,
      page: newPage,
    },
  });

  try {
    const res = await useClientFetch("GET", "patients", locale.value, null, {
      page: page.value,
    });
    patientsStore.setAllPatientsData(res);
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await router.push({
    query: {
      ...route.query,
      page: page.value,
    },
  });
});
</script>
