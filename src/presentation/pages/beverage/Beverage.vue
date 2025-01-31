<script setup lang="ts">
import { Beverages } from "../../protocols";
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

const { beverages } = defineProps({
  beverages: Object as PropType<Beverages>,
});
const { addToCart, cartCount } = inject("cart") as {
  addToCart: (item: any) => void;
  cartCount: number;
};
const router = useRouter();
const categoryList = ref<Beverages.Model[] | undefined>([]);

console.log({ categoryList });

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
const isOpen = ref<Record<string, boolean>>({});

const handleAddToCart = (value: Beverages.Model, type: string) => {
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
</script>

<template>
  <div class="grid grid-cols-3 gap-4 pl-56">
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
        <Dialog v-model:open="isOpen[beverage.id + '-small']">
          <DialogTrigger as-child>
            <Button
              @click="
                () => {
                  handleAddToCart(beverage, 'small');
                  isOpen[beverage.id + '-small'] = true;
                }
              "
              class="text-lg text-primary font-semibold cursor-pointer bg-transparent hover:bg-transparent"
              title="Adicionar ao carrinho"
            >
              R$ {{ beverage.value.toFixed(2) }}
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle class="flex gap-4 items-center font-bold"
                ><CircleCheckIcon class="text-green-600" /> Adicionado ao
                carrinho {{ beverage.title }}</DialogTitle
              >
              <DialogDescription>
                {{ beverage.description }}
              </DialogDescription>
            </DialogHeader>
            <img
              :src="beverage.image"
              :alt="beverage.title"
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
