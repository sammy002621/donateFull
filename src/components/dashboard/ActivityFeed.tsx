
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: "donation" | "donor" | "event" | "other";
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, className }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {activities.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No recent activities
          </div>
        )}
        
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            variants={item}
            className="glass-card p-4 flex items-start space-x-4"
          >
            <div className={cn(
              "w-2 h-2 mt-2 rounded-full flex-shrink-0",
              activity.type === "donation" && "bg-green-500",
              activity.type === "donor" && "bg-blue-500",
              activity.type === "event" && "bg-purple-500",
              activity.type === "other" && "bg-gray-500"
            )} />
            <div className="flex-1 min-w-0">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ActivityFeed;
