<script setup lang="ts">
import ShoppingCart from "@/presentation/componentes/ShoppingCart.vue";
import { CreateOrder, PaymentsOptions } from "../../protocols";
import { defineProps, PropType, onMounted, ref, inject } from "vue";
import FormCreateOrder from "@/presentation/componentes/FormCreateOrder.vue";

const { paymentsOptions, createOrder } = defineProps({
  paymentsOptions: Object as PropType<PaymentsOptions>,
  createOrder: Object as PropType<CreateOrder>,
});

const cartContext = inject("cart");
if (!cartContext) {
  throw new Error(
    "Carrinho não encontrado. Verifique se o provider foi configurado corretamente."
  );
}
const { totalPrice, cart } = cartContext as {
  totalPrice: number;
  cart: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    type?: string;
    image: string;
    description: string;
  }[];
};

const paymentsOptionsList = ref<PaymentsOptions.Model[] | undefined>([]);

const getPaymentsOptions = async () => {
  try {
    const response = await paymentsOptions?.getPaymentsOptions();
    if (!response || response.length === 0) {
      console.warn("Nenhuma bebida encontrada.");
    }

    paymentsOptionsList.value = response;
  } catch (error) {
    console.error("Erro ao buscar bebidas:", error);
  }
};

onMounted(async () => {
  getPaymentsOptions();
});
</script>

<template>
  <div class="w-full flex px-44 flex-col">
    <ShoppingCart :items-cart="cart" />
    <div class="flex justify-start items-start flex-col gap-2">
      <p>Total: R$ {{ totalPrice.toFixed(2) }}</p>
      <FormCreateOrder
        :items-cart="cart"
        :payments-options-list="paymentsOptionsList"
        :create-order="createOrder"
      />
    </div>
  </div>
</template>
