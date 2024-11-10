import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-transparent bg-opacity-50 backdrop-blur-md py-4 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
                {/* Logo with image */}
                <div className="flex items-center">
                    <Link href="/" className="hover:text-gray-600">
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/931/931949.png"  // Replace this path with your actual image path
                            alt="Your Logo"
                            className="h-8"  // Adjust the size of the logo as needed
                        />
                    </Link>
                    <span className='px-3'>Buy Me A Beer</span>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-6">
                    <Link
                        href="#how-it-works"
                        className="text-black font-bold hover:text-gray-900"
                    >
                        How it Works
                    </Link>
                    <Link
                        href="/login"
                        className="text-black font-bold hover:text-gray-900"
                    >
                        Login
                    </Link>

                    {/* Sign Up Button */}
                    <button className="inline-block bg-black text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-gray-800 transition duration-300 ml-6">
                        Sign up free
                    </button>
                </nav>
            </div>
        </header>
    );
}
