<script setup lang="ts">
import { Desserts } from "../../protocols";
import { defineProps, PropType, onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { handleImageError } from "@/lib/utils";

const { desserts } = defineProps({
  desserts: Object as PropType<Desserts>,
});

const dessertsList = ref<Desserts.Model[] | undefined>([]);

const getDesserts = async () => {
  try {
    console.log("Iniciando requisição...");
    const response = await desserts?.getDesserts();
    console.log("Resposta da API:", response);

    if (!response || response.length === 0) {
      console.warn("Nenhuma bebida encontrada.");
    }

    dessertsList.value = response;
  } catch (error) {
    console.error("Erro ao buscar bebidas:", error);
  }
};

onMounted(async () => {
  getDesserts();
});
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="dessert in dessertsList" :key="dessert.id">
      <div
        class="p-4 bg-neutral-950 border rounded-2xl flex flex-col gap-4 h-auto w-[27rem] justify-between"
      >
        <h1 class="text-primary font-bold text-lg">{{ dessert.title }}</h1>
        <h3 class="text-md text-slate-100 font-light w-full h-10">
          {{ dessert.description }}
        </h3>
        <img
          class="w-full object-cover rounded-2xl mt-8 mb-6"
          :src="dessert?.image"
          :alt="dessert.title"
          @error="handleImageError"
        />
        <p class="text-lg text-primary font-semibold">
          R$ {{ dessert.value.toFixed(2) ?? 0 }}
        </p>
      </div>
    </div>
  </div>
</template>
