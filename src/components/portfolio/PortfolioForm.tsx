"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import Input from "../common/Input";
import { portfolioApi } from "@/services/mockApi";
import type { PortfolioFormData } from "@/types/portfolio";

export default function PortfolioForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    defaultValues: {
      portfolioUrl: "",
    },
  });

  const onSubmit = async (data: PortfolioFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const portfolio = await portfolioApi.submitPortfolio(data);
      router.push(portfolio.profileUrl);
    } catch (error) {
      setSubmitError("Failed to submit portfolio. Please try again.");
      console.error("Portfolio submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Submit Your Portfolio
        </h1>
        <p className="text-lg text-gray-600">
          Share your portfolio URL and we&apos;ll create a profile page for you
          on Roster.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Portfolio URL"
          placeholder="https://your-portfolio-site.com"
          error={errors.portfolioUrl?.message}
          helperText="Enter the URL of your portfolio or personal website"
          {...register("portfolioUrl", {
            required: "Portfolio URL is required",
            pattern: {
              value: /^https?:\/\/.+/,
              message:
                "Please enter a valid URL starting with http:// or https://",
            },
          })}
        />

        {submitError && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {submitError}
                </h3>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Create Profile
          </Button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Example Portfolio
        </h2>
        <p className="text-gray-600 mb-2">
          You can use this example portfolio for testing:
        </p>
        <a
          href="https://sonuchoudhary.my.canva.site/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          https://sonuchoudhary.my.canva.site/portfolio
        </a>
      </div>
    </div>
  );
}
