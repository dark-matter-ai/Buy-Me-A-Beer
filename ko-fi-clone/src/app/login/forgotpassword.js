export default function ForgotPasswordModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Forgot Password
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email address or username, and we'll send you a link to
          reset your password.
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email address or username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold transition duration-300 hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
