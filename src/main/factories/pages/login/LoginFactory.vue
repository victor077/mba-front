<script setup lang="ts">
import { MakeAuthentication } from "../../usecases/AuthenticationFactory";
import Login from "../../../../presentation/pages/login/Login.vue"
</script>
<template>
    <Login :authentication="MakeAuthentication()"/>
</template>
