<script setup lang="ts">
import Beverage from "@/presentation/pages/beverage/Beverage.vue";
import { MakeBeverage } from "../../usecases/BeverageFactory";
</script>

<template>
  <Beverage :beverages="MakeBeverage()" />
</template>
