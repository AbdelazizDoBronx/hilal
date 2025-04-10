import { motion } from 'framer-motion';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Ventes totales",
      value: "124,750.50 MAD",
      icon: TrendingUp,
      color: "from-indigo-600 to-purple-600"
    },
    {
      title: "Clients",
      value: "1,245",
      icon: Users,
      color: "from-emerald-600 to-teal-600"
    },
    {
      title: "Produits",
      value: "2,546",
      icon: Package,
      color: "from-blue-600 to-indigo-600"
    },
    {
      title: "Revenue mensuel",
      value: "45,250.75 MAD",
      icon: DollarSign,
      color: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mr-4">
            <TrendingUp size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-display font-semibold text-gray-900">
            Tableau de bord
          </h1>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/80 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-500">{stat.title}</span>
              </div>
              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional content can be added here */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100/80 shadow-xl"
        >
          {/* Add your dashboard content here */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Activité récente
          </h2>
          <p className="text-gray-600">
            Contenu du tableau de bord...
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;