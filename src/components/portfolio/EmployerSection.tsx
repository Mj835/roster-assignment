"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import type { Employer, EmployerFormData } from "@/types/portfolio";
import Image from "next/image";

interface EmployerSectionProps {
  data: Employer[];
  onUpdate: (data: EmployerFormData & { id?: string }) => Promise<void>;
  onDelete: (employerId: string) => Promise<void>;
  isEditable?: boolean;
}

const employmentTypeOptions = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "CONTRACT", label: "Contract" },
];

const placeholderImg =
  "https://via.placeholder.com/320x180.png?text=No+Thumbnail";

export default function EmployerSection({
  data,
  onUpdate,
  onDelete,
  isEditable = false,
}: EmployerSectionProps) {
  const [editingEmployerId, setEditingEmployerId] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployerFormData>();

  const onSubmit = async (formData: EmployerFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      if (editingEmployerId && editingEmployerId !== "new") {
        // Update existing employer by id
        await onUpdate({ ...formData, id: editingEmployerId });
      } else {
        // Add new employer with a new id
        await onUpdate({
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
        });
      }
      setEditingEmployerId(null);
      reset();
    } catch (err) {
      setError("Failed to update employer info. Please try again.");
      console.error("Update error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (employerId: string) => {
    if (!confirm("Are you sure you want to delete this employer?")) return;

    try {
      setIsSubmitting(true);
      setError(null);
      await onDelete(employerId);
      if (editingEmployerId === employerId) {
        setEditingEmployerId(null);
        reset();
      }
    } catch (err) {
      setError("Failed to delete employer. Please try again.");
      console.error("Delete error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (employer: Employer) => {
    reset(employer);
    setEditingEmployerId(employer.id);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
        {isEditable && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              reset({
                name: "",
                jobTitle: "",
                duration: "",
                employmentType: "FULL_TIME",
                contribution: "",
                videos: [],
              });
              setEditingEmployerId("new");
            }}
          >
            Add Employer
          </Button>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {editingEmployerId ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-gray-50 p-4 rounded-lg"
        >
          <Input
            label="Employer/Client Name"
            error={errors.name?.message}
            {...register("name", {
              required: "Employer name is required",
            })}
          />
          <Input
            label="Job Title"
            error={errors.jobTitle?.message}
            {...register("jobTitle", {
              required: "Job title is required",
            })}
          />
          <Input
            label="Duration"
            placeholder="e.g., 2020 - Present"
            error={errors.duration?.message}
            {...register("duration", {
              required: "Duration is required",
            })}
          />
          <Select
            label="Employment Type"
            options={employmentTypeOptions}
            error={errors.employmentType?.message}
            {...register("employmentType", {
              required: "Employment type is required",
            })}
          />
          <Input
            label="Contribution"
            error={errors.contribution?.message}
            {...register("contribution", {
              required: "Contribution is required",
            })}
          />

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditingEmployerId(null);
                reset();
              }}
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
              {editingEmployerId === "new" ? "Add Employer" : "Save Changes"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {data.map((employer) => (
            <div
              key={employer.id}
              className="border border-gray-200 rounded-lg p-6 space-y-4 shadow-md bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {employer.name}
                  </h3>
                  <p className="text-gray-600">{employer.jobTitle}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {employer.duration} •{" "}
                    {employer.employmentType === "FULL_TIME"
                      ? "Full Time"
                      : "Contract"}
                  </p>
                  <p className="mt-2 text-gray-700">{employer.contribution}</p>
                </div>
                {isEditable && (
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => startEditing(employer)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleDelete(employer.id)}
                      disabled={isSubmitting}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>

              {employer.videos.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">
                    Videos
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {employer.videos.map((video, index) => (
                      <a
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                          <Image
                            src={video.thumbnail || placeholderImg}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                            width={320}
                            height={180}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                placeholderImg;
                            }}
                          />
                        </div>
                        <p className="mt-2 text-sm font-medium text-gray-900 group-hover:text-blue-600">
                          {video.title}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
