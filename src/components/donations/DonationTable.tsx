
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export interface Donation {
  id: string;
  amount: number;
  donor: {
    id: string;
    name: string;
  };
  date: Date;
  campaign?: string;
  event?: {
    id: string;
    name: string;
  };
  status: "completed" | "pending" | "failed";
}

interface DonationTableProps {
  donations: Donation[];
  className?: string;
}

const DonationTable: React.FC<DonationTableProps> = ({ 
  donations, 
  className 
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Donor</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Amount</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Campaign/Event</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <motion.tbody
            variants={container}
            initial="hidden"
            animate="show"
          >
            {donations.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted-foreground">
                  No donations found
                </td>
              </tr>
            )}
            
            {donations.map((donation) => (
              <motion.tr
                key={donation.id}
                variants={item}
                className="hover:bg-secondary/40 transition-colors border-b border-border last:border-b-0"
              >
                <td className="py-3 px-4">
                  <div className="font-medium">{donation.donor.name}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium">${donation.amount.toLocaleString()}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-muted-foreground">
                    {format(donation.date, "MMM d, yyyy")}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    {donation.event?.name || donation.campaign || "General"}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    donation.status === "completed" && "bg-green-100 text-green-800",
                    donation.status === "pending" && "bg-yellow-100 text-yellow-800",
                    donation.status === "failed" && "bg-red-100 text-red-800"
                  )}>
                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationTable;
