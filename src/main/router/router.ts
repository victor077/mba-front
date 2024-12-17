import { createRouter, createWebHistory } from "vue-router";

import HomeFactory from "../factories/pages/home/HomeFactory.vue";
import LoginFactory from "../factories/pages/login/LoginFactory.vue";
import CategoriesFactory from "../factories/pages/categories/CategoriesFactory.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeFactory,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginFactory,
  },
  {
    path: "/categories",
    name: "Categories",
    component: CategoriesFactory,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
