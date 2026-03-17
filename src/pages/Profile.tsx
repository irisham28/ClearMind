import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

type CheckinRecord = {
  id: string;
  score: number;
  user_id: string;
  category_scores: Record<string, number>;
  responses?: Record<string, number>;
  created_at: string;
};

export default function Profile() {
  const { user } = useAuth();

  const { data: checkins = [], isLoading } = useQuery<CheckinRecord[]>({
    queryKey: ["checkins", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) {
        throw error;
      }
      return data ?? [];
    },
    enabled: Boolean(user),
  });

  const latest = checkins[0];
  const previous = checkins[1];
  const diff =
    latest && previous ? Math.round(latest.score - previous.score) : undefined;
  const focusAreas = useMemo(() => {
    if (!latest?.category_scores) {
      return [];
    }
    const keys = Object.keys(latest.category_scores);
    return keys.map((key) => ({
      label: key,
      value: Math.min(100, Math.max(0, latest.category_scores[key])),
    }));
  }, [latest]);

  const lineData = useMemo(() => {
    return [...checkins]
      .reverse()
      .map((entry) => ({
        label: format(new Date(entry.created_at), "MMM d"),
        score: entry.score,
        time: format(new Date(entry.created_at), "h:mm a"),
      }));
  }, [checkins]);

  const barData = useMemo(() => focusAreas.slice(0, 4), [focusAreas]);

  if (!user) {
    return (
      <AppLayout>
        <section className="container py-16 text-center">
          <h1 className="text-3xl font-semibold text-white mb-4">Profile</h1>
          <p className="text-sm text-white mb-4">
            Please{" "}
            <Link to="/login" className="text-primary underline">
              login
            </Link>{" "}
            to see your check-ins and personalized history.
          </p>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <section className="container py-12 space-y-8">
        <div className="rounded-3xl border border-border/60 bg-card/80 p-8 shadow-lg">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.4em] text-white">Progress story</p>
            <h1 className="text-2xl font-semibold text-white">
              Latest check-in recorded at {latest ? `${latest.score}/100` : "—"}
              {latest && (
                <span className="text-sm text-white">
                  {" "}
                  ({format(new Date(latest.created_at), "h:mm a")})
                </span>
              )}
            </h1>
            <p className="text-sm text-white">
              {latest
                ? `${diff !== undefined ? `${diff > 0 ? "+" : ""}${diff}` : "—"} since last check-in`
                : "No data yet — start a check-in on the Home page."}
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
              <h2 className="text-sm font-semibold text-white uppercase tracking-[0.35em] mb-3">
                Session line
              </h2>
              {lineData.length ? (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.35} stroke="#ffffff" />
                    <XAxis dataKey="label" stroke="#ffffff" tick={{ fill: "#fff" }} />
                    <YAxis domain={[0, 100]} stroke="#ffffff" tick={{ fill: "#fff" }} />
                    <Tooltip
                      wrapperStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                      contentStyle={{ background: "rgba(15,15,15,0.9)", border: "none", color: "#fff" }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#ffffff"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#ffffff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-xs text-white">No check-in history yet.</p>
              )}
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
              <h2 className="text-sm font-semibold text-white uppercase tracking-[0.35em] mb-3">
                Focus areas
              </h2>
              {barData.length ? (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.35} stroke="#ffffff" />
                    <XAxis dataKey="label" stroke="#ffffff" tick={{ fill: "#fff" }} />
                    <YAxis domain={[0, 100]} stroke="#ffffff" tick={{ fill: "#fff" }} />
                    <Tooltip
                      wrapperStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                      contentStyle={{ background: "rgba(15,15,15,0.9)", border: "none", color: "#fff" }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Bar dataKey="value" fill="#ffffff" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-xs text-white">No focus data yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-border/40 bg-card/70 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white">Recent check-ins</p>
                <h2 className="text-xl font-semibold text-white">Saved history</h2>
              </div>
              <Badge variant="outline">{checkins.length} entries</Badge>
            </div>
            <div className="space-y-3">
              {isLoading && <p className="text-sm text-white">Loading...</p>}
              {!isLoading && !checkins.length && (
                <p className="text-sm text-white">No check-ins yet. Tap a score on Home.</p>
              )}
              {checkins.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between rounded-2xl border border-border/30 bg-background/40 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{entry.score}/100</p>
                    <p className="text-xs text-white">
                      {format(new Date(entry.created_at), "MMM d, h:mm a")}
                    </p>
                  </div>
                  <Badge variant="secondary">{entry.created_at ? "Saved" : "Pending"}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-border/40 bg-card/70 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white">Focus areas</p>
            <h2 className="text-xl font-semibold text-white">Sound, focus, emotion</h2>
            <p className="text-sm text-white leading-relaxed">
              These area summaries are powered by your latest check-in. Keep tapping scores on the Home page to fill more categories.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {focusAreas.map((area) => (
                <div key={area.label} className="rounded-2xl border border-border/30 bg-background/20 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{area.label}</p>
                    <span className="text-xs text-white">{area.value}/100</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-muted/60">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${area.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
