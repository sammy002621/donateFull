
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

export interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  totalRaised: number;
  attendees: number;
  image?: string;
}

interface EventCardProps {
  event: Event;
  className?: string;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  className,
  onClick 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card overflow-hidden cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <Calendar className="w-12 h-12 text-primary/50" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="font-semibold text-lg text-white">{event.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {event.description}
        </p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span>{format(event.date, "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span>{format(event.date, "h:mm a")}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span>{event.attendees} attendees</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Total Raised</p>
            <p className="text-lg font-semibold">${event.totalRaised.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
