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
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { role as Role } from "@/constant/role"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/pricing", label: "Pricing", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/admin/admin-overview", label: "Dashboard", role: Role.Admin },
  { href: "/agent/overview", label: "Dashboard", role: Role.agent },
  { href: "/user/overview", label: "Dashboard", role: Role.user },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const { data } = useUserInfoQuery(undefined)
  const [logout] = useLogoutMutation()
  const phone = data?.data?.user?.phone
  const role = data?.data?.user?.role
  console.log(data)

  const handleLogout = async () => {
    await logout(undefined)
    dispatch(authApi.util.resetApiState())
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Filter links → show PUBLIC + role specific
  const visibleLinks = navigationLinks.filter(
    (l) => l.role === "PUBLIC" || l.role === role
  )

  const linkBase =
    "relative px-1 text-sm font-medium transition-colors"
  const linkActive =
    "text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary"
  const linkIdle =
    "text-muted-foreground hover:text-primary"

  return (
    <header id="nav-menu"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "h-14 bg-background/80 shadow-md backdrop-blur-md"
          : "h-16 bg-background/60 backdrop-blur-sm"
      } border-b px-4 md:px-8`}
    >
      <div className="flex h-full items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu */}
          <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-48 p-1 md:hidden bg-background/90 backdrop-blur-md border"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0">
                  {visibleLinks.map((link) => (
                    <NavigationMenuItem key={link.href} className="w-full">
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block w-full py-2 ${
                            pathname === link.href
                              ? `${linkBase} ${linkActive}`
                              : `${linkBase} ${linkIdle}`
                          }`}
                          id={link.label === "Dashboard" ? "dashboard-link" : undefined}
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

          {/* Logo */}
          <Link to="/" className="hidden md:flex items-center gap-2">
            <Logo />
          </Link>


          {/* Desktop Nav */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-6">
              {visibleLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.href}
                      className={`${linkBase} ${
                        pathname === link.href ? linkActive : linkIdle
                      }`}
                      id={
                        link.label === "Dashboard"
                          ? "dashboard-link"
                          : link.label === "FAQ"
                          ? "faq-link"
                          : link.label === "Contact"
                          ? "contact-link"
                          : undefined
                      }
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>


        {/* Right: Badge + Theme + Auth */}
        <div className="flex items-center gap-3">
          {data && 
            <Tooltip>
              <TooltipTrigger>
                <p
                  onClick={() => {
                    localStorage.setItem("seenTour","restart")
                    window.location.reload()
                  }}
                  className="bg-orange-500 hover:bg-orange-500 text-[14px] text-white px-4 py-1 rounded-2xl cursor-pointer"
                >
                  Guide
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>click for guid</p>
              </TooltipContent>
            </Tooltip>
          }
          {role && (
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              {role}
            </span>
          )}
          <div id="theme-change">
            <Tooltip>
              <TooltipTrigger>
                <ModeToggle/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch between light and dark mode</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {phone ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm font-medium border-primary/40 hover:bg-primary/10"
            >
              Logout
            </Button>
          ) : (
            <Button
              asChild
              className="text-sm font-semibold bg-primary hover:bg-primary/90 px-5"
            >
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
