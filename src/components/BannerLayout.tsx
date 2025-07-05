import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export const BannerLayout = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-5 p-8 lg:p-12">
          <div className="flex-1 text-white">
            <p className="xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm mb-2">
              Best Deal Online on smart watches
            </p>
            <h1 className="xl:text-6xl lg:text-6xl md:text-6xl sm:text-xl text-xl font-bold mb-4">
              SMART WEARABLE.
            </h1>
            <p className="xl:text-3xl lg:text-3xl md:text-3xl sm:text-xl text-lg font-semibold text-blue-400">
              UP to 80% OFF
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="relative">
              <Image
                src="https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg"
                alt="Smart Watch"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <button className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2">
            <FiChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <button className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2">
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-8 flex space-x-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === 0 ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
