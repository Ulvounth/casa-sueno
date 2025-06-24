import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";

export const dynamic = "force-dynamic";

export default async function MyBookingsPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", session.user.id)
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Error fetching bookings:", error.message);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings && bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="border rounded p-4 shadow">
              <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
              <p>
                <strong>From:</strong> {booking.start_date} →{" "}
                <strong>To:</strong> {booking.end_date}
              </p>
              <p>
                <strong>Guests:</strong> {booking.guests}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings yet.</p>
      )}
    </div>
  );
}
