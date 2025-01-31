<script setup lang="ts">
import ShoppingCartProvider from "@/context/ShoppingCartProvider.vue";
import Header from "@/presentation/componentes/header.vue";
import HeaderAuth from "@/presentation/componentes/HeaderAuth.vue";
import { useAuth } from "@/context/auth";

const { teste } = useAuth();
</script>

<template>
  <ShoppingCartProvider>
    <component :is="teste ? HeaderAuth : Header" />
    <router-view />
  </ShoppingCartProvider>
</template>
