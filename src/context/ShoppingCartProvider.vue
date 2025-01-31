<script setup lang="ts">
import { provide, ref, computed, onMounted } from "vue";

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const cart = ref<
  {
    id: number;
    title: string;
    price: number;
    quantity: number;
    type?: string;
    image: string;
    description: string;
  }[]
>(loadCartFromStorage());

const cartCount = computed(() =>
  cart.value.reduce((total, item) => total + item.quantity, 0)
);

const addToCart = (item: {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}) => {
  const existingItem = cart.value.find(
    (i) => i.id === item.id && i.title === item.title
  );
  if (existingItem) {
    existingItem.quantity++;
    localStorage.setItem("cart", JSON.stringify(cart.value));
  } else {
    cart.value.push({ ...item, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
};

const removeFromCart = (id: number) => {
  cart.value = cart.value.filter((item) => item.id !== id);
};

const decreaseItemFromCart = (id: number) => {
  const item = cart.value.find((item) => item.id === id);
  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cart.value = cart.value.filter((item) => item.id !== id);
    }
  }
};

const clearCart = () => {
  cart.value = [];
  localStorage.removeItem("cart");
};

const totalPrice = computed(() => {
  return cart.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

onMounted(() => {
  cart.value = loadCartFromStorage();
});

provide("cart", {
  cart,
  cartCount,
  addToCart,
  removeFromCart,
  clearCart,
  decreaseItemFromCart,
  totalPrice,
});
</script>

<template>
  <slot />
</template>
