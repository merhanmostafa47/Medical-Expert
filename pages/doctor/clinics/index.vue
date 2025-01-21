<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const localePath = useLocalePath();

// const { data: clinicList, pending: clinicListRequestIsPending } =
//   await useBaseFetch("GET", "clinics", locale);

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
            <td>:</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
