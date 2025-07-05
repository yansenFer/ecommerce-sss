import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { IoCallOutline } from 'react-icons/io5'

export const FooterLayout = () => {
  const popularCategories = [
    'Staples',
    'Beverages',
    'Personal Care',
    'Home Care',
    'Baby Care',
    'Vegetables & Fruits',
    'Snacks & Foods',
    'Dairy & Bakery',
  ]

  const customerServices = [
    'About Us',
    'Terms & Conditions',
    'FAQ',
    'Privacy Policy',
    'E-waste Policy',
    'Cancellation & Return Policy',
  ]

  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Contact & App Download */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">E-commerce</h2>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Us</h3>

                <div className="flex items-center space-x-3">
                  <FaWhatsapp className="w-5 h-5" />
                  <div>
                    <p className="text-sm">Whats App</p>
                    <p className="font-medium">+1 202-918-2132</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <IoCallOutline className="w-5 h-5" />
                  <div>
                    <p className="text-sm">Call Us</p>
                    <p className="font-medium">+1 202-918-2132</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Download App</h3>
              <div className="flex space-x-3">
                <div className="bg-black rounded-lg px-4 py-2 flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition-colors">
                  <Image
                    src=""
                    alt="Apple"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div className="text-left">
                    <p className="text-xs text-gray-300">Download on the</p>
                    <p className="text-sm font-semibold">App Store</p>
                  </div>
                </div>

                <div className="bg-black rounded-lg px-4 py-2 flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition-colors">
                  <Image
                    src=""
                    alt="Google Play"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div className="text-left">
                    <p className="text-xs text-gray-300">GET IT ON</p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Most Popular Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Most Popular Categories
            </h3>
            <ul className="space-y-3">
              {popularCategories.map((category, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm hover:text-blue-200 transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-white rounded-full mr-3"></span>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Customer Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Services</h3>
            <ul className="space-y-3">
              {customerServices.map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm hover:text-blue-200 transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-white rounded-full mr-3"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-blue-400 mt-8 pt-6 text-center">
          <p className="text-sm text-blue-100">
            © 2025 e-commerce technical interview
          </p>
        </div>
      </div>
    </footer>
  )
}
