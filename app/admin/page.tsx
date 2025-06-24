export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export default async function AdminPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Ikke innlogget → redirect til login
    redirect("/login");
  }

  // Hent profil for bruker
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", session.user.id)
    .single();

  if (!profile?.is_admin) {
    // Ikke admin → redirect til forsiden
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="text-gray-600">
        Du er logget inn som admin: {session.user.email}
      </p>

      {/* Her kan du legge til admin-funksjoner senere */}
    </div>
  );
}
