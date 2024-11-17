import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";

export default function ProfilePage() {
  return (
    <>
      <ProtectedRoute>
        <Header />
        <div className="min-h-screen bg-gray-100">
          {/* Banner */}
          <div className="h-80 bg-gray-300 flex flex-col items-center justify-start overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1668613966303-1a993a22e93f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Banner"
              className="w-full object-cover"
              style={{ height: "170%" }} // Adjust height to control how much space the image occupies
            />
          </div>

          {/* Profile Content */}
          <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* About Section */}
            <div className="bg-black text-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">About Charles Noble</h3>
              <p>
                I am Charles. I love Japan and anime woman. I talk Japanese, and
                I am from Bangalore.
              </p>
              <a
                href="https://charles.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-4 block"
              >
                charles.com
              </a>
            </div>

            {/* Recent Posts */}
            <div className="bg-black text-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-600 mr-4"></div>
                <div>
                  <p className="font-semibold">Charles Noble</p>
                  <p className="text-gray-400 text-sm">1 hour ago</p>
                </div>
              </div>
              <p className="bg-gray-700 p-4 rounded-md">I am gey</p>
            </div>

            {/* Recent Donations */}
            <div className="bg-black text-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Recent Donations</h3>
              <p className="mb-2">
                Aarone donated 3 beers{" "}
                <span className="text-gray-400">• 3 days ago</span>
              </p>
              <p>
                Suraj donated 0.5 beer{" "}
                <span className="text-gray-400">• 1 month ago</span>
              </p>
            </div>

            {/* Support Button */}
            <div className="flex justify-center items-center">
              <Link
                href="https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Faction&cluster=devnet"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold py-4 px-10 rounded-lg shadow-md flex items-center hover:scale-95 transition duration-300 hover:text-white"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/931/931949.png"
                  alt="Beer Icon"
                  className="w-8 h-8 mr-3" // Increased icon size
                />
                Support Charles
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}
