<template>
   <div class="user">
    <div class="user__name">
    <span>👤</span>
    <span>{{ name }}</span> 
    </div>
    <div class="info">
    <span class="email">📧{{ email }}</span>
    <span class="phone">📞{{ phone }}</span>
    <span class="company">🏢{{ company }}</span>
    <button @click="toggleDetails" class="details-btn">
        {{ isExpanded ? '▲ Скрыть' : '▼ Подробнее' }}
      </button>
      <Transition name="slide">
      <div v-if="isExpanded" class="details">
        <p><strong>Город:</strong> {{ address.city }}</p>
        <p><strong>Улица:</strong> {{ address.street }}, {{ address.suite }}</p>
        <p><strong>Сайт:</strong> <a :href="'https://' + website" target="_blank">{{ website }}</a></p>
        <p><strong>Девиз компании:</strong> "{{ companyCatchPhrase }}"</p>
      </div>
    </Transition>
    </div>
   </div>
  </template>

  <script lang="ts" setup>
import { ref } from 'vue';

interface IProps {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  website: string;
  companyCatchPhrase: string;
}
    const isExpanded = ref(false)
   const {name, email, phone, company, address, website, companyCatchPhrase} = defineProps<IProps>()
   const toggleDetails = () => {
    isExpanded.value = !isExpanded.value
   }
  </script>

  <style scoped>
.user {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
}
.info {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    gap: 5px
}
.details-btn {
  background: #3c3d3d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.details {
  margin-top: 4px;
  padding: 12px;
  background: #3c3d3d;
  border-radius: 4px;
  border-left: 4px solid #3c3d3d;
}

.details p {
  margin: 4px 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
  </style>