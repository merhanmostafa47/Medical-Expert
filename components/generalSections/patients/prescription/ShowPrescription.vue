<template>
  <div class="border border-secondary-clr rounded-xl p-6 my-10 mx-0 md:mx-10 bg-opacity-bg">
    <header class="pb-8 mb-8 border-b border-secondary-clr ">
      <p><span>{{ $t('TITLES.Patients.name') }}: </span><span>{{ prescription.patient_name}}</span></p>
      <p><span>{{ $t('TITLES.Patients.age') }}: </span><span>{{ prescription.patient_age}}</span></p>
    </header>
    <article>
      <v-row class="py-3" v-for="item in medicines" :key="item.id">
        <v-col class="!py-0" cols="12" md="6">
          <p><Icon name="lucide:dot"/><span>{{ $t('TITLES.Patients.prescription.medicines') }}: </span><span>{{ item.name}}</span></p>
        </v-col>
        <v-col class="!py-0" cols="12" md="6">
          <p><Icon name="lucide:dot"/><span>{{ $t('TITLES.Patients.prescription.dosage') }}: </span><span>{{ item.dosage}}</span></p>
        </v-col>
      </v-row>
    </article>
    <footer class="pt-8 mt-8 border-t border-secondary-clr">
      <v-row class="">
        <v-col class="!py-0" v-for="(value, key) in doctorData" :key="key" cols="12" md="6">
          <p><span>{{ $t(`TITLES.doctor.${key}`) }}: </span><span>{{ value }}</span></p>
        </v-col>
      </v-row>  
    </footer>
  </div>
</template>
<script setup>
const { t, locale } = useI18n();
const route = useRoute();

const prescription = ref([]);

// Fetch prescription
const { data, error } = await useBaseFetch(
  "GET",
  `prescriptions/${route?.params?.prescriptionId}/show`,
  locale.value
);
if (!error.value) {
  prescription.value = data.value?.data;
}

const medicines = computed(() => {
  const meds = prescription.value?.medicines || [];
  const placeholdersNeeded = 8 - meds.length;
  if (placeholdersNeeded > 0) {
    const placeholders = Array.from({ length: placeholdersNeeded }).map(() => ({
      name: '---------------------------',
      dosage: '---------------------------',
    }));
    return [...meds, ...placeholders];
  }
  return meds;
});

const doctorData = computed(()=> {
  return {
    name: prescription.value?.doctor_name,
    clinicName: prescription.value?.clinic_name,
    clinicPhone: prescription.value?.clinic_phone,
    address: prescription.value?.address,
    specialty: prescription.value?.specialty
  }
})
</script>

<style lang="postcss" scoped>
  header,
  footer {
    p {
      @apply !py-1 text-lg;
      span {
        &:first-of-type {
          @apply font-bold text-main-clr;
        }
        &:last-of-type {
          @apply text-secondary-clr;
        }
      }
    }
  }
  article {
    p {
      @apply !py-1 text-secondary-clr text-lg;
      span {
        &:first-of-type {
          @apply font-bold;
        }
      }
    }
  }
</style>