<script setup lang="ts">
import Search from "./components/Search.vue";
import Filter from "./components/Filter.vue";
import User from "./components/User.vue";
import { useGetUser } from "./composables/useGetUsers";
import { onMounted, computed, ref } from "vue";
import { useGetCompanies } from "./composables/useGetCompanies";

const { users, fetchUsers } = useGetUser();

const selectedCompany = ref<string>('');
const searchQuery = ref<string>('');

const companiesList = computed(()=>useGetCompanies(users.value));
const filteredUsers = computed(() => {
  if (!users.value) return []
  return users.value.filter(user => {
    const matchesSearch = searchQuery.value === '' || 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCompany = selectedCompany.value === '' || 
      user.company.name === selectedCompany.value
    
    return matchesSearch && matchesCompany
  })
});

onMounted(() => {
  fetchUsers();
});

const handleFilter = (company: string): void => {
  selectedCompany.value = company;
  }
</script>

<template>
  <div class="container">
    <div class="header">
      <Search :model-value="searchQuery" 
              @update:model-value="(value) => searchQuery = value" />
      <Filter @filterChange="handleFilter" :companies="companiesList"/>
    </div> 
    <div v-if="selectedCompany" class="active-filter">
        Фильтр: {{ selectedCompany }}
        <button @click="selectedCompany = ''" class="clear-filter">×</button>
      </div>
    <h3>список пользователей ({{ filteredUsers.length }})</h3>
    <div class="list">
      <User 
        v-for="user in filteredUsers" 
        :key="user.id" 
        :name="user.name" 
        :email="user.email" 
        :phone="user.phone" 
        :company="user.company.name"
        :address="user.address"
        :website="user.website"
        :companyCatchPhrase="user.company.catchPhrase"
      />
      <div v-if="filteredUsers.length === 0" class="empty-state">
        😔 Пользователи не найдены
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 70vw;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: start;
}
h3 {
  text-align: center;
}
.list {
  padding-bottom: 20px;

}
</style>
