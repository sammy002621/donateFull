
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  className, 
  children 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "glass-card p-6 h-full",
        className
      )}
    >
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div>{children}</div>
    </motion.div>
  );
};

export default DashboardCard;
