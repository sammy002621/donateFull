
import React, { createContext, useContext, useState, useEffect } from "react";
import { mockData } from "@/services/api";
import { Donor } from "@/components/donors/DonorCard";
import { Donation } from "@/components/donations/DonationTable";
import { Event } from "@/components/events/EventCard";
import { Activity } from "@/components/dashboard/ActivityFeed";

type AppContextType = {
  donors: Donor[];
  donations: Donation[];
  events: Event[];
  activities: Activity[];
  donationChartData: any[];
  isLoading: boolean;
  refresh: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [donationChartData, setDonationChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMockData = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setDonors(mockData.getMockDonors());
      setDonations(mockData.getMockDonations());
      setEvents(mockData.getMockEvents());
      setActivities(mockData.getMockActivities());
      setDonationChartData(mockData.getMockDonationChartData());
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadMockData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        donors,
        donations,
        events,
        activities,
        donationChartData,
        isLoading,
        refresh: loadMockData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
