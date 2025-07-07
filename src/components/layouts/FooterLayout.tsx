import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export const FooterLayout = () => {
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
                    <p className="font-medium">+62 813-8400-4840</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MdEmail className="w-5 h-5" />
                  <div>
                    <p className="text-sm">Email</p>
                    <p className="font-medium">yansenferdinand6@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-blue-400 mt-8 pt-6 text-center">
          <p className="text-sm text-blue-100">
            © 2025 e-commerce yanson ferdinand kurniadi
          </p>
        </div>
      </div>
    </footer>
  )
}
