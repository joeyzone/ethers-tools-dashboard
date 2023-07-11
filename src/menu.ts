import {
  Menu as IconMenu,
  Location,
  Operation,
  Briefcase,
  PhoneFilled,
} from "@element-plus/icons-vue";

export const menuConfig = [
  {
    index: "Tools",
    title: "工具",
    icon: Operation,
    subItems: [
      {
        path: "/tools",
        title: "工具",
      },
    ],
  },
];
