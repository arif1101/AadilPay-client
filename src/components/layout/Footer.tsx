import Logo from '@/assets/icons/Logo'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Logo />
              <h1 className="text-2xl font-bold text-orange-500">AadilPay</h1>
            </div>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
              The smart wallet for Bangladesh. Secure, fast and easy transactions 
              — anytime, anywhere.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/about" className="hover:text-orange-500">About Us</a></li>
              <li><a href="/pricing" className="hover:text-orange-500">Pricing & Plans</a></li>
              <li><a href="/features" className="hover:text-orange-500">Features</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Support</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/faq" className="hover:text-orange-500">FAQs</a></li>
              <li><a href="/contact" className="hover:text-orange-500">Contact Us</a></li>
              <li><a href="/help" className="hover:text-orange-500">Help Center</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Legal</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/terms" className="hover:text-orange-500">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-orange-500">Privacy Policy</a></li>
              <li><a href="/security" className="hover:text-orange-500">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-800 pt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AadilPay. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-orange-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-orange-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-orange-500">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
