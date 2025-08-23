import App from "@/App";
import Dashboard from "@/components/layout/Dashboard";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Faq from "@/pages/Faq";
import Features from "@/pages/Features";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import Pricing from "@/pages/Pricing";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { role } from "@/constant/role";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";



export const router = createBrowserRouter([
    {
        Component : App,
        path: "/",
        children: [
            {
                Component:Homepage,
                index: true
            },
            {
                Component: Features,
                path: "/features"
            },
            {
                Component: Pricing,
                path: "/pricing"
            },
            {
                Component: About,
                path: "/about"
            },
            {
                Component: Faq,
                path: "/faq"
            },
            {
                Component: Contact,
                path: "/contact"
            }
        ]
    },
    {
        Component: withAuth(Dashboard, role.Admin as TRole),
        path: "/admin",
        children: [
        //   { index: true, element: Navigate({ to: "/admin/analytics", replace: true }) },
        ...generateRoutes(adminSidebarItems),
        ],
    },
    {
        Component: withAuth(Dashboard, role.user as TRole),
        path: "/user",
        children: [
            ...generateRoutes(userSidebarItems)
        ]
    },
    {
        Component: withAuth(Dashboard, role.agent as TRole),
        path: "/agent",
        children: [
            ...generateRoutes(agentSidebarItems)
        ]
    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    }
])