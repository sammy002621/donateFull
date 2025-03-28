
import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/shared/PageHeader";
import DonationTable from "@/components/donations/DonationTable";
import DonationChart from "@/components/dashboard/DonationChart";
import AnimatedTransition from "@/components/shared/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Filter, PlusCircle } from "lucide-react";
import { format } from "date-fns";

const DonationsPage = () => {
  const { donations, donationChartData, isLoading } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredDonations = donations.filter(donation => 
    donation.donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (donation.campaign && donation.campaign.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (donation.event && donation.event.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const totalAmount = filteredDonations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );
  
  return (
    <>
      <PageHeader
        title="Donations"
        description="Track and manage all donation transactions"
        action={
          <Button size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Donation
          </Button>
        }
      />
      
      <div className="mb-8">
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-4 md:space-y-0">
            <TabsList>
              <TabsTrigger value="all">All Donations</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <div className="relative">
                <Input
                  placeholder="Search donations..."
                  className="w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <TabsContent value="all">
            {isLoading ? (
              <>
                <Skeleton className="h-80 rounded-lg mb-8" />
                <Skeleton className="h-96 rounded-lg" />
              </>
            ) : (
              <AnimatedTransition>
                <div className="glass-card p-6 mb-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium">Donation Overview</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(), "MMMM yyyy")}
                      </p>
                    </div>
                    <div className="flex items-center bg-primary/10 text-primary px-4 py-2 rounded-lg mt-4 md:mt-0">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <div>
                        <p className="text-sm">Total Amount</p>
                        <p className="font-bold">${totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <DonationChart 
                    data={donationChartData}
                    type="bar"
                  />
                </div>
                
                <div className="glass-card overflow-hidden">
                  <DonationTable donations={filteredDonations} />
                </div>
              </AnimatedTransition>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {isLoading ? (
              <Skeleton className="h-96 rounded-lg" />
            ) : (
              <AnimatedTransition>
                <div className="glass-card overflow-hidden">
                  <DonationTable 
                    donations={filteredDonations.filter(d => d.status === "completed")} 
                  />
                </div>
              </AnimatedTransition>
            )}
          </TabsContent>
          
          <TabsContent value="pending">
            {isLoading ? (
              <Skeleton className="h-96 rounded-lg" />
            ) : (
              <AnimatedTransition>
                <div className="glass-card overflow-hidden">
                  <DonationTable 
                    donations={filteredDonations.filter(d => d.status === "pending")} 
                  />
                </div>
              </AnimatedTransition>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default DonationsPage;
