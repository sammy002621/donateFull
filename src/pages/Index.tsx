
import React from "react";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/shared/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import MetricsCard from "@/components/dashboard/MetricsCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import DonationChart from "@/components/dashboard/DonationChart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, DollarSign, RefreshCcw, TrendingUp, Users } from "lucide-react";

const Dashboard = () => {
  const { 
    donors, 
    donations, 
    events, 
    activities, 
    donationChartData, 
    isLoading, 
    refresh 
  } = useApp();
  
  const totalDonations = donations.reduce(
    (sum, donation) => 
      donation.status === "completed" ? sum + donation.amount : sum, 
    0
  );
  
  const handleRefresh = () => {
    refresh();
  };
  
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Track donation activity and overall performance"
        action={
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        }
      />
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Donations"
            value={`$${totalDonations.toLocaleString()}`}
            change={{ value: "8.2%", positive: true }}
            icon={<DollarSign className="h-4 w-4" />}
          />
          <MetricsCard
            title="Total Donors"
            value={donors.length}
            change={{ value: "12%", positive: true }}
            icon={<Users className="h-4 w-4" />}
          />
          <MetricsCard
            title="Upcoming Events"
            value={events.filter(e => e.date > new Date()).length}
            change={{ value: "2", positive: true }}
            icon={<Calendar className="h-4 w-4" />}
          />
          <MetricsCard
            title="Donation Growth"
            value="24.5%"
            change={{ value: "4.2%", positive: true }}
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          {isLoading ? (
            <Skeleton className="h-80 rounded-lg" />
          ) : (
            <DashboardCard title="Donation Trends">
              <DonationChart data={donationChartData} />
            </DashboardCard>
          )}
        </div>
        
        <div>
          {isLoading ? (
            <Skeleton className="h-80 rounded-lg" />
          ) : (
            <DashboardCard title="Recent Activity" className="h-80 overflow-y-auto">
              <ActivityFeed activities={activities} />
            </DashboardCard>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </>
        ) : (
          <>
            <DashboardCard title="Top Donors">
              <div className="space-y-4">
                {donors
                  .sort((a, b) => b.totalDonated - a.totalDonated)
                  .slice(0, 5)
                  .map((donor, index) => (
                    <div key={donor.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{donor.name}</p>
                          <p className="text-sm text-muted-foreground">{donor.email}</p>
                        </div>
                      </div>
                      <p className="font-medium">${donor.totalDonated.toLocaleString()}</p>
                    </div>
                  ))}
              </div>
            </DashboardCard>
            
            <DashboardCard title="Recent Donations">
              <div className="space-y-4">
                {donations
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .slice(0, 5)
                  .map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{donation.donor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {donation.date.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${donation.amount.toLocaleString()}</p>
                        <p className="text-sm">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              donation.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : donation.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </DashboardCard>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
