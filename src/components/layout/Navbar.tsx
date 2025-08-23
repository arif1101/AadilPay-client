import { useLocation, Link } from "react-router"
import Logo from "@/assets/icons/Logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ModeToggle } from "./ModeToggle"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { role } from "@/constant/role"
import React from "react"

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC"},
  { href: "/features", label: "Features", role: "PUBLIC"},
  { href: "/pricing", label: "Pricing", role: "PUBLIC"},
  { href: "/about", label: "About", role: "PUBLIC"},
  { href: "/faq", label: "FAQ", role: "PUBLIC"},
  { href: "/contact", label: "Contact", role: "PUBLIC"},
  {href: "/admin", label: "Dashboard", role: role.Admin},
  {href: "/agent", label: "Dashboard", role: role.agent},
  {href: "/user", label: "Dashboard", role: role.user}
]

export default function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const dispatch = useAppDispatch()

  const {data} = useUserInfoQuery(undefined)
  const [logout] = useLogoutMutation()
  const phone = data?.data?.user?.phone
  const role = data?.data?.user?.role
  console.log(role)

  const handleLogout = async() => {
    await logout(undefined)
    dispatch(authApi.util.resetApiState())
  }


  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link) => (
                    <NavigationMenuItem key={link.href} className="w-full">
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className={`block py-1.5 w-full ${
                            pathname === link.href
                              ? "border-b-2 border-primary text-primary font-medium"
                              : "text-muted-foreground hover:text-primary"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Desktop Nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>

            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className={`py-1.5 font-medium ${
                              pathname === link.href
                                ? "border-b-2 border-primary text-primary"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                    {link.role === role && (
                      <NavigationMenuItem key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className={`py-1.5 font-medium ${
                              pathname === link.href
                                ? "border-b-2 border-primary text-primary"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button type="button" className="bg-pink-500">{data?.data?.user?.role}</Button>
          <ModeToggle/>
          {phone && (
            <Button onClick={handleLogout} variant="outline" className="text-sm">
              Logout
            </Button>
          )}
          {!phone && (
            <Button asChild className="text-sm bg-amber-500 hover:bg-amber-600">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
