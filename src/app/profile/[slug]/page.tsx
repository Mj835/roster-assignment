"use client";

import { useEffect, useState, use } from "react";
import BasicInfoSection from "@/components/portfolio/BasicInfoSection";
import WorkExperienceSection from "@/components/portfolio/WorkExperienceSection";
import EmployerSection from "@/components/portfolio/EmployerSection";
import type { PortfolioData } from "@/types/portfolio";

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = use(params);
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const STORAGE_KEY = "roster_portfolios";
    const data =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (data) {
      const portfolios: PortfolioData[] = JSON.parse(data);
      const found = portfolios.find((p) => p.profileUrl === `/profile/${slug}`);
      setPortfolio(found || null);
    } else {
      setPortfolio(null);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-700">Loading...</div>
      </main>
    );
  }

  if (!portfolio) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-lg text-gray-700">
            This profile could not be found.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <BasicInfoSection
            data={portfolio.basicInfo}
            onUpdate={async (data) => {
              // Update in localStorage
              const STORAGE_KEY = "roster_portfolios";
              const raw = localStorage.getItem(STORAGE_KEY);
              if (!raw) return;
              const portfolios: PortfolioData[] = JSON.parse(raw);
              const idx = portfolios.findIndex(
                (p) => p.profileUrl === portfolio.profileUrl
              );
              if (idx !== -1) {
                portfolios[idx].basicInfo = data;
                portfolios[idx].updatedAt = new Date().toISOString();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
                setPortfolio({ ...portfolios[idx] });
              }
            }}
            isEditable={true}
          />

          <WorkExperienceSection />

          <div className="border-t border-gray-200 pt-8">
            <EmployerSection
              data={portfolio.employers}
              onUpdate={async (data) => {
                // Update in localStorage
                const STORAGE_KEY = "roster_portfolios";
                const raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return;
                const portfolios: PortfolioData[] = JSON.parse(raw);
                const idx = portfolios.findIndex(
                  (p) => p.profileUrl === portfolio.profileUrl
                );
                if (idx !== -1) {
                  // Update or add employer
                  const employers = portfolios[idx].employers;
                  const existingIndex = employers.findIndex(
                    (e) => e.name === data.name
                  );
                  const employer = {
                    id:
                      existingIndex >= 0
                        ? employers[existingIndex].id
                        : Math.random().toString(36).substr(2, 9),
                    ...data,
                  };
                  if (existingIndex >= 0) {
                    employers[existingIndex] = employer;
                  } else {
                    employers.push(employer);
                  }
                  portfolios[idx].employers = employers;
                  portfolios[idx].updatedAt = new Date().toISOString();
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
                  setPortfolio({ ...portfolios[idx] });
                }
              }}
              onDelete={async (employerId) => {
                // Delete in localStorage
                const STORAGE_KEY = "roster_portfolios";
                const raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return;
                const portfolios: PortfolioData[] = JSON.parse(raw);
                const idx = portfolios.findIndex(
                  (p) => p.profileUrl === portfolio.profileUrl
                );
                if (idx !== -1) {
                  portfolios[idx].employers = portfolios[idx].employers.filter(
                    (e) => e.id !== employerId
                  );
                  portfolios[idx].updatedAt = new Date().toISOString();
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
                  setPortfolio({ ...portfolios[idx] });
                }
              }}
              isEditable={true}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
