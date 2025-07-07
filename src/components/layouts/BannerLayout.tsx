'use client'
import { IProduct } from '@/interface'
import { addCommas, removeNonNumeric } from '@/utils/formatNumber'
import Image from 'next/image'
import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface BannerLayoutProps {
  dataProducts: IProduct[]
}

export const BannerLayout = ({ dataProducts }: BannerLayoutProps) => {
  const [slide, setSlide] = useState(1)
  const [imgLoading, setImgLoading] = useState(false)

  const previousSlide = () => {
    if (slide !== 1) {
      setSlide(slide - 1)
    }
  }

  const nextSlide = () => {
    if (slide !== 6) {
      setSlide(slide + 1)
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-5 p-8 lg:p-12">
          <div className="flex-1 text-white">
            <p className="xl:text-lg lg:text-lg md:text-lg sm:text-md text-sm mb-2">
              Best Deal Online
            </p>
            <h1 className="xl:text-6xl lg:text-6xl md:text-6xl sm:text-xl text-xl font-bold mb-4">
              {dataProducts[slide]?.title}
            </h1>
            <p className="xl:text-3xl lg:text-3xl md:text-3xl sm:text-xl text-lg font-semibold text-blue-400">
              Best Price ${' '}
              {addCommas(
                removeNonNumeric(dataProducts[slide]?.price.toString() || '0'),
                false
              )}
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
              <Image
                src={dataProducts[slide]?.images[0] || '/no-image.png'}
                alt="Smart Watch"
                width={300}
                height={300}
                priority={true}
                className="object-contain rounded-lg"
                onLoad={() => setImgLoading(false)}
                onError={() => setImgLoading(false)}
                style={{ display: imgLoading ? 'none' : 'block' }}
              />
              {imgLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="animate-spin h-10 w-10 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <button
            hidden={slide === 1}
            onClick={previousSlide}
            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <button
            hidden={slide === 6}
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-8 flex space-x-2">
          {[...Array(dataProducts.length)].slice(0, 6).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i + 1 === slide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
