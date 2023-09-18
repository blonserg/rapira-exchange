export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  to?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
  languages?: Array<MenuItem>;
  name?: string;
  svg?: string;
  span?: string;
}

const MainMenuConfig: Array<MenuItem> = [
{
  pages: [
    {
      heading: "mainMenu.main",
      route: "/dashboard",
      keenthemesIcon: "ki-element-11",
      bootstrapIcon: "bi-app-indicator",
    },
    {
      sectionTitle: "mainMenu.wallet",
      route: "/wallet",
      to: "/wallet/assets",
      keenthemesIcon: "ki-wallet",
      bootstrapIcon: "bi-wallet2",
      sub: [
        {
          heading: "mainMenu.active",
          route: "/wallet/assets",
        },
        {
          heading: "mainMenu.deposit",
          route: "/wallet/deposit",
        },
        {
          heading: "mainMenu.withdraw",
          route: "/wallet/withdraw",
        },
      ],
    },
    {
      heading: "mainMenu.exchange",
      route: "/deals",
      keenthemesIcon: "ki-graph-up",
      bootstrapIcon: "bi-layers",
    },
    {
      heading: "mainMenu.p2pSideBar",
      route: "/p2p",
      keenthemesIcon: "ki-profile-user",
      bootstrapIcon: "bi-layers",
    },
    {
      sectionTitle: "mainMenu.history",
      route: "/history",
      to: "/history?name=All",
      keenthemesIcon: "ki-folder",
      bootstrapIcon: "bi-layers",
      sub: [
        {
          heading: "mainMenu.allTransactions",
          route: "/history?name=All",
        },
        {
          heading: "mainMenu.exchangeDeal",
          route: "/history?name=Exchange",
        },
        {
          heading: "mainMenu.p2pDeal",
          route: "/history?name=P2P",
        },
        {
          heading: "mainMenu.rCode",
          route: "/history?name=Rcode",
        },
      ],
    },
    {
      heading: "mainMenu.amlService",
      route: "/aml",
      keenthemesIcon: "ki-shield-search",
      bootstrapIcon: "bi-layers",
    },
    {
      heading: "mainMenu.referralProgram",
      route: "/referral",
      keenthemesIcon: "ki-gift",
      bootstrapIcon: "bi-layers",
    },
    {
      heading: "mainMenu.settings",
      route: "/settings",
      keenthemesIcon: "ki-gear",
      bootstrapIcon: "bi-layers",
    },
  ],
},
];

export default MainMenuConfig;
