<script setup lang="ts">
import Appertizer from "@/presentation/pages/appetizer/Appetizer.vue";
import { MakeAppertize } from "../../usecases/AppertizerFactory";
</script>

<template>
  <Appertizer :appetizers="MakeAppertize()" />
</template>
