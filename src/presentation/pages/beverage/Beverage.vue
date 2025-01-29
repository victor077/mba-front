<script setup lang="ts">
import { Beverages } from "../../protocols";
import { defineProps, PropType, onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { handleImageError } from "@/lib/utils";

const { beverages } = defineProps({
  beverages: Object as PropType<Beverages>,
});

const categoryList = ref<Beverages.Model[] | undefined>([]);

const getBeverages = async () => {
  try {
    console.log("Iniciando requisição...");
    const response = await beverages?.getBeverages();
    console.log("Resposta da API:", response);

    if (!response || response.length === 0) {
      console.warn("Nenhuma bebida encontrada.");
    }

    categoryList.value = response;
  } catch (error) {
    console.error("Erro ao buscar bebidas:", error);
  }
};

onMounted(async () => {
  getBeverages();
});
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="beverage in categoryList" :key="beverage.id">
      <div
        class="p-4 bg-neutral-950 border rounded-2xl flex flex-col gap-4 h-auto w-[27rem]"
      >
        <div>
          <h1 class="text-primary font-bold text-lg">{{ beverage.title }}</h1>
          <h3 class="text-md text-slate-100 font-light">
            {{ beverage.description }}
          </h3>
        </div>
        <img
          class="h-72 w-full object-cover rounded-2xl"
          :src="beverage.image"
          :alt="beverage.title"
          @error="handleImageError"
        />
        <p class="text-lg text-primary font-semibold">
          R$ {{ beverage.value.toFixed(2) }}
        </p>
      </div>
    </div>
  </div>
</template>
