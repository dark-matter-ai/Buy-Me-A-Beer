import Link from 'next/link';

export default function ProfileSection() {
    return (
        <section className="bg-beige mt-20 py-12 px-6 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    Love what you do and make money too
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                    Join 1M+ creators getting donations, memberships, and sales from fans!
                </p>
                {/* Corrected Get Started button */}
                <Link href="/get-started" className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-gray-800 hover:scale-95 active:scale-90 transition duration-300">
                    Get Started
                </Link>
                <p className="text-lg text-gray-600 mt-6">
                    $11M earned last month - It's free
                </p>
            </div>
            <div className="mt-12">
                <img
                    src="https://media1.giphy.com/media/wpVM8uZMwThC0/giphy.gif?cid=6c09b952i5hai4pajv61ft68zkvmblwmipk9sqblbbicmjut&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt="Beer Overflowing"
                    className="w-full max-w-4xl mx-auto"
                />
            </div>
        </section>
    );
}