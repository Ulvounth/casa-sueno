"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function useProfile() {
  const [profile, setProfile] = useState<{ is_admin: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("user_id", user.id)
        .single();

      if (!error && data) setProfile(data);
      else setProfile(null);

      setLoading(false);
    };

    getProfile();
  }, []);

  return { profile, loading };
}
