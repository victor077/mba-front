<script setup lang="ts">
import Categories from "@/presentation/pages/categories/Categories.vue";
import { MakeCategories } from "../../usecases/CategoriesFactory";
</script>

<template>
  <Categories :categories="MakeCategories()" />
</template>
