<script>
  import { Button } from '@/components/ui/button'

import {  Categories  } from "../../protocols"

const { categories } = defineProps({
    categories: Object as PropType<Categories>
  })

try {
      const response = await categories.
      currentAccount.set(response)
    } catch (error) {
      console.error(error)
    } finally {
      console.log('finally')
    }

  export default {
  components: {
    Button
  }
};
</script>

<template>
  <div>
    <h1>Categorias</h1>
    <Button>TESTE</Button>
  </div>
</template>
