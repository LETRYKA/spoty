"use client";
import { useEffect, useState } from "react";
import { CardCarousel } from "@/components/ui/card-carousel";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  title: string;
  owner: { name: string };
  startAt: string;
  isPrivate: boolean;
  backgroundImage: string;
  status: string;
}
interface eventStatusProps {
  status: string;
}
const EventsCarousel = ({ status }: eventStatusProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();
  console.log("status eventcarousel:", status);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events`
        );
        if (!res.ok)
          throw new Error(`Error fetching events: ${res.statusText}`);
        const data: Event[] = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvents();
  }, []);
  const filteredEvents = events.filter((event) => event.status === status);
  const handleCardClick = (id: string) => {
    router.push(`/eventInfo/${id}`);
  };

  return (
    <div className="w-full h-auto px-8">
      {events.length > 0 ? (
        <CardCarousel events={filteredEvents} onCardClick={handleCardClick} />
      ) : (
        <p className="text-center text-gray-400">No events available.</p>
      )}
    </div>
  );
};

export default EventsCarousel;
