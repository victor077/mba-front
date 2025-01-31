<script setup lang="ts">
import PaymentsOptions from "@/presentation/pages/paymentsOptions/PaymentsOptions.vue";
import { MakePaymentsOptions } from "../../usecases/PaymentsOptionsFactory";
import { MakeCreateOrder } from "../../usecases/CreateOrderFactory";
</script>

<template>
  <PaymentsOptions
    :paymentsOptions="MakePaymentsOptions()"
    :createOrder="MakeCreateOrder()"
  />
</template>
