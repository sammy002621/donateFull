
import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/shared/PageHeader";
import EventCard from "@/components/events/EventCard";
import AnimatedTransition from "@/components/shared/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle, Search } from "lucide-react";
import { Event } from "@/components/events/EventCard";
import { format } from "date-fns";

const EventsPage = () => {
  const { events, isLoading } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const now = new Date();
  const upcomingEvents = filteredEvents.filter(e => e.date > now);
  const pastEvents = filteredEvents.filter(e => e.date <= now);
  
  return (
    <>
      <PageHeader
        title="Events"
        description="Manage fundraising events and campaigns"
        action={
          <Button size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        }
      />
      
      <div className="mb-8">
        <Tabs defaultValue="upcoming">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-4 md:space-y-0">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
              <TabsTrigger value="all">All Events</TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="upcoming">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-96 rounded-lg" />
                ))}
              </div>
            ) : (
              <AnimatedTransition>
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">No upcoming events</h3>
                    <p className="text-muted-foreground mt-1">
                      Create a new event to get started
                    </p>
                    <Button className="mt-4">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        onClick={() => setSelectedEvent(event)}
                      />
                    ))}
                  </div>
                )}
              </AnimatedTransition>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-96 rounded-lg" />
                ))}
              </div>
            ) : (
              <AnimatedTransition>
                {pastEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">No past events</h3>
                    <p className="text-muted-foreground mt-1">
                      Past events will appear here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map((event) => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        onClick={() => setSelectedEvent(event)}
                      />
                    ))}
                  </div>
                )}
              </AnimatedTransition>
            )}
          </TabsContent>
          
          <TabsContent value="all">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <Skeleton key={i} className="h-96 rounded-lg" />
                ))}
              </div>
            ) : (
              <AnimatedTransition>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      onClick={() => setSelectedEvent(event)}
                    />
                  ))}
                </div>
              </AnimatedTransition>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                {selectedEvent.image ? (
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl font-semibold text-primary/50">
                      {selectedEvent.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold">{selectedEvent.name}</h2>
                <p className="text-muted-foreground mt-1">
                  {selectedEvent.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{format(selectedEvent.date, "MMMM d, yyyy")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p>{format(selectedEvent.date, "h:mm a")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p>{selectedEvent.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attendees</p>
                  <p>{selectedEvent.attendees}</p>
                </div>
              </div>
              
              <div className="bg-primary/10 text-primary px-4 py-3 rounded-lg">
                <p className="text-sm">Total Raised</p>
                <p className="text-xl font-semibold">${selectedEvent.totalRaised.toLocaleString()}</p>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>Close</Button>
                <Button>Edit</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventsPage;
