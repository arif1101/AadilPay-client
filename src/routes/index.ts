import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Faq from "@/pages/Faq";
import Features from "@/pages/Features";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import Pricing from "@/pages/Pricing";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";



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
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    }
])