export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-beige py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="separator"></div>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">How It Works</h1>
        <p className="text-xl text-gray-600 mb-12">
          Our platform makes it simple to support creators, share content, and
          get rewards. Here’s how it works:
        </p>

        {/* Step 1 */}
        <div className="flex flex-col sm:flex-row mb-12">
          <div className="sm:w-1/3 mb-8 sm:mb-0">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-95 active:scale-90 transition duration-300 text-white rounded-full flex items-center justify-center">
              <span className="text-2xl text-black font-bold">1</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">
              Discover Creators
            </h3>
            <p className="text-gray-600 mt-2">
              Browse a wide range of creators in different niches, from art to
              tech, and everything in between. Find your favorites!
            </p>
          </div>

          {/* Step 2 */}
          <div className="sm:w-1/3 mb-8 sm:mb-0">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-95 active:scale-90 transition duration-300 text-white rounded-full flex items-center justify-center">
              <span className="text-2xl text-black font-bold">2</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">
              Support Creators
            </h3>
            <p className="text-gray-600 mt-2">
              Support your favorite creators by becoming a patron or donating
              money directly. Choose from multiple ways to show your support!
            </p>
          </div>

          {/* Step 3 */}
          <div className="sm:w-1/3">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:scale-95 active:scale-90 transition duration-300 rounded-full flex items-center justify-center">
              <span className="text-2xl text-black font-bold">3</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">
              Enjoy Rewards
            </h3>
            <p className="text-gray-600 mt-2">
              Get exclusive content, shoutouts, and more as a thank you for your
              support. Creators will reward you with awesome perks!
            </p>
          </div>
        </div>

        {/* YouTube Video Embed */}
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4"></h2>
          <div
            className="relative w-full h-0"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/cjXjHxIsH3g?si=4aDJembnG1zEsCYb"
              title="How It Works Video"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
