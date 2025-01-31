<script setup lang="ts">
import { Appetizers } from "../../protocols";
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

const { appetizers } = defineProps({
  appetizers: Object as PropType<Appetizers>,
});

const { addToCart, cartCount } = inject("cart") as {
  addToCart: (item: any) => void;
  cartCount: number;
};

const appetizersList = ref<Appetizers.Model[] | undefined>([]);

const isOpen = ref<Record<string, boolean>>({});

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

const handleAddToCart = (value: Appetizers.Model, type: string) => {
  console.log({ value });
  if (type === "small") {
    return addToCart({
      id: value.id,
      title: value.title,
      price: value.values.small,
      image: value.image,
      description: value.description,
    });
  }
  return addToCart({
    id: value.id,
    title: value.title,
    price: value.values.large,
    image: value.image,
    description: value.description,
  });
};

const router = useRouter();
</script>

<template>
  <div class="grid grid-cols-3 gap-4 pl-56">
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
        <div class="flex items-center justify-between">
          <Dialog v-model:open="isOpen[appetizer.id + '-small']">
            <DialogTrigger as-child>
              <Button
                @click="
                  () => {
                    handleAddToCart(appetizer, 'small');
                    isOpen[appetizer.id + '-small'] = true;
                  }
                "
                class="text-lg text-primary font-semibold cursor-pointer bg-transparent hover:bg-transparent"
                title="Adicionar porção pequena"
              >
                R$ {{ appetizer?.values?.small?.toFixed(2) }}
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle class="flex gap-4 items-center font-bold"
                  ><CircleCheckIcon class="text-green-600" /> Adicionado ao
                  carrinho {{ appetizer.title }}</DialogTitle
                >
                <DialogDescription>
                  {{ appetizer.description }}
                </DialogDescription>
              </DialogHeader>
              <img :src="appetizer.image" :alt="appetizer.title" />
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

          <Dialog v-model:open="isOpen[appetizer.id + '-large']">
            <DialogTrigger as-child>
              <Button
                @click="
                  () => {
                    handleAddToCart(appetizer, 'large');
                    isOpen[appetizer.id + '-large'] = true;
                  }
                "
                class="text-lg text-primary font-semibold cursor-pointer bg-transparent hover:bg-transparent"
                title="Adicionar porção grande"
              >
                R$
                {{
                  appetizer?.values?.large?.toFixed(2) ??
                  appetizer?.values?.small?.toFixed(2)
                }}
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle class="flex gap-4 items-center font-bold"
                  ><CircleCheckIcon class="text-green-600" /> Adicionado ao
                  carrinho {{ appetizer.title }}</DialogTitle
                >
                <DialogDescription>
                  {{ appetizer.description }}
                </DialogDescription>
              </DialogHeader>
              <img :src="appetizer.image" :alt="appetizer.title" />
              <DialogFooter>
                <Button
                  @click="router.push('/cart')"
                  class="rounded-3xl h-12 w-full"
                  >Ver carrinho ({{ cartCount }})</Button
                ></DialogFooter
              >
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>
