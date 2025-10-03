<template>
    <div class="search-container">
      <input type="text" placeholder="Поиск по имени или email... " :value="modelValue" @input="handleInput"/>
    </div>
  </template>

  <script lang="ts" setup>
    const props = defineProps<{modelValue: string}>()
    const emit = defineEmits<{'update:modelValue': [value: string]}>()

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
  }
  </script>

  <style scoped>
.search-container {
    display: flex;
    gap: 5px;
    height: 20px;
}
input {
  min-width: 200px;
}

  </style>