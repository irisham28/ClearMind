import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type SignupFormValues = {
  email: string;
  password: string;
  fullName: string;
};

export default function Signup() {
  const { signUp } = useAuth();
  const { register, handleSubmit } = useForm<SignupFormValues>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: SignupFormValues) => {
    setLoading(true);
    try {
      await signUp({ email: values.email, password: values.password, fullName: values.fullName });
      toast({ title: "Account created", description: "Check your inbox for verification steps." });
      navigate("/profile");
    } catch (error) {
      toast({ title: "Sign up failed", description: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <section className="container py-16">
        <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-border/60 bg-card p-8 shadow-lg">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground mb-2">Create account</p>
            <h1 className="text-3xl font-semibold text-foreground">Join ClearMind</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Save your check-ins, personalize practices, and keep track of progress.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                placeholder="Optional"
                {...register("fullName")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center">
            Already a member?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
