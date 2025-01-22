<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localePath = useLocalePath();

const openModal = ref(false);
const selectedClinicId = ref(null);
const selectedClinicName = ref(null);
const toggleModal = (id, name) => {
  
  if(id){
    selectedClinicId.value = id
  }
  
  if(name){
    selectedClinicName.value = name
  }
  
  openModal.value = !openModal.value;
  
  console.log(selectedClinicId.value);
};


const deleteClinic = async (id) => {
  const { data, error } = await useBaseFetch("POST", `clinics/delete/${selectedClinicId}`, locale);
  if (!error.value) {
    toast.success(data?.value?.message);
  } else {
    toast.error(error.value?.data?.message);
  }
};

const { data: clinicList, pending: clinicListRequestIsPending } =
  await useBaseFetch("GET", "clinics");

// console.log(clinicList.value);
</script>
<template>
  <div class="px-5 content__wrapper">
    <div class="flex items-center justify-between mb-4">
      <BaseSearchInput placeholder="Search by clinic name and Doctor name " />
      <NuxtLink class="btn main-btn" :to="localePath('/doctor/clinics/add')">
        add a new clinic
        <Icon name="material-symbols:add" size="20" />
      </NuxtLink>
    </div>
    <div class="table__wrapper">
      <table>
        <thead>
          <tr>
            <th id="clinic-name">Clinic name</th>
            <th id="doctor-name">Doctor name</th>
            <th id="phone-number">Clinic phone number</th>
            <th id="working-hours">Working hours</th>
            <th id="speciality">Clinic speciality</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clinic name</td>
            <td>Doctor name</td>
            <td>Clinic phone number</td>
            <td>Working hours</td>
            <td>Clinic speciality</td>
            <td><ClinicActionBtn/></td>
          </tr>

          <tr v-for="clinic in clinicList" :key="clinic.id">
            <td>{{clinic.name}}</td>
            <td>{{clinic.doctor_name}}</td>
            <td>{{clinic.phone_number}}</td>
            <td>{{ clinic.working_hours }}</td>
            <td>{{ clinic.speciality }}</td>
            <td><ClinicActionBtn :id="clinic.id" @delete="deleteClinic(clinic.id)"/></td>
          </tr>
        </tbody>
      </table>
    </div>
    <DeleteModal :openModal="openModal" @close="toggleModal" @delete="toggleModal" :name="clinicList[selectedClinicId]?.name"/>
  </div>
</template>
