<script setup lang="ts">
import { Categories } from "../../protocols";
import { defineProps, PropType, onMounted, ref } from "vue";

const { categories } = defineProps({
  categories: Object as PropType<Categories>,
});

const categoryList = ref<Categories.Model[] | undefined>([]);

const getListCategories = async () => {
  try {
    const response = await categories?.getCategories();
    categoryList.value = response;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getListCategories();
});
</script>

<template></template>
