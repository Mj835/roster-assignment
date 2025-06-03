import PortfolioForm from "@/components/portfolio/PortfolioForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Roster
          </h1>
          <p className="text-xl text-gray-600">
            Create your professional profile by submitting your portfolio URL.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <PortfolioForm />
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="text-blue-600 text-2xl font-bold mb-2">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Submit Your Portfolio
              </h3>
              <p className="text-gray-600">
                Enter the URL of your portfolio or personal website.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="text-blue-600 text-2xl font-bold mb-2">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We Extract Your Info
              </h3>
              <p className="text-gray-600">
                Our system automatically extracts your experience and videos.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="text-blue-600 text-2xl font-bold mb-2">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Get Your Profile
              </h3>
              <p className="text-gray-600">
                Receive a unique profile URL to share with potential clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
