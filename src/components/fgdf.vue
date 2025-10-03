<script setup lang="ts">
import Search from "./components/Search.vue";
import Filter from "./components/Filter.vue";
import User from "./components/User.vue";
import { useGetUser } from "./composables/useGetUsers";
import { onMounted, computed, ref } from "vue";

const { users, fetchUsers } = useGetUser();

const searchQuery = ref('')
const selectedCompany = ref('')

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
})

const companies = computed(() => {
  if (!users.value) return []
  return [...new Set(users.value.map(user => user.company.name))]
})

onMounted(() => {
  fetchUsers()
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleFilter = (company: string): void => {
  selectedCompany.value = company
}
</script>

<template>
  <div class="container">
    <h1>📊 Список пользователей</h1>
    
    <div class="header">
      <Search :modelValue="searchQuery" @update:modelValue="handleSearch" />
      <Filter :companies="companies" @filter="handleFilter" />
    </div> 
    
    <div class="stats">
      <h3>Найдено пользователей: {{ filteredUsers.length }}</h3>
      <div v-if="selectedCompany" class="active-filter">
        Фильтр: {{ selectedCompany }}
        <button @click="selectedCompany = ''" class="clear-filter">×</button>
      </div>
    </div>
    
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.active-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #e3f2fd;
  padding: 6px 12px;
  border-radius: 16px;
  color: #1976d2;
}

.clear-filter {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #1976d2;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 18px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

h3 {
  color: #333;
  margin: 0;
}

.list {
  padding-bottom: 20px;
}
</style>