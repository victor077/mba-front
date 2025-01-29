<script setup lang="ts">
import { Appetizers } from "../../protocols";
import { defineProps, PropType, onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { handleImageError } from "@/lib/utils";

const { appetizers } = defineProps({
  appetizers: Object as PropType<Appetizers>,
});

const appetizersList = ref<Appetizers.Model[] | undefined>([]);

const getAppetizers = async () => {
  try {
    console.log("Iniciando requisição...");
    const response = await appetizers?.getAppetizers();
    console.log("Resposta da API:", response);

    if (!response || response.length === 0) {
      console.warn("Nenhuma bebida encontrada.");
    }

    appetizersList.value = response;
  } catch (error) {
    console.error("Erro ao buscar bebidas:", error);
  }
};

onMounted(async () => {
  getAppetizers();
});
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="appetizer in appetizersList" :key="appetizer.id">
      <div
        class="p-4 bg-neutral-950 border rounded-2xl flex flex-col gap-4 h-[27rem] w-[27rem]"
      >
        <div>
          <h1 class="text-primary font-bold text-lg">{{ appetizer.title }}</h1>
          <h3 class="text-md text-slate-100 font-light">
            {{ appetizer.description }}
          </h3>
        </div>
        <img
          class="h-72 w-full object-cover rounded-2xl"
          :src="appetizer.image"
          :alt="appetizer.title"
          @error="handleImageError"
        />
        <p class="text-lg text-primary font-semibold">
          R$ {{ appetizer.values?.small?.toFixed(2) ?? 0 }} R$
          {{ appetizer.values?.large?.toFixed(2) ?? 0 }}
        </p>
      </div>
    </div>
  </div>
</template>
