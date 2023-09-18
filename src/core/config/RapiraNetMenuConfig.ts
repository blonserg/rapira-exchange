export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
  span?: string;
  svg?: string;
  href?: string;
}

const RapiraNetMenuConfig: Array<MenuItem> = [
  {
      pages: [
          {
              heading: "Telegram",
              span: "Бот",
              route: "/sdsd",
              svg: "@/assets/keenicons/outline/svg/telegram.svg",
              href: "https://t.me/RapiraNetBot",
          },
          {
              heading: "Блог",
              route: "/dassdfshboard",
              keenthemesIcon: "ki-message-edit",
          },
          {
              heading: "Новости",
              route: "/dashbsdfoard",
              keenthemesIcon: "ki-notification-status",
          },
          {
              heading: "FAQ",
              route: "/dashbsdoard",
              keenthemesIcon: "ki-questionnaire-tablet",
          },
      ],
  },
];

export default RapiraNetMenuConfig;

