// const baseUrl = "https://burgerlivery-api.vercel.app";
const baseUrl = "http://localhost:8000";

export const apiRoutes = {
  login: `${baseUrl}/user/login`,
  orders: `${baseUrl}/orders`,
  categories: `${baseUrl}/categories`,
  beverages: `${baseUrl}/beverages`,
  hamburgers: `${baseUrl}/hamburgers`,
  appetizers: `${baseUrl}/appetizers`,
  desserts: `${baseUrl}/desserts`,
  options: `${baseUrl}/payment/options`,
  createOrder: `${baseUrl}/order/create-order`,
};

console.log("routes", apiRoutes);
