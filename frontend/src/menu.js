import React from "react";
import {HomeMaxOutlined, TrendingDownOutlined,  Dashboard, Person, People, LibraryBooks } from '@mui/icons-material';

export const menu = [
  {
    icon: <Dashboard />,
    title: "Dashboard",
    to: "/dashboard",
    items: []
  },
  {
    icon: <Person />,
    title: "Profile",
    to: "/dashboard/profile",
    items: []
  },
  {
    icon: <LibraryBooks />,
    title: "Verifications",
    to: "/dashboard/verification",
    items: []
  },
  {
    icon: <People />,
    title: "Users",
    to: "/dashboard/users",
    items: []
  },
  {
    icon: <HomeMaxOutlined />,
    title: "MDAs",
    items: [
      {
        icon: <TrendingDownOutlined />,
        title: "KADRIMA",
        to: "/kadrima"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "KACHMA",
        to: "/kachma"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "SUBEB",
        to: "/subeb"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "KSSPPO",
        to: "/kssppo"
      },
    ]
  },
  {
    icon: <HomeMaxOutlined />,
    title: "Programmes",
    items: [
      {
        icon: <TrendingDownOutlined />,
        title: "Programme 1",
        to: "/pr1"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Programme 2",
        to: "/pr2"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Programme 3",
        to: "/pr3"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Programme 4",
        to: "/pr4"
      },
    ]
  },
];
