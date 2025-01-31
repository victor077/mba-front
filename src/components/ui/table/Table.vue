<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../scroll-area";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <ScrollArea class="relative w-full overflow-auto h-[480px]">
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </ScrollArea>
</template>
