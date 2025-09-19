// app/components/InteractiveMap.tsx
"use client";

export default function InteractiveMap() {
  return (
    <div className="mt-8">
      <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
        {/* Embedded Google Maps iframe - shows Calle Lago Bañolas area without specific house number */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1574!2d-0.7486123!3d37.9684321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCalle+Lago+Ba%C3%B1olas%2C+Orihuela%2C+Spain!5e0!3m2!1sen!2sno!4v1704117600000!5m2!1sen!2sno&z=16&q=Calle+Lago+Bañolas,+Orihuela,+Spain"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-96 md:h-[400px]"
          title="Casa Sueño Location - Calle Lago Bañolas Area"
        ></iframe>
      </div>

      {/* Map description */}
      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm">
          Explore Casa Sueño&apos;s neighborhood on Calle Lago Bañolas. Use the
          map to navigate around, zoom in/out, and discover nearby beaches,
          restaurants, and attractions. Exact house number will be provided
          after booking confirmation.
        </p>
      </div>
    </div>
  );
}
