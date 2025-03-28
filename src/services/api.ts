
// This service handles API calls to the FastAPI backend

const API_URL = 'http://localhost:8000'; // Change this to match your FastAPI URL

// Types
interface DonationPredictionParams {
  campaignType: string;
  month: string;
  previousDonations: string;
  donorCount: string;
  eventScale: string;
}

interface PredictionResult {
  predictedAmount: number;
  confidence: number;
  factors: {
    name: string;
    impact: number;
  }[];
}

// Mock API for development
const mockPrediction = async (params: DonationPredictionParams): Promise<PredictionResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const previousDonations = parseFloat(params.previousDonations);
  const donorCount = parseInt(params.donorCount);
  
  // Base prediction using previous donations and donor count
  let basePrediction = previousDonations * 1.1;
  
  // Campaign type impact
  const campaignImpacts: Record<string, number> = {
    fundraiser: 0,
    awareness: -5,
    emergency: 15,
    annual: 8
  };
  
  // Month impact (donation seasonality)
  const monthImpacts: Record<string, number> = {
    january: -3,
    february: -5,
    march: 0,
    april: 3,
    may: 5,
    june: 2,
    july: -2,
    august: -4,
    september: 2,
    october: 5,
    november: 8,
    december: 18
  };
  
  // Event scale impact
  const eventScaleImpacts: Record<string, number> = {
    small: 2,
    medium: 8,
    large: 15
  };
  
  // Calculate prediction with all factors
  const campaignImpact = campaignImpacts[params.campaignType] || 0;
  const monthImpact = monthImpacts[params.month] || 0;
  const eventScaleImpact = eventScaleImpacts[params.eventScale] || 0;
  
  const totalImpact = 1 + (campaignImpact + monthImpact + eventScaleImpact) / 100;
  const predictedAmount = basePrediction * totalImpact;
  
  // Donor efficiency (average donation per donor)
  const avgDonationPerDonor = previousDonations / donorCount;
  const donorEfficiencyImpact = avgDonationPerDonor > 100 ? 4 : -2;
  
  return {
    predictedAmount: Math.round(predictedAmount),
    confidence: 0.83, // Simulated confidence level
    factors: [
      { name: "Campaign Type", impact: campaignImpact },
      { name: "Month Seasonality", impact: monthImpact },
      { name: "Event Scale", impact: eventScaleImpact },
      { name: "Donor Efficiency", impact: donorEfficiencyImpact }
    ]
  };
};

// Actual API calls (we'll use mock data for now)
export const predictionApi = {
  predictDonations: async (params: DonationPredictionParams): Promise<PredictionResult> => {
    try {
      // Uncomment this for real API integration
      // const response = await fetch(`${API_URL}/predict-donation`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(params),
      // });
      // return await response.json();
      
      // Use mock API for now
      return await mockPrediction(params);
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to predict donations');
    }
  }
};

// Mock data for development
export const mockData = {
  // Generate mock donors
  getMockDonors: (count = 12) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `donor-${i + 1}`,
      name: `Donor ${i + 1}`,
      email: `donor${i + 1}@example.com`,
      phone: `(555) ${100 + i}-${1000 + i}`,
      totalDonated: Math.round(1000 + Math.random() * 10000),
      lastDonation: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000)
    }));
  },
  
  // Generate mock donations
  getMockDonations: (count = 20) => {
    const statuses = ['completed', 'pending', 'failed'] as const;
    return Array.from({ length: count }, (_, i) => ({
      id: `donation-${i + 1}`,
      amount: Math.round((100 + Math.random() * 900) * 100) / 100,
      donor: {
        id: `donor-${(i % 10) + 1}`,
        name: `Donor ${(i % 10) + 1}`
      },
      date: new Date(Date.now() - Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000),
      campaign: Math.random() > 0.5 ? `Campaign ${(i % 5) + 1}` : undefined,
      event: Math.random() > 0.7 ? {
        id: `event-${(i % 3) + 1}`,
        name: `Event ${(i % 3) + 1}`
      } : undefined,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    }));
  },
  
  // Generate mock events
  getMockEvents: (count = 6) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `event-${i + 1}`,
      name: `Fundraiser Event ${i + 1}`,
      description: `This is a description for the fundraiser event ${i + 1}. It contains information about the purpose and goals of the event.`,
      date: new Date(Date.now() + Math.floor((Math.random() * 60 - 30) * 24 * 60 * 60 * 1000)),
      location: `Location ${i + 1}, City`,
      totalRaised: Math.round(500 + Math.random() * 5000),
      attendees: Math.floor(20 + Math.random() * 100)
    }));
  },
  
  // Generate mock activities
  getMockActivities: (count = 10) => {
    const types = ['donation', 'donor', 'event', 'other'] as const;
    const titles = [
      'New donation received', 
      'New donor registered',
      'Event created',
      'Donation goal reached',
      'Monthly report generated'
    ];
    const descriptions = [
      'John Doe donated $250',
      'Sarah Smith registered as a new donor',
      'Created new event: Annual Fundraiser',
      'Monthly donation goal of $10,000 reached',
      'March 2023 donation report was generated'
    ];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `activity-${i + 1}`,
      title: titles[i % titles.length],
      description: descriptions[i % descriptions.length],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 60 * 24) * 60 * 60 * 1000),
      type: types[i % types.length]
    }));
  },
  
  // Generate mock donation chart data
  getMockDonationChartData: () => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    return months.map(name => ({
      name,
      amount: Math.round(1000 + Math.random() * 9000)
    }));
  }
};
