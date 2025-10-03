<template>
        <select 
        name="company" 
        id="company-select"
        @change="handleChange">
            <option value="">Все компании</option>
            <option v-for="company in companies" :key="company" :value="company" >{{ company }}</option>
        </select>
  </template>

  <script lang="ts" setup>

  interface IProps { companies: string[] }
  interface IEmits { 
  (e: 'filterChange', company: string): void;
}
    const emit = defineEmits<IEmits>()
    const {companies} = defineProps<IProps>()

    const handleChange = (event: Event):void => {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
    emit('filterChange', value); 
    }
  </script>

  <style scoped>


  </style>