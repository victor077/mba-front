<script setup lang="ts">
import { defineProps, PropType, onMounted, ref, inject } from "vue";
import { Button } from "@/components/ui/button";
import { Hamburgers } from "../../protocols";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
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
import { CircleCheckIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { EmblaCarouselVueType } from "embla-carousel-vue";

const { hamburgers } = defineProps({
  hamburgers: Object as PropType<Hamburgers>,
});

const cart = inject("cart") as {
  addToCart: (item: any) => void;
  cartCount: number;
  cart: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    type?: string | undefined;
    image: string;
  }[];
};
const router = useRouter();

const createAutoplayPlugin = () => {
  return Autoplay({
    delay: 2000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  });
};

const hamburgerList = ref<Hamburgers.Model[] | undefined>([]);

const getHamburgers = async () => {
  try {
    console.log("Iniciando requisição...");
    const response = await hamburgers?.getHamburgers();
    console.log("Resposta da API:", response);

    if (!response || response.length === 0) {
      console.warn("Nenhuma hamburger encontrada.");
    }

    hamburgerList.value = response;
  } catch (error) {
    console.error("Erro ao buscar hamburges:", error);
  }
};

onMounted(async () => {
  getHamburgers();
});

const isOpen = ref<Record<string, boolean>>({});

const addToCart = (hamburger: Hamburgers.Model, type: string) => {
  if (type === "single") {
    return cart.addToCart({
      id: hamburger.id,
      title: hamburger.title,
      price: hamburger.values.single,
      image: hamburger.image[0],
      description: hamburger.description,
    });
  }
  return cart.addToCart({
    id: hamburger.id,
    title: hamburger.title,
    price: hamburger.values.single,
    image: hamburger.image[1],
    description: hamburger.description,
  });
};
</script>

<template>
  <div class="grid md:grid-cols-3 gap-4 pl-56">
    <div v-for="hamburger in hamburgerList" :key="hamburger.id">
      <div
        class="p-6 bg-neutral-950 border rounded-2xl flex flex-col gap-4 h-auto w-[27rem]"
      >
        <div>
          <h1 class="text-primary font-bold text-lg">{{ hamburger.title }}</h1>
          <h3 class="text-md text-slate-100 font-light">
            {{ hamburger.description }}
          </h3>
        </div>
        <div class="flex justify-center items-center">
          <Carousel
            class="relative w-full max-w-xs"
            :plugins="[createAutoplayPlugin()]"
            @mouseenter="(e: any) => e.target.stop()"
            @mouseleave="(e: any) => e.target.play()"
          >
            <CarouselContent>
              <CarouselItem
                v-for="(image, index) in hamburger.image"
                :key="`${hamburger.id}-${index}`"
              >
                <div>
                  <Card>
                    <CardContent class="p-0">
                      <img
                        class="h-40 w-full object-cover rounded-2xl"
                        :src="image"
                        :alt="image"
                        @error="handleImageError"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div class="flex items-center justify-between">
          <Dialog v-model:open="isOpen[hamburger.id + '-single']">
            <DialogTrigger as-child>
              <Button
                @click="addToCart(hamburger, 'single')"
                variant="ghost"
                class="text-lg text-primary font-semibold cursor-pointer"
                title="Adicionar Lanche simples"
              >
                R$ {{ hamburger.values.single.toFixed(2) }}
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle class="flex gap-4 items-center font-bold"
                  ><CircleCheckIcon class="text-green-600" /> Adicionado ao
                  carrinho {{ hamburger.title }}</DialogTitle
                >
                <DialogDescription>
                  {{ hamburger.description }}
                </DialogDescription>
              </DialogHeader>
              <img :src="hamburger.image[0]" alt="" @error="handleImageError" />
              <DialogFooter>
                <Button
                  @click="router.push('/cart')"
                  class="rounded-3xl h-12 w-full"
                >
                  Ver carrinho ({{ cart.cartCount }})</Button
                ></DialogFooter
              >
            </DialogContent>
          </Dialog>
          <Dialog v-model:open="isOpen[hamburger.id + '-combo']">
            <DialogTrigger as-child>
              <Button
                @click="addToCart(hamburger, 'combo')"
                class="text-lg text-primary font-semibold cursor-pointer bg-transparent hover:bg-transparent"
                title="Adicionar combo"
              >
                R$ {{ hamburger.values.combo.toFixed(2) }}
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle class="flex gap-4 items-center font-bold"
                  ><CircleCheckIcon class="text-green-600" /> Adicionado ao
                  carrinho {{ hamburger.title }}</DialogTitle
                >
                <DialogDescription>
                  {{ hamburger.description }}
                </DialogDescription>
              </DialogHeader>
              <img :src="hamburger.image[1]" alt="" @error="handleImageError" />
              <DialogFooter>
                <Button
                  @click="router.push('/cart')"
                  class="rounded-3xl h-12 w-full"
                  >Ver carrinho ({{ cart.cartCount }})</Button
                ></DialogFooter
              >
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>
