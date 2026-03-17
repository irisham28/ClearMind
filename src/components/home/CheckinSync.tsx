import { useEffect, useRef } from "react";
import { useWellnessSurvey } from "@/contexts/WellnessSurveyContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

export function CheckinSync() {
  const { history, categoryScores, responses } = useWellnessSurvey();
  const { user } = useAuth();
  const { toast } = useToast();
  const lastSyncedRef = useRef<number | null>(null);

  useEffect(() => {
    const latestCheckin = history[0];
    if (!user || !latestCheckin) {
      return;
    }

    if (lastSyncedRef.current === latestCheckin.timestamp) {
      return;
    }

    const payload = {
      user_id: user.id,
      score: latestCheckin.score,
      category_scores: categoryScores,
      responses,
      created_at: new Date(latestCheckin.timestamp).toISOString(),
    };

    supabase
      .from("checkins")
      .insert(payload)
      .then(({ error }) => {
        if (error) {
          toast({ title: "Unable to sync check-in", description: error.message });
          return;
        }
        lastSyncedRef.current = latestCheckin.timestamp;
      });
  }, [categoryScores, history, responses, toast, user]);

  return null;
}
