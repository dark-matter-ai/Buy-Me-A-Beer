import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-10">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Features Section */}
          <div>
            <h4 className="font-bold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>Donations</li>
              <li>Memberships</li>
              <li>Ko-fi Shop</li>
              <li>Ko-fi Commissions</li>
              <li>Stream Alerts</li>
              <li>Pricing</li>
              <li>Patreon alternative</li>
            </ul>
          </div>

          {/* Use Ko-fi with Section */}
          <div>
            <h4 className="font-bold mb-4">Use Ko-fi with</h4>
            <ul className="space-y-2">
              <li>Instagram</li>
              <li>YouTube</li>
              <li>TikTok</li>
              <li>Twitch</li>
              <li>X/Twitter</li>
              <li>Medium</li>
              <li>Facebook</li>
              <li>GitHub</li>
              <li>Discord</li>
            </ul>
          </div>

          {/* Help & Support Section */}
          <div>
            <h4 className="font-bold mb-4">Help & Support</h4>
            <ul className="space-y-2">
              <li>Brand assets</li>
              <li>Ko-fi blog</li>
              <li>Help</li>
              <li>WordPress plugin</li>
              <li>Creator academy</li>
            </ul>
          </div>

          {/* About Ko-fi Section */}
          <div>
            <h4 className="font-bold mb-4">About Ko-fi</h4>
            <ul className="space-y-2">
              <li>Our story</li>
              <li>We're hiring!</li>
              <li>Cookie settings</li>
              <li>Terms</li>
              <li>Privacy</li>
              <li>Copyright policy</li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center mt-8 space-x-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} className="text-gray-700 text-2xl hover:text-gray-900" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FontAwesomeIcon icon={faYoutube} className="text-gray-700 text-2xl hover:text-gray-900" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} className="text-gray-700 text-2xl hover:text-gray-900" />
          </a>
        </div>
      </div>
    </footer>
  );
}
