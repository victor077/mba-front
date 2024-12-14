import { createRouter, createWebHistory } from "vue-router";

import Home from "../factories/pages/home/HomeFactory.vue";
import Login from "../factories/pages/login/LoginFactory.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
