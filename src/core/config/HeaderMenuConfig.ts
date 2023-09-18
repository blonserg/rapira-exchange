export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const HeaderMenuConfig: Array<MenuItem> = [
  {
      pages: [
          {
              heading: "header.main",
              route: "/dashboard",
              keenthemesIcon: "element-11",
              bootstrapIcon: "bi-app-indicator",
          },
          {
              heading: "header.exchange",
              route: "/exchange",
              keenthemesIcon: "graph-up",
              bootstrapIcon: "bi-layers",
          },
          // {
          //     heading: "header.p2p",
          //     route: "/history?name=P2P",
          //     keenthemesIcon: "profile-user",
          //     bootstrapIcon: "bi-layers",
          // },
          {
              heading: "header.p2p",
              route: "/p2pnew",
              keenthemesIcon: "profile-user",
              bootstrapIcon: "bi-layers",
          },
      ],
  },
];

export default HeaderMenuConfig;
