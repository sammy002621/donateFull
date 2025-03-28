
import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import AnimatedTransition from "@/components/shared/AnimatedTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import DonationChart from "@/components/dashboard/DonationChart";

const reportsData = [
  { month: "Jan", donations: 5000, donors: 120 },
  { month: "Feb", donations: 7500, donors: 150 },
  { month: "Mar", donations: 6200, donors: 135 },
  { month: "Apr", donations: 8100, donors: 165 },
  { month: "May", donations: 9400, donors: 190 },
  { month: "Jun", donations: 8700, donors: 178 },
];

const transformedData = reportsData.map(item => ({
  name: item.month,
  amount: item.donations,
}));

const ReportsPage = () => {
  return (
    <>
      <PageHeader
        title="Reports"
        description="View donation statistics and generate reports"
      />
      
      <AnimatedTransition>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Donation Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                className="h-80" 
                config={{
                  donations: {
                    label: "Donations",
                    color: "hsl(var(--primary))"
                  }
                }}
              >
                <AreaChart
                  data={reportsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => `Month: ${label}`}
                        formatter={(value, name) => [`$${value}`, name === "donations" ? "Total Donations" : "Total Donors"]}
                      />
                    }
                  />
                  <Area 
                    type="monotone" 
                    dataKey="donations" 
                    fill="url(#colorDonations)" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                  />
                  <Legend wrapperStyle={{ marginTop: "10px" }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <DonationChart 
                data={transformedData} 
                type="bar" 
                className="h-80"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reports Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                  <h3 className="font-medium mb-2">Annual Report</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete financial overview for the current year
                  </p>
                  <div className="text-sm text-primary hover:underline cursor-pointer">
                    Download PDF
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                  <h3 className="font-medium mb-2">Donor Retention Report</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Analysis of donor retention rates and trends
                  </p>
                  <div className="text-sm text-primary hover:underline cursor-pointer">
                    Download PDF
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                  <h3 className="font-medium mb-2">Campaign Performance</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Success metrics for recent fundraising campaigns
                  </p>
                  <div className="text-sm text-primary hover:underline cursor-pointer">
                    Download PDF
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedTransition>
    </>
  );
};

export default ReportsPage;
