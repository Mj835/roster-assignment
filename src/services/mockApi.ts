import {
  PortfolioData,
  PortfolioFormData,
  EmployerFormData,
} from "../types/portfolio";

// Mock delay to simulate API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper functions for localStorage
const STORAGE_KEY = "roster_portfolios";

const getPortfolios = (): PortfolioData[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const savePortfolios = (portfolios: PortfolioData[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
};

// Mock portfolio parser - in a real app, this would be a backend service
const parsePortfolioUrl = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  url: string
): Promise<Partial<PortfolioData>> => {
  // Simulate parsing delay
  await delay(1000);

  // Mock data based on the example portfolio
  return {
    basicInfo: {
      firstName: "Sonu",
      lastName: "Choudhary",
      summary:
        "Creative video editor with a passion for storytelling through visual media.",
    },
    employers: [
      {
        id: "1",
        name: "Example Client",
        jobTitle: "Senior Video Editor",
        duration: "2022 - Present",
        employmentType: "CONTRACT",
        contribution:
          "Led video editing for major brand campaigns and social media content.",
        videos: [
          {
            title: "Brand Campaign 2023",
            url: "https://example.com/video1",
            thumbnail: "https://example.com/thumb1.jpg",
          },
        ],
      },
    ],
  };
};

export const portfolioApi = {
  // Submit a new portfolio URL
  submitPortfolio: async (data: PortfolioFormData): Promise<PortfolioData> => {
    await delay(1000);

    const portfolios = getPortfolios();
    const parsedData = await parsePortfolioUrl(data.portfolioUrl);
    const newPortfolio: PortfolioData = {
      id: Math.random().toString(36).substr(2, 9),
      portfolioUrl: data.portfolioUrl,
      profileUrl: `/profile/${parsedData.basicInfo?.firstName.toLowerCase()}`,
      basicInfo: parsedData.basicInfo!,
      employers: parsedData.employers || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    portfolios.push(newPortfolio);
    savePortfolios(portfolios);
    return newPortfolio;
  },

  // Get portfolio by profile URL
  getPortfolioByProfileUrl: async (
    profileUrl: string
  ): Promise<PortfolioData | null> => {
    await delay(500);
    const portfolios = getPortfolios();
    return portfolios.find((p) => p.profileUrl === profileUrl) || null;
  },

  // Update basic info
  updateBasicInfo: async (
    profileUrl: string,
    basicInfo: PortfolioData["basicInfo"]
  ): Promise<PortfolioData> => {
    await delay(500);
    const portfolios = getPortfolios();
    const portfolio = portfolios.find((p) => p.profileUrl === profileUrl);
    if (!portfolio) throw new Error("Portfolio not found");

    portfolio.basicInfo = basicInfo;
    portfolio.updatedAt = new Date().toISOString();
    savePortfolios(portfolios);
    return portfolio;
  },

  // Add or update employer
  updateEmployer: async (
    profileUrl: string,
    employerData: EmployerFormData
  ): Promise<PortfolioData> => {
    await delay(500);
    const portfolios = getPortfolios();
    const portfolio = portfolios.find((p) => p.profileUrl === profileUrl);
    if (!portfolio) throw new Error("Portfolio not found");

    const existingIndex = portfolio.employers.findIndex(
      (e) => e.name === employerData.name
    );
    const employer = {
      id:
        existingIndex >= 0
          ? portfolio.employers[existingIndex].id
          : Math.random().toString(36).substr(2, 9),
      ...employerData,
    };

    if (existingIndex >= 0) {
      portfolio.employers[existingIndex] = employer;
    } else {
      portfolio.employers.push(employer);
    }

    portfolio.updatedAt = new Date().toISOString();
    savePortfolios(portfolios);
    return portfolio;
  },

  // Delete employer
  deleteEmployer: async (
    profileUrl: string,
    employerId: string
  ): Promise<PortfolioData> => {
    await delay(500);
    const portfolios = getPortfolios();
    const portfolio = portfolios.find((p) => p.profileUrl === profileUrl);
    if (!portfolio) throw new Error("Portfolio not found");

    portfolio.employers = portfolio.employers.filter(
      (e) => e.id !== employerId
    );
    portfolio.updatedAt = new Date().toISOString();
    savePortfolios(portfolios);
    return portfolio;
  },
};
