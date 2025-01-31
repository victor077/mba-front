<script setup lang="ts">
import { Desserts } from "../../protocols";
import { defineProps, PropType, onMounted, ref, inject } from "vue";
import { Button } from "@/components/ui/button";
import { handleImageError } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "vue-router";

const { desserts } = defineProps({
  desserts: Object as PropType<Desserts>,
});
const { addToCart, cartCount } = inject("cart") as {
  addToCart: (item: any) => void;
  cartCount: number;
};
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
const isOpen = ref<Record<string, boolean>>({});

onMounted(async () => {
  getDesserts();
});

const handleAddToCart = (value: Desserts.Model, type: string) => {
  console.log({ value });
  if (type === "small") {
    return addToCart({
      id: value.id,
      title: value.title,
      price: value.value,
      image: value.image,
      description: value.description,
    });
  }
  return addToCart({
    id: value.id,
    title: value.title,
    price: value.value,
    image: value.image,
    description: value.description,
  });
};
const router = useRouter();
</script>

<template>
  <div class="grid grid-cols-3 gap-4 pl-56">
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
        <Dialog v-model:open="isOpen[dessert.id + '-small']">
          <DialogTrigger as-child>
            <Button
              @click="
                () => {
                  handleAddToCart(dessert, 'small');
                  isOpen[dessert.id + '-small'] = true;
                }
              "
              class="text-lg text-primary font-semibold cursor-pointer bg-transparent hover:bg-transparent"
              title="Adicionar ao carrinho"
            >
              R$ {{ dessert?.value.toFixed(2) }}
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle class="flex gap-4 items-center font-bold"
                ><CircleCheckIcon class="text-green-600" /> Adicionado ao
                carrinho {{ dessert.title }}</DialogTitle
              >
              <DialogDescription>
                {{ dessert.description }}
              </DialogDescription>
            </DialogHeader>
            <img
              :src="dessert.image"
              :alt="dessert.title"
              @error="handleImageError"
            />
            <DialogFooter>
              <Button
                @click="router.push('/cart')"
                class="rounded-3xl h-12 w-full"
              >
                Ver carrinho ({{ cartCount }})</Button
              ></DialogFooter
            >
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </div>
</template>
