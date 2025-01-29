<script setup lang="ts">
import Hamburger from "@/presentation/pages/hamburger/Hamburger.vue";
import { MakeHamburger } from "../../usecases/HamburgersFactory";
</script>

<template>
  <Hamburger :hamburgers="MakeHamburger()" />
</template>
