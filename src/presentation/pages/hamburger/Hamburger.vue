<script setup lang="ts">
import { defineProps, PropType, onMounted, ref } from "vue";
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

const { hamburgers } = defineProps({
  hamburgers: Object as PropType<Hamburgers>,
});

const plugin = Autoplay({
  delay: 2000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
});

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
</script>

<template>
  <div class="grid md:grid-cols-3 gap-4">
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
            :plugins="[plugin]"
            @mouseenter="plugin.stop"
            @mouseleave="
              [plugin.reset(), plugin.play(), console.log('Running')]
            "
          >
            <CarouselContent>
              <CarouselItem
                v-for="image in hamburger.image"
                :key="hamburger.id"
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
          <p
            class="text-lg text-primary font-semibold cursor-pointer"
            title="Lanche simples"
          >
            R$ {{ hamburger.values.single.toFixed(2) }}
          </p>
          <p
            class="text-lg text-primary font-semibold cursor-pointer"
            title="Combo"
          >
            R$ {{ hamburger.values.combo.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
