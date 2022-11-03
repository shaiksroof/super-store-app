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
        path: "addproduct",
        name: "addproduct",
        component: () => import("pages/AddProduct.vue"),
      },

      {
        path: "addcategory",
        name: "addcategory",
        component: () => import("pages/AddCategory.vue"),
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
