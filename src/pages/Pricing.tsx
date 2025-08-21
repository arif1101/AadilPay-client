
export default function Pricing() {
  return (
<div className="max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
    {/* Basic Wallet */}
    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300">
      <div className="p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-gray-900">
          Basic Wallet
        </h2>
        <p className="mt-2 text-gray-600">
          Perfect for personal use with essential wallet features.
        </p>

        <p className="mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">৳50</strong>
          <span className="text-sm font-medium text-gray-600"> /month</span>
        </p>

        <a
          className="mt-6 block rounded-lg border border-pink-600 bg-pink-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-pink-600 transition"
          href="#"
        >
          Get Started
        </a>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-2 text-gray-700">✔ Cash-in limit ৳10,000</li>
          <li className="flex items-center gap-2 text-gray-700">✔ Cash-out limit ৳5,000</li>
          <li className="flex items-center gap-2 text-gray-700">✔ Standard transaction fees</li>
          <li className="flex items-center gap-2 text-red-600">✘ No agent access</li>
          <li className="flex items-center gap-2 text-red-600">✘ No commission bonus</li>
        </ul>
      </div>
    </div>

    {/* Smart Wallet (Popular) */}
    <div className="relative divide-y divide-gray-200 rounded-2xl border-2 border-pink-600 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-3 py-1 text-xs rounded-full">
        Most Popular
      </span>

      <div className="p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-gray-900">
          Smart Wallet
        </h2>
        <p className="mt-2 text-gray-600">
          Best for active users who send and withdraw frequently.
        </p>

        <p className="mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">৳150</strong>
          <span className="text-sm font-medium text-gray-600"> /month</span>
        </p>

        <a
          className="mt-6 block rounded-lg border border-pink-600 bg-pink-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-pink-600 transition"
          href="#"
        >
          Get Started
        </a>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-2 text-gray-700">✔ Cash-in limit ৳50,000</li>
          <li className="flex items-center gap-2 text-gray-700">✔ Cash-out limit ৳20,000</li>
          <li className="flex items-center gap-2 text-gray-700">✔ Lower transaction fees</li>
          <li className="flex items-center gap-2 text-gray-700">✔ Limited agent access</li>
          <li className="flex items-center gap-2 text-red-600">✘ No commission bonus</li>
        </ul>
      </div>
    </div>

    {/* Premium Wallet */}
    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300">
      <div className="p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-gray-900">
          Premium Wallet
        </h2>
        <p className="mt-2 text-gray-600">
          Advanced features for agents and high-volume users.
        </p>

        <p className="mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">৳500</strong>
          <span className="text-sm font-medium text-gray-600"> /month</span>
        </p>

        <a
          className="mt-6 block rounded-lg border border-pink-600 bg-pink-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-pink-600 transition"
          href="#"
        >
          Get Started
        </a>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-2 text-gray-700">✔ Cash-in limit ৳200,000</li>
          <li className="flex items-center gap-2 text-gray-700">✔ Unlimited cash-out</li>
          <li className="flex items-center gap-2 text-gray-700">✔ Lowest transaction fees</li>
          <li className="flex items-center gap-2 text-gray-700">✔ Full agent access</li>
          <li className="flex items-center gap-2 text-gray-700">✔ Commission bonus</li>
        </ul>
      </div>
    </div>
  </div>
</div>

  )
}
