import { ref, watchEffect } from "vue";

const token = ref<string | null>(localStorage.getItem("authToken"));

const teste = ref(false);

watchEffect(() => {
  token.value = localStorage.getItem("authToken");
});

export function useAuth() {
  return {
    token,
    teste,
  };
}
