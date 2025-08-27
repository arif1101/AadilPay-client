import { motion } from "framer-motion";
import { features } from "@/data/features";

export default function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Choose Your <span className="text-orange-600">Plan</span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Whether you need essential tools or advanced power, we’ve got the perfect plan for you.
          </p>
        </motion.div>

        {/* Standard vs Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Standard */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-10 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Standard</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Perfect for individuals and small teams who need essential features.
            </p>
            <ul className="space-y-4">
              {features.slice(0, 4).map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <li key={i} className="flex items-start space-x-3">
                    <Icon className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-200">{feature.title}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Premium */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-orange-50 dark:bg-gray-800 border border-orange-200 dark:border-gray-700 p-10 rounded-2xl shadow-lg hover:shadow-xl transition relative"
          >
            <span className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Premium</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Advanced features for growing businesses and power users.
            </p>
            <ul className="space-y-4">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <li key={i} className="flex items-start space-x-3">
                    <Icon className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-200">{feature.title}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>

  );
}
