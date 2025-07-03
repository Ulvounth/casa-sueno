// app/components/InteractiveMap.tsx
"use client";

export default function InteractiveMap() {
  return (
    <div className="mt-8">
      <h4 className="text-xl font-semibold mb-4">Where you&apos;ll be</h4>
      <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
        {/* Embedded Google Maps iframe - fully interactive */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3147.123456789!2d-0.7486123!3d37.9684321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6304c2b1e123456%3A0x123456789abcdef!2sLa%20Zenia%2C%20Orihuela%2C%20Alicante%2C%20Spain!5e0!3m2!1sen!2sno!4v1704117600000!5m2!1sen!2sno&z=14"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-96 md:h-[400px]"
          title="Casa Sueño Location - La Zenia, Orihuela"
        ></iframe>
      </div>

      {/* Map description */}
      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm">
          Explore Casa Sueño&apos;s neighborhood in La Zenia. Use the map to
          navigate around, zoom in/out, and discover nearby beaches,
          restaurants, and attractions.
        </p>
      </div>
    </div>
  );
}
