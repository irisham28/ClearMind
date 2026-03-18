import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const { signIn } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await signIn(values);
      toast({ title: "Welcome back", description: "You are now signed in." });
      navigate("/profile");
    } catch (error) {
      toast({ title: "Unable to sign in", description: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <section className="container py-16">
        <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-border/60 bg-card p-8 shadow-lg">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground mb-2">Login</p>
            <h1 className="text-3xl font-semibold text-foreground">Sign in to ClearMind</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Access your check-ins, playlists, and personalized plan.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                inputMode="email"
                placeholder="name@example.com"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center">
            Need an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
