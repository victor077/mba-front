<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleImageError } from "@/lib/utils";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-vue-next";
import { inject, PropType } from "vue";

const { itemsCart } = defineProps({
  itemsCart: {
    type: Array as PropType<
      {
        id: number;
        title: string;
        price: number;
        quantity: number;
        type?: string;
        image: string;
        description: string;
      }[]
    >,
    required: true,
  },
});

const cartContext = inject("cart");
if (!cartContext) {
  throw new Error(
    "Carrinho não encontrado. Verifique se o provider foi configurado corretamente."
  );
}
const { removeFromCart, addToCart, decreaseItemFromCart } = cartContext as {
  removeFromCart: (id: number) => void;
  addToCart: (item: any) => void;
  decreaseItemFromCart: (id: number) => void;
};
</script>

<template>
  <div class="justify-center items-center mb-10">
    <Table>
      <TableCaption>Seu carrinho</TableCaption>
      <TableHeader>
        <TableRow class="text-lg font-normal">
          <TableHead class="w-[200px]"> Produto </TableHead>
          <TableHead class="text-center w-[200px]">Quantidade</TableHead>
          <TableHead class="w-[100px]">Valor</TableHead>
          <TableHead class="w-[100px]"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in itemsCart" :key="item.id">
          <TableCell class="font-medium">
            <div class="flex gap-4 items-start">
              <img
                :src="item.image"
                alt=""
                class="h-16 w-20"
                @error="handleImageError"
              />
              <div>
                <p>
                  {{ item.title }}
                </p>
                <p class="font-light text-gray-400 w-full">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div class="font-bold text-center flex justify-center items-center">
              <button
                class="hover:text-primary border border-1 p-1 rounded-tl-[8px] rounded-bl-[8px]"
                @click="decreaseItemFromCart(item.id)"
              >
                <MinusIcon class="h-5 w-5" />
              </button>
              <div class="border border-1 px-2 py-1">
                <p class="">{{ item.quantity }}</p>
              </div>
              <button
                class="hover:text-primary border border-1 p-1 rounded-tr-[8px] rounded-br-[8px]"
                @click="addToCart(item)"
              >
                <PlusIcon class="h-5 w-5" />
              </button>
            </div>
          </TableCell>
          <TableCell class="font-medium">
            R$ {{ (item.price * item.quantity).toFixed(2) }}</TableCell
          >
          <TableCell class="cursor-pointer">
            <button class="hover:text-red-500" @click="removeFromCart(item.id)">
              <Trash2Icon />
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
