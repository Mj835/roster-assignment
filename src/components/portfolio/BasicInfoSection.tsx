"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import Input from "../common/Input";
import type { BasicInfo } from "@/types/portfolio";
import { FaUserCircle } from "react-icons/fa";

interface BasicInfoSectionProps {
  data: BasicInfo;
  onUpdate: (data: BasicInfo) => Promise<void>;
  isEditable?: boolean;
}

export default function BasicInfoSection({
  data,
  onUpdate,
  isEditable = false,
}: BasicInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfo>({
    defaultValues: data,
  });

  const onSubmit = async (formData: BasicInfo) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onUpdate(formData);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update basic info. Please try again.");
      console.error("Update error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            error={errors.firstName?.message}
            {...register("firstName", {
              required: "First name is required",
            })}
          />
          <Input
            label="Last Name"
            error={errors.lastName?.message}
            {...register("lastName", {
              required: "Last name is required",
            })}
          />
        </div>
        <Input
          label="Summary"
          error={errors.summary?.message}
          {...register("summary", {
            required: "Summary is required",
          })}
        />

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            variant="primary"
          >
            Save Changes
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-2xl shadow-lg border border-gray-200 bg-white overflow-hidden">
      {/* Gradient Header with Profile Icon */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-28 flex items-end px-6 relative">
        <div className="absolute -bottom-8 left-6">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <FaUserCircle className="text-6xl text-gray-300" />
          </div>
        </div>
      </div>
      {/* Profile Info */}
      <div className="pt-12 pb-6 px-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {data.firstName} {data.lastName}
          </h1>
          <a
            href={`app.joinroster.co/${data.firstName.toLowerCase()}`}
            className="text-blue-600 hover:underline text-base font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            app.joinroster.co/{data.firstName.toLowerCase()}
          </a>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl">{data.summary}</p>
        </div>
        {isEditable && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
}
