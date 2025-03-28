
import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import AnimatedTransition from "@/components/shared/AnimatedTransition";
import PredictionModel from "@/components/prediction/PredictionModel";
import { predictionApi } from "@/services/api";

const PredictionPage = () => {
  const handlePredict = async (data: any) => {
    return await predictionApi.predictDonations(data);
  };
  
  return (
    <>
      <PageHeader
        title="Donation Prediction"
        description="Use our AI model to predict future donation amounts based on historical data and other factors"
      />
      
      <AnimatedTransition>
        <div className="grid grid-cols-1 gap-6">
          <PredictionModel onPredict={handlePredict} />
        </div>
      </AnimatedTransition>
    </>
  );
};

export default PredictionPage;
