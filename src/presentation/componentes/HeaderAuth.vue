<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";
import logo from "../../assets/images/burger.png";
import { ShoppingCartIcon } from "lucide-vue-next";

const categories = ["hamburgers", "appetizers", "desserts", "beverages"];

const activeItem = ref<string>("");
const router = useRouter();
const token = ref<string | null>(null);

onMounted(() => {
  token.value = localStorage.getItem("authToken");
});

const setActiveItem = (item: string) => {
  activeItem.value = item;
};

const logout = () => {
  localStorage.removeItem("authToken");
  token.value = null;
  window.location.reload();
  router.push("/");
};
</script>

<template>
  <header class="p-2 mb-8">
    <nav class="flex justify-between items-center">
      <div @click="router.push('/hamburgers')" class="cursor-pointer">
        <img :src="logo" alt="Logo" class="h-24 w-40" />
      </div>
      <ul class="flex items-center gap-6">
        <li v-for="item in categories" :key="item">
          <RouterLink
            :to="item"
            @click="setActiveItem(item)"
            :class="[
              'hover:text-primary cursor-pointer',
              activeItem === item ? 'text-primary underline' : '',
            ]"
          >
            {{ item }}
          </RouterLink>
        </li>
      </ul>
      <div class="flex items-center justify-center gap-8">
        <button class="hover:text-primary">
          <ShoppingCartIcon class="h-9 w-9" />
        </button>
        <Button
          class="p-6 border rounded-2xl w-28 font-semibold"
          @click="logout"
        >
          Logout
        </Button>
      </div>
    </nav>
  </header>
</template>
