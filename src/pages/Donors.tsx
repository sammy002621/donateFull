
import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/shared/PageHeader";
import DonorCard from "@/components/donors/DonorCard";
import AnimatedTransition from "@/components/shared/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Donor } from "@/components/donors/DonorCard";
import { PlusCircle, Search } from "lucide-react";

const DonorsPage = () => {
  const { donors, isLoading } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  
  const filteredDonors = donors.filter(donor => 
    donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <>
      <PageHeader
        title="Donors"
        description="View and manage your donor contacts"
        action={
          <Button size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Donor
          </Button>
        }
      />
      
      <div className="mb-8 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search donors..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          {filteredDonors.length === 0 ? (
            <AnimatedTransition>
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No donors found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search or add a new donor
                </p>
              </div>
            </AnimatedTransition>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor) => (
                <DonorCard 
                  key={donor.id} 
                  donor={donor} 
                  onClick={() => setSelectedDonor(donor)}
                />
              ))}
            </div>
          )}
        </>
      )}
      
      <Dialog open={!!selectedDonor} onOpenChange={(open) => !open && setSelectedDonor(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Donor Details</DialogTitle>
          </DialogHeader>
          
          {selectedDonor && (
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold">
                  {selectedDonor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <h2 className="text-xl font-semibold">{selectedDonor.name}</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedDonor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{selectedDonor.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Donated</p>
                  <p className="font-semibold">${selectedDonor.totalDonated.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Donation</p>
                  <p>{selectedDonor.lastDonation.toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedDonor(null)}>Close</Button>
                <Button>Edit</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonorsPage;
