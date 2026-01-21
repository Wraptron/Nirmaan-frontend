import React from "react";
function UpcomingEvents() {
    const events = [
      {
        id: 1,
        title: "Lorem ipsum dor amitLorem ipsum dor amitLorem ipsum",
        date: "02 Jan 2025",
        time: "11:00 am",
        image:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80",
      },
      {
        id: 2,
        title: "Lorem ipsum dor amitLorem ipsum dor amitLorem ipsum",
        date: "02 Jan 2025",
        time: "11:00 am",
        image:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80",
      },
      {
        id: 3,
        title: "Lorem ipsum dor amitLorem ipsum dor amitLorem ipsum",
        date: "02 Jan 2025",
        time: "11:00 am",
        image:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80",
      },
    ];

  return (
    <div className="w-full max-w-md p-4">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>

      {/* Event List */}
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100"
          >
            {/* Image */}
            <img
              src={event.image}
              alt="event"
              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
            />

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                {event.title}
              </p>

              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {event.date}
                </span>

                <span className="flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2M12 22a10 10 0 100-20 10 10 0 000 20z"
                    />
                  </svg>
                  {event.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UpcomingEvents;
