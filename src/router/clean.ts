import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
          middleware: "auth",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/main-layout/EmptyLayout.vue"),
    children: [
      // {
      //   path: "/sign-in",
      //   name: "sign-in",
      //   component: () =>
      //     import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      //   meta: {
      //     pageTitle: "Sign In",
      //   },
      // },
      // {
      //   path: "/sign-up",
      //   name: "sign-up",
      //   component: () =>
      //     import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      //   meta: {
      //     pageTitle: "Sign Up",
      //   },
      // },
      // {
      //   path: "/password-reset",
      //   name: "password-reset",
      //   component: () =>
      //     import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      //   meta: {
      //     pageTitle: "Password reset",
      //   },
      // },
      {
        path: "/main",
        name: "main",
        component: () => import("@/views/Main.vue"),
        meta: {
          pageTitle: "Главная",
          breadcrumbs: ["Главная"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth();

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next({ name: "/" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
