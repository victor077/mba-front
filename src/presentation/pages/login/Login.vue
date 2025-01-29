<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import { Authentication, Validation } from "../../protocols";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "vue-router";

const { authentication, currentAccount, validation } = defineProps({
  authentication: Object as PropType<Authentication>,
  validation: Object as PropType<Validation>,
  currentAccount: Object as PropType<any>,
});

const email = ref<string>("");
const password = ref<string>("");
const fieldErrror = ref<string>("");
const valid = ref<boolean>(true);
const router = useRouter();

const changeValue = (event: Event) => {
  const { name, value } = event.target as HTMLInputElement;
  if (validation) {
    fieldErrror.value = validation.validate(name, value);
    valid.value = Boolean(validation.validate(name, value));
  } else {
    console.warn("Validation function is undefined");
    fieldErrror.value = "";
    valid.value = true;
  }
};

const login = async () => {
  if (!authentication) {
    console.warn("Authentication service is undefined");
    return;
  }
  const params = {
    login: email.value,
    password: password.value,
  };

  console.log({ params });
  try {
    const response = await authentication.auth(params);
    currentAccount.set(response);
    localStorage.setItem("authToken", response.token);
    router.push("/hamburgers");
  } catch (error) {
    console.error(error);
  } finally {
    console.log("finally");
  }
};
</script>
<template>
  <div class="h-screen flex justify-center items-center">
    <Card class="w-full max-w-lg rounded-2xl border">
      <form @submit.prevent="login">
        <CardHeader>
          <CardTitle class="text-2xl"> Login </CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email" class="text-lg">Email</Label>
            <Input
              type="text"
              id="email"
              name="email"
              v-model="email"
              @input="changeValue"
              placeholder="Username"
              required
              class="rounded-2xl border h-14"
            />
            <span>{{ fieldErrror }}</span>
          </div>
          <div class="grid gap-2">
            <Label for="password" class="text-lg">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              v-model="password"
              @input="changeValue"
              placeholder="Password"
              required
              class="rounded-2xl border h-14"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            :disabled="valid"
            class="w-full rounded-2xl border h-14 font-semibold text-lg"
          >
            Sign in
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>
