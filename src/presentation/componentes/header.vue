<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";
import logo from "../../assets/images/burger.png";

const router = useRouter();
const token = ref<string | null>(null);

onMounted(() => {
  token.value = localStorage.getItem("authToken");
});

const navigateToLogin = () => {
  router.push("/");
};
</script>

<template>
  <header class="p-2 mb-8">
    <nav class="flex justify-between items-center">
      <div @click="router.push('/')" class="cursor-pointer">
        <img :src="logo" alt="Logo" class="h-24 w-40" />
      </div>
      <div>
        <Button
          class="p-6 border rounded-2xl w-28 font-semibold"
          @click="navigateToLogin"
        >
          Login
        </Button>
      </div>
    </nav>
  </header>
</template>
