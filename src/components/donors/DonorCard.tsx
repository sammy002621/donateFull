
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalDonated: number;
  lastDonation: Date;
  image?: string;
}

interface DonorCardProps {
  donor: Donor;
  className?: string;
  onClick?: () => void;
}

const DonorCard: React.FC<DonorCardProps> = ({ 
  donor, 
  className,
  onClick 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card p-6 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
          {donor.image ? (
            <img 
              src={donor.image} 
              alt={donor.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-semibold">
              {donor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium truncate">{donor.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Mail className="w-3 h-3 mr-1" />
            <span className="truncate">{donor.email}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Phone className="w-3 h-3 mr-1" />
            <span>{donor.phone}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Donated</p>
            <p className="text-lg font-semibold">${donor.totalDonated.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Last Donation</p>
            <p className="text-sm">
              {donor.lastDonation.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DonorCard;
