<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { inject, PropType, ref } from "vue";
import { CreateOrder } from "../protocols";

const { paymentsOptionsList, itemsCart, createOrder } = defineProps({
  paymentsOptionsList: {
    type: Array as PropType<
      | {
          id: string;
          value: number;
          text: string;
        }[]
      | undefined
    >,
    required: true,
  },
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
  createOrder: Object as PropType<CreateOrder>,
});

const cartContext = inject("cart");
if (!cartContext) {
  throw new Error(
    "Carrinho não encontrado. Verifique se o provider foi configurado corretamente."
  );
}
const { clearCart } = cartContext as {
  clearCart: () => void;
};

const open = ref(false);
const value = ref("");
const paymentError = ref(false);
const optionSelect = ref("");
const cartError = ref(false);

const submitCreateOrder = async () => {
  if (!optionSelect.value) {
    console.error("Nenhuma forma de pagamento selecionada.");
    paymentError.value = true;
    return;
  }
  if (itemsCart.length === 0) {
    console.error("O carrinho está vazio.");
    cartError.value = true;
    return;
  }

  const desctructeCartItems = itemsCart.map((item) => {
    return {
      title: item.title,
      value: item.price,
    };
  });

  try {
    const response = await createOrder?.createOrder({
      items: desctructeCartItems,
      paymentOption: optionSelect.value,
    });

    console.log({ response });
  } catch (error) {
    console.error(error);
  } finally {
    clearCart();
  }
};
</script>

<template>
  <form @submit.prevent="submitCreateOrder" class="flex gap-4">
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-52 justify-between rounded-2xl border"
          :class="{ 'border-red-500': paymentError }"
        >
          {{
            value
              ? paymentsOptionsList?.find((opt) => opt.id === value)?.text
              : "Forma de pagamento"
          }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="option in paymentsOptionsList"
                :key="option.id"
                :value="option.id"
                @select="
                  () => {
                    value = option.id;
                    optionSelect = option.text; // Atualize optionSelect com o texto da opção
                    paymentError = false;
                    open = false;
                    console.log('Opção selecionada:', optionSelect);
                  }
                "
              >
                {{ option.text }}
                <Check
                  :class="
                    cn(
                      'ml-auto h-4 w-4',
                      value === option.id ? 'opacity-100 ' : 'opacity-0'
                    )
                  "
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <Button class="rounded-2xl border px-8 font-semibold">Pagar</Button>
  </form>
  <p v-if="cartError" class="text-red-500 text-sm">
    O carrinho está vazio. Adicione itens antes de prosseguir.
  </p>
  <p v-if="paymentError" class="text-red-500 text-sm">
    Selecione uma forma de pagamento!
  </p>
</template>
