<script setup lang="ts">
import Header from "@/presentation/componentes/header.vue";
import HeaderAuth from "@/presentation/componentes/HeaderAuth.vue";
import { computed, onMounted, ref } from "vue";

const token = ref<string | null>(null);
onMounted(() => {
  token.value = localStorage.getItem("authToken");
});

const isAuthenticated = computed(() => !!token.value);
</script>

<template>
  <component :is="isAuthenticated ? HeaderAuth : Header" />
  <router-view />
</template>
