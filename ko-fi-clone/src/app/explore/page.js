import Link from "next/link";
import Header from "../components/Header";

const artImages = [
  "/profile/art-placeholder1.png",
  "/profile/art-placeholder2.png",
  "/profile/art-placeholder3.png",
  "/profile/art-placeholder4.png",
  "/profile/art-placeholder5.png",
  "/profile/art-placeholder6.png",
  "/profile/art-placeholder7.png",
  "/profile/art-placeholder8.png",
];

export default function Explore() {
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen mt-10">
        <div className="max-w-[75%] mx-auto">
          {/* Search Bar */}
          <div className="container mx-auto px-4 py-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for creators..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                "Artists",
                "Cosplayers",
                "Musicians",
                "Writers",
                "Photographers",
                "Gamers",
              ].map((category) => (
                <div
                  key={category}
                  className="text-center inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-lg shadow-lg font-semibold py-3 px-8 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-gray-800 hover:scale-95 active:scale-90 transition duration-300"
                >
                  <p className="font-medium text-white hover:text-gray-800">
                    {category}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Creators */}
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Featured Creators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg shadow-lg p-4 hover:scale-95 active:scale-90 transition duration-300"
                >
                  <img
                    src="https://memberful.com/images/blog/digital-creator1-ae338247.jpeg"
                    alt="Creator Profile"
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="pt-4">
                    <h3 className="font-bold text-lg text-white">
                      Creator Name {index + 1}
                    </h3>
                    <p className="text-sm text-white">10.2k Followers</p>
                    <p className="mt-2 text-gray-200 text-sm">
                      Short bio of the creator goes here. This is a description.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Shops */}
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Featured Shops</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg shadow-lg p-4 hover:scale-95 active:scale-90 transition duration-300"
                >
                  <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bf781778043591.5c99c0750941c.jpg"
                    alt="Shop"
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="pt-4">
                    <h3 className="font-bold text-white text-lg">
                      Shop Name {index + 1}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights Section */}
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Art Highlights</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {artImages.map((_, index) => (
                <img
                  key={index}
                  src="https://img.freepik.com/premium-photo/bottle-beer-with-yellow-top-orange-background_910054-7292.jpg"
                  alt={`Art Highlight ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg hover:scale-95 active:scale-90 transition duration-300"
                />
              ))}
            </div>
            <div className="mt-4">
              <Link href="/art-highlights" legacyBehavior>
                <a className="text-orange-500 hover:underline">See more</a>
              </Link>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Cosplay Highlights</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <img
                  key={index}
                  src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/268c4b03-533f-4e81-aec1-0c22df466a90/33482222-dbe5-4d64-9f02-7d7bc1c3c8b6.png"
                  alt={`Cosplay Highlight ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg hover:scale-95 active:scale-90 transition duration-300"
                />
              ))}
            </div>
            <div className="mt-4">
              <Link href="/cosplay-highlights" legacyBehavior>
                <a className="text-orange-500 hover:underline">See more</a>
              </Link>
            </div>
          </div>

          {/* What is Ko-fi? */}
          <div className="bg-white py-12">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold mb-4">
                What is Buy me a Beer ?
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Buy me a Beer is a platform that helps creators earn money doing
                what they love. Start creating and share your work with fans!
              </p>
              <div className="mt-6">
                <Link href="/login" legacyBehavior>
                  <a className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-gray-800 hover:scale-95 active:scale-90 transition duration-300">
                    Get Started
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
