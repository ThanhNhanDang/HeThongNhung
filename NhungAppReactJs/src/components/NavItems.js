import * as Icons from "react-icons/fa";
import { HiDocumentSearch } from "react-icons/hi";
import { AiFillSetting } from "react-icons/ai";

export const navItems = [
  {
    id: 1,
    title: "Trang chủ",
    path: "/dashboard/app",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaHome />,
  },
  {
    id: 2,
    title: "Biểu đồ",
    path: "/dashboard/charts",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaChartArea />,
  },
  {
    id: 3,
    title: "Cài đặt",
    path: "/dashboard/setting",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <AiFillSetting />,
  },
];
