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
    redirect: "/main",
    component: () => import("@/layouts/main-layout/EmptyLayout.vue"),
    children: [
      {
        path: "/",
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
    path: "/p2pnew",
    component: () => import("@/layouts/exchange-layout/ExchangeLayout.vue"),
    children: [
      {
        path: "/p2pnew",
        name: "p2pnew",
        component: () => import("@/views/P2P/P2P.vue"),
        meta: {
          pageTitle: "P2P",
          breadcrumbs: ["P2P"],
        },
      },
    ],
  },
  {
    path: "/exchange",
    component: () => import("@/layouts/exchange-layout/ExchangeLayout.vue"),
    children: [
      {
        path: "/exchange",
        name: "exchange",
        component: () => import("@/views/Exchange.vue"),
        meta: {
          pageTitle: "Биржа",
          breadcrumbs: ["Биржа"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Дашбоард",
          breadcrumbs: ["Дашбоард"],
          middleware: "auth",
        },
      },
      {
        path: "/p2p",
        name: "p2p",
        component: () => import("@/views/P2P.vue"),
        meta: {
          pageTitle: "Мой P2P",
          breadcrumbs: ["Мой P2P"],
          middleware: "auth",
        },
      },
      {
        path: "/history",
        name: "history",
        component: () => import("@/views/History.vue"),

        meta: {
          pageTitle: "История",
          breadcrumbs: ["История"],
          middleware: "auth",
        },
      },
      {
        path: "/deals",
        name: "deals",
        component: () => import("@/views/Deals.vue"),
        meta: {
          pageTitle: "Биржевые сделки",
          breadcrumbs: ["Биржевые сделки"],
          middleware: "auth",
        },
      },
      {
        path: "/wallet",
        redirect: "/wallet/assets",
      },
      {
        path: "/wallet/assets",
        name: "assets",
        component: () => import("@/views/Assets.vue"),
        meta: {
          pageTitle: "Активы",
          breadcrumbs: ["Активы"],
          middleware: "auth",
        },
      },
      {
        path: "/wallet/deposit",
        name: "deposit",
        component: () => import("@/views/Deposit.vue"),
        meta: {
          pageTitle: "Пополнение",
          breadcrumbs: ["Пополнение"],
          middleware: "auth",
        },
      },
      {
        path: "/wallet/withdraw",
        name: "withdraw",
        component: () => import("@/views/Withdraw.vue"),
        meta: {
          pageTitle: "Вывод",
          breadcrumbs: ["Вывод"],
          middleware: "auth",
        },
      },
      {
        path: "/wallet/withdraw/address",
        name: "withdrawAddress",
        component: () => import("@/components/withdraw/withdrawAddress/WithdrawAddress.vue"),
        meta: {
          pageTitle: "Сохраненные адреса",
          breadcrumbs: ["Сохраненные адреса"],
          middleware: "auth",
        },
      },
      {
        path: "/aml",
        name: "aml",
        component: () => import("@/views/Aml.vue"),
        meta: {
          pageTitle: "AML сервис",
          breadcrumbs: ["AML сервис"],
          middleware: "auth",
        },
      },
      {
        path: "/referral",
        name: "referral",
        component: () => import("@/views/Referral.vue"),
        meta: {
          pageTitle: "Реферальная программа",
          breadcrumbs: ["Реферальная программа"],
          middleware: "auth",
        },
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@/views/Settings.vue"),
        meta: {
          pageTitle: "Настройки",
          breadcrumbs: ["Настройки"],
          middleware: "auth",
        },
      },
      {
        path: "/settings/verify",
        name: "verify",
        component: () => import("@/views/Verify.vue"),
        meta: {
          pageTitle: "Верификация",
          breadcrumbs: ["Верификация"],
          middleware: "auth",
        },
      },
      {
        path: "/seller",
        name: "seller",
        component: () => import("@/views/SellerProfile.vue"),
        meta: {
          pageTitle: "Профиль продавца",
          breadcrumbs: ["Профиль продавца"],
          middleware: "auth",
        },
      },
      {
        path: "/crafted/pages/profile",
        name: "profile",
        component: () => import("@/components/page-layouts/Profile.vue"),
        meta: {
          breadcrumbs: ["Pages", "Profile"],
          middleware: "auth",
        },
        children: [
          {
            path: "overview",
            name: "profile-overview",
            component: () =>
              import("@/views/crafted/pages/profile/Overview.vue"),
            meta: {
              pageTitle: "Overview",
            },
          },
          {
            path: "projects",
            name: "profile-projects",
            component: () =>
              import("@/views/crafted/pages/profile/Projects.vue"),
            meta: {
              pageTitle: "Projects",
            },
          },
          {
            path: "campaigns",
            name: "profile-campaigns",
            component: () =>
              import("@/views/crafted/pages/profile/Campaigns.vue"),
            meta: {
              pageTitle: "Campaigns",
            },
          },
          {
            path: "documents",
            name: "profile-documents",
            component: () =>
              import("@/views/crafted/pages/profile/Documents.vue"),
            meta: {
              pageTitle: "Documents",
            },
          },
          {
            path: "connections",
            name: "profile-connections",
            component: () =>
              import("@/views/crafted/pages/profile/Connections.vue"),
            meta: {
              pageTitle: "Connections",
            },
          },
          {
            path: "activity",
            name: "profile-activity",
            component: () =>
              import("@/views/crafted/pages/profile/Activity.vue"),
            meta: {
              pageTitle: "Activity",
            },
          },
        ],
      },
      {
        path: "/crafted/pages/wizards/horizontal",
        name: "horizontal-wizard",
        component: () => import("@/views/crafted/pages/wizards/Horizontal.vue"),
        meta: {
          pageTitle: "Horizontal",
          breadcrumbs: ["Pages", "Wizard"],
        },
      },
      {
        path: "/crafted/pages/wizards/vertical",
        name: "vertical-wizard",
        component: () => import("@/views/crafted/pages/wizards/Vertical.vue"),
        meta: {
          pageTitle: "Vertical",
          breadcrumbs: ["Pages", "Wizard"],
        },
      },
      {
        path: "/crafted/account",
        name: "account",
        component: () => import("@/views/crafted/account/Account.vue"),
        meta: {
          breadcrumbs: ["Crafted", "Account"],
        },
        children: [
          {
            path: "overview",
            name: "account-overview",
            component: () => import("@/views/crafted/account/Overview.vue"),
            meta: {
              pageTitle: "Overview",
            },
          },
          {
            path: "settings",
            name: "account-settings",
            component: () => import("@/views/crafted/account/Settings.vue"),
            meta: {
              pageTitle: "Settings",
            },
          },
        ],
      },
      {
        path: "/crafted/modals/general/invite-friends",
        name: "modals-general-invite-friends",
        component: () =>
          import("@/views/crafted/modals/general/InviteFriends.vue"),
        meta: {
          pageTitle: "Invite Friends",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/view-user",
        name: "modals-general-view-user",
        component: () => import("@/views/crafted/modals/general/ViewUsers.vue"),
        meta: {
          pageTitle: "View User",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/upgrade-plan",
        name: "modals-general-upgrade-plan",
        component: () =>
          import("@/views/crafted/modals/general/UpgradePlan.vue"),
        meta: {
          pageTitle: "Upgrade Plan",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/general/share-and-earn",
        name: "modals-general-share-and-earn",
        component: () =>
          import("@/views/crafted/modals/general/ShareAndEarn.vue"),
        meta: {
          pageTitle: "Share And Earn",
          breadcrumbs: ["Crafted", "Modals", "General"],
        },
      },
      {
        path: "/crafted/modals/forms/new-target",
        name: "modals-forms-new-target",
        component: () => import("@/views/crafted/modals/forms/NewTarget.vue"),
        meta: {
          pageTitle: "New Target",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/new-card",
        name: "modals-forms-new-card",
        component: () => import("@/views/crafted/modals/forms/NewCard.vue"),
        meta: {
          pageTitle: "New Card",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/new-address",
        name: "modals-forms-new-address",
        component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
        meta: {
          pageTitle: "New Address",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/forms/create-api-key",
        name: "modals-forms-create-api-key",
        component: () =>
          import("@/views/crafted/modals/forms/CreateApiKey.vue"),
        meta: {
          pageTitle: "Create Api Key",
          breadcrumbs: ["Crafted", "Modals", "Forms"],
        },
      },
      {
        path: "/crafted/modals/wizards/two-factor-auth",
        name: "modals-wizards-two-factor-auth",
        component: () =>
          import("@/views/crafted/modals/wizards/TwoFactorAuth.vue"),
        meta: {
          pageTitle: "Two Factory Auth",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/modals/wizards/create-app",
        name: "modals-wizards-create-app",
        component: () => import("@/views/crafted/modals/wizards/CreateApp.vue"),
        meta: {
          pageTitle: "Create App",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/modals/wizards/create-account",
        name: "modals-wizards-create-account",
        component: () =>
          import("@/views/crafted/modals/wizards/CreateAccount.vue"),
        meta: {
          pageTitle: "Create Account",
          breadcrumbs: ["Crafted", "Modals", "Wizards"],
        },
      },
      {
        path: "/crafted/widgets/lists",
        name: "widgets-list",
        component: () => import("@/views/crafted/widgets/Lists.vue"),
        meta: {
          pageTitle: "Lists",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/statistics",
        name: "widgets-statistics",
        component: () => import("@/views/crafted/widgets/Statistics.vue"),
        meta: {
          pageTitle: "Statistics",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/charts",
        name: "widgets-charts",
        component: () => import("@/views/crafted/widgets/Charts.vue"),
        meta: {
          pageTitle: "Charts",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/mixed",
        name: "widgets-mixed",
        component: () => import("@/views/crafted/widgets/Mixed.vue"),
        meta: {
          pageTitle: "Mixed",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/tables",
        name: "widgets-tables",
        component: () => import("@/views/crafted/widgets/Tables.vue"),
        meta: {
          pageTitle: "Tables",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
      {
        path: "/crafted/widgets/feeds",
        name: "widgets-feeds",
        component: () => import("@/views/crafted/widgets/Feeds.vue"),
        meta: {
          pageTitle: "Feeds",
          breadcrumbs: ["Crafted", "Widgets"],
        },
      },
    ],
  },
  // {
  //   path: "/",
  //   component: () => import("@/layouts/AuthLayout.vue"),
  //   children: [
  //     {
  //       path: "/sign-in",
  //       name: "sign-in",
  //       component: () =>
  //         import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
  //       meta: {
  //         pageTitle: "Sign In",
  //       },
  //     },
  //     {
  //       path: "/sign-up",
  //       name: "sign-up",
  //       component: () =>
  //         import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
  //       meta: {
  //         pageTitle: "Sign Up",
  //       },
  //     },
  //     {
  //       path: "/password-reset",
  //       name: "password-reset",
  //       component: () =>
  //         import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
  //       meta: {
  //         pageTitle: "Password reset",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () =>
      import("@/views/crafted/authentication/MultiStepSignUp.vue"),
    meta: {
      pageTitle: "Multi-step Sign up",
    },
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
