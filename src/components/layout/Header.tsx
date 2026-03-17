import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Sounds", path: "/sounds" },
  { label: "Mindfulness", path: "/mindfulness" },
  { label: "Resources", path: "/resources" },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-card/80 backdrop-blur-2xl border-b border-border shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-16 h-auto overflow-hidden  border border-border bg-muted flex items-center justify-center">
              <img
                src="/clearmind.png"
                alt="ClearMind logo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="font-semibold text-lg text-foreground">ClearMind</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium hover:bg-muted"
                  >
                    <Avatar>
                      <AvatarFallback>{user.email?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-xs font-semibold sm:block">
                      {user.email?.split("@")[0]}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="text-xs">
                    Signed in as {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Login
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="px-4 py-2">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
                {user ? (
                  <>
                    <Link to="/profile" className="text-sm font-medium text-foreground">
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="text-sm font-medium text-destructive hover:text-destructive-foreground"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-sm font-medium text-muted-foreground">
                      Login
                    </Link>
                    <Link to="/signup">
                      <Button size="sm" variant="outline">
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
