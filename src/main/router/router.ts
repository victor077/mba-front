import { createRouter, createWebHistory } from "vue-router";

import HomeFactory from "../factories/pages/home/HomeFactory.vue";
import LoginFactory from "../factories/pages/login/LoginFactory.vue";
import CategoriesFactory from "../factories/pages/categories/CategoriesFactory.vue";
import BeverageFactory from "../factories/pages/beverage/BeverageFactory.vue";
import HamburgerFactory from "../factories/pages/hamburger/HamburgerFactory.vue";
import AppertizeFactory from "../factories/pages/appertize/AppertizeFactory.vue";
import DessertFactory from "../factories/pages/dessert/DessertFactory.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: HomeFactory,
  // },
  {
    path: "/",
    name: "Login",
    component: LoginFactory,
  },
  {
    path: "/categories",
    name: "Categories",
    component: CategoriesFactory,
  },
  {
    path: "/beverages",
    name: "Beverages",
    component: BeverageFactory,
  },

  {
    path: "/hamburgers",
    name: "Hamburgers",
    component: HamburgerFactory,
  },
  {
    path: "/appetizers",
    name: "Appetizers",
    component: AppertizeFactory,
  },
  {
    path: "/desserts",
    name: "Desserts",
    component: DessertFactory,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
