
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface PredictionResult {
  predictedAmount: number;
  confidence: number;
  factors: {
    name: string;
    impact: number;
  }[];
}

interface PredictionModelProps {
  onPredict: (data: any) => Promise<PredictionResult>;
  className?: string;
}

const PredictionModel: React.FC<PredictionModelProps> = ({ 
  onPredict,
  className 
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState({
    campaignType: "fundraiser",
    month: "january",
    previousDonations: "10000",
    donorCount: "100",
    eventScale: "medium"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await onPredict(formData);
      setResult(result);
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={cn("glass-card p-6", className)}>
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Donation Prediction Model</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaignType">Campaign Type</Label>
              <Select 
                value={formData.campaignType} 
                onValueChange={(value) => handleChange("campaignType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fundraiser">Fundraiser</SelectItem>
                  <SelectItem value="awareness">Awareness</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Select 
                value={formData.month} 
                onValueChange={(value) => handleChange("month", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="february">February</SelectItem>
                  <SelectItem value="march">March</SelectItem>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="may">May</SelectItem>
                  <SelectItem value="june">June</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="august">August</SelectItem>
                  <SelectItem value="september">September</SelectItem>
                  <SelectItem value="october">October</SelectItem>
                  <SelectItem value="november">November</SelectItem>
                  <SelectItem value="december">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="previousDonations">Previous Donations ($)</Label>
              <Input 
                id="previousDonations" 
                type="number"
                value={formData.previousDonations}
                onChange={(e) => handleChange("previousDonations", e.target.value)}
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="donorCount">Donor Count</Label>
              <Input 
                id="donorCount" 
                type="number"
                value={formData.donorCount}
                onChange={(e) => handleChange("donorCount", e.target.value)}
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="eventScale">Event Scale</Label>
              <Select 
                value={formData.eventScale} 
                onValueChange={(value) => handleChange("eventScale", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event scale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Predicting..." : "Predict Donations"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </div>
        
        <div>
          {result ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">Predicted Donation Amount</p>
                <h3 className="text-3xl font-bold mt-1">${result.predictedAmount.toLocaleString()}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Confidence: {Math.round(result.confidence * 100)}%
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Impact Factors</h4>
                <div className="space-y-3">
                  {result.factors.map((factor) => (
                    <div key={factor.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{factor.name}</span>
                        <span className={factor.impact > 0 ? "text-green-600" : "text-red-600"}>
                          {factor.impact > 0 ? "+" : ""}{factor.impact}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            factor.impact > 0 ? "bg-green-500" : "bg-red-500"
                          )}
                          style={{ width: `${Math.abs(factor.impact)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <TrendingUp className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Prediction Yet</h3>
              <p className="text-muted-foreground mt-2">
                Fill out the form and click "Predict Donations" to see the prediction.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionModel;
