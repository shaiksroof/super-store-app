const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "product/:id",
        name: "product",
        component: () => import("pages/ProductPage.vue"),
      },
      {
        path: "category/:category",
        name: "category",
        component: () => import("pages/CategoryPage.vue"),
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("pages/CartPage.vue"),
      },
      {
        path: "checkout",
        name: "checkout",
        component: () => import("pages/CheckoutPage.vue"),
      },
      {
        path: "manageproduct",
        name: "manageproduct",
        component: () => import("pages/ManageProduct.vue"),
      },
      {
        path: "managediscount",
        name: "managediscount",
        component: () => import("pages/ManageDiscount.vue"),
      },

      {
        path: "managecategory",
        name: "managecategory",
        component: () => import("pages/ManageCategory.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("layouts/LoginLayout.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
