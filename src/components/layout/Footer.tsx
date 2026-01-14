import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CM</span>
              </div>
              <span className="font-semibold text-lg text-foreground">ClearMind</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              A culturally sensitive mental wellbeing app for Singapore. Find calm through traditional practices and modern techniques.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sounds" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cultural Sounds
                </Link>
              </li>
              <li>
                <Link to="/mindfulness" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Mindfulness Practices
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Support</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  Emergency: 995
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  IMH: 6389 2222
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  SOS: 1800-221-4444
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} ClearMind. Designed for mental wellbeing in Singapore.
          </p>
        </div>
      </div>
    </footer>
  );
}
