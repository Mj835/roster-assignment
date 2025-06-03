import { FaBriefcase } from "react-icons/fa";

export default function WorkExperienceSection() {
  return (
    <div className="mt-8">
      {/* Section Title */}
      <div className="flex items-center mb-4">
        <FaBriefcase className="text-xl text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
      </div>
      {/* Experience Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">
              Freelance Projects
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
              contract
            </span>
          </div>
        </div>
        <a
          href="#"
          className="text-blue-600 hover:underline text-base font-medium"
        >
          Video Editor
        </a>
        <div className="flex items-center text-gray-500 text-sm mt-1 mb-2">
          <span className="mr-2">2022 - Present</span>
        </div>
        <p className="text-gray-700 text-base">
          Created engaging social media content and promotional videos for
          various clients, resulting in increased engagement rates.
        </p>
      </div>
    </div>
  );
}
