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
    title: "Available MDAs",
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
      {
        icon: <TrendingDownOutlined />,
        title: "KSMHSSD",
        to: "/ksmhssd"
      },

        {
          icon: <TrendingDownOutlined />,
          title: "Ministry of Agriculture",
          to: "/ksmhssd"
        }, 
        {
          icon: <TrendingDownOutlined />,
          title: " KDSPB",
          to: "/ksmhssd"
        },    
          ]
    
  },
  {
    icon: <HomeMaxOutlined />,
    title: "Programmes",
    items: [
      {
        icon: <TrendingDownOutlined />,
        title: "Start-up Entrepreneurship Programme",
        to: "/pr1"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Women in Agri Programme ",
        to: "/pr2"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Kaduna Emergency Nutrition Action Plan ",
        to: "/pr3"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Alliance for a Green Revolution in Africa  ",
        to: "/pr4"
      },

      {
        icon: <TrendingDownOutlined />,
        title: "Contributory Health Insurance Scheme ",
        to: "/pr1"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Community Based Advisor Project ",
        to: "/pr2"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Sexual Assault Referral Centers  ",
        to: "/pr3"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "(APPEALS)  ",
        to: "/pr4"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Free and Compulsory Basic Education  ",
        to: "/pr4"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Low Income Housing Program   ",
        to: "/pr4"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Student Scholarship Scheme  ",
        to: "/pr4"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Free School Uniform Program  ",
        to: "/pr4"
      },
      {
        icon: <TrendingDownOutlined />,
        title: " Women Empowerment Fund  ",
        to: "/pr4"
      },
      {
        icon: <TrendingDownOutlined />,
        title: "Free Maternal Nutrition and Child Healthcare ",
        to: "/pr4"
      },
      
    ]
  },
];
