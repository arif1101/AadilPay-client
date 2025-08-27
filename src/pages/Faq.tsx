import { faqs } from "@/data/faq";

export default function FAQ() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-orange-600">Frequently Asked Questions</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Everything you need to know about our wallet system.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <details
              key={index}
              className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm transition hover:shadow-md hover:border-orange-300 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-2 text-gray-900 dark:text-white">
                <h3 className="text-lg font-semibold group-open:text-orange-600">
                  {item.question}
                </h3>
                <svg
                  className="w-5 h-5 shrink-0 text-gray-400 dark:text-gray-400 transition-colors duration-300 group-open:text-orange-500 group-open:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

  );
}
