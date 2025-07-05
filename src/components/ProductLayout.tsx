import Image from 'next/image'

export const ProductLayout = () => {
  const smartphones = [
    {
      id: 1,
      name: 'Galaxy S22 Ultra',
      image: '/placeholder.svg?height=200&width=150',
      originalPrice: '₹74999',
      currentPrice: '₹32999',
      discount: '54% OFF',
      savings: '₹32999',
    },
    {
      id: 2,
      name: 'Galaxy M13 (4GB | 64 GB )',
      image: '/placeholder.svg?height=200&width=150',
      originalPrice: '₹14999',
      currentPrice: '₹10499',
      discount: '54% OFF',
      savings: '₹4500',
    },
    {
      id: 3,
      name: 'Galaxy M33 (4GB | 64 GB )',
      image: '/placeholder.svg?height=200&width=150',
      originalPrice: '₹24999',
      currentPrice: '₹16999',
      discount: '54% OFF',
      savings: '₹8000',
    },
    {
      id: 4,
      name: 'Galaxy M53 (4GB | 64 GB )',
      image: '/placeholder.svg?height=200&width=150',
      originalPrice: '₹40999',
      currentPrice: '₹31999',
      discount: '54% OFF',
      savings: '₹9000',
    },
    {
      id: 5,
      name: 'Galaxy S22 Ultra',
      image: '/placeholder.svg?height=200&width=150',
      originalPrice: '₹85999',
      currentPrice: '₹67999',
      discount: '54% OFF',
      savings: '₹18000',
    },
    {
      id: 6,
      name: 'Galaxy S22 Ultra',
      image: '/placeholder.svg?height=200&width=150',
      originalPrice: '₹85999',
      currentPrice: '₹67999',
      discount: '54% OFF',
      savings: '₹18000',
    },
    {
      id: 7,
      name: 'Galaxy S22 Ultra',
      image: '/placeholder.svg?height=200&width=150',
      originalPrice: '₹85999',
      currentPrice: '₹67999',
      discount: '54% OFF',
      savings: '₹18000',
    },
    {
      id: 8,
      name: 'Galaxy S22 Ultra',
      image: '/placeholder.svg?height=200&width=150',
      originalPrice: '₹85999',
      currentPrice: '₹67999',
      discount: '54% OFF',
      savings: '₹18000',
    },
    {
      id: 9,
      name: 'Galaxy S22 Ultra',
      image: '/placeholder.svg?height=200&width=150',
      originalPrice: '₹85999',
      currentPrice: '₹67999',
      discount: '54% OFF',
      savings: '₹18000',
    },
    {
      id: 10,
      name: 'Galaxy S22 Ultra',
      image: '/placeholder.svg?height=200&width=150',
      originalPrice: '₹85999',
      currentPrice: '₹67999',
      discount: '54% OFF',
      savings: '₹18000',
    },
    {
      id: 11,
      name: 'Galaxy S22 Ultra',
      image: '/placeholder.svg?height=200&width=150',
      originalPrice: '₹85999',
      currentPrice: '₹67999',
      discount: '54% OFF',
      savings: '₹18000',
    },
  ]
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Grab the best deal on{' '}
          <span className="text-blue-600">Smartphones</span>
        </h2>
        <button className="text-blue-600 hover:text-blue-700">
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {smartphones.map((phone) => (
          <div
            key={phone.id}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="relative p-4">
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                {phone.discount}
              </div>
              <Image
                src={phone.image || '/placeholder.svg'}
                alt={phone.name}
                width={150}
                height={200}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="font-medium text-sm mb-2 line-clamp-2">
                {phone.name}
              </h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">
                    {phone.currentPrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {phone.originalPrice}
                  </span>
                </div>
                <p className="text-green-600 text-sm font-medium">
                  Save - {phone.savings}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
