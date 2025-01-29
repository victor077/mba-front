<script setup lang="ts">
import Desserts from "@/presentation/pages/desserts/Desserts.vue";
import { MakeDesserts } from "../../usecases/DessertsFactory";
</script>

<template>
  <Desserts :desserts="MakeDesserts()" />
</template>
