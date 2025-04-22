import { motion } from 'framer-motion';
import {
  Package, ShoppingCart, DollarSign, AlertCircle,
  Plus, ListOrdered, Clock, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminDashboard = ({ products, orders, totalRevenue }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const currentTime = new Date();

  const adminStats = [
    {
      id: 1,
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      change: "+12%",
      positive: true
    },
    {
      id: 2,
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      change: "+8%",
      positive: true
    },
    {
      id: 3,
      title: "Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      change: "+15%",
      positive: true
    },
    {
      id: 4,
      title: "Low Stock",
      value: products.filter(p => p.quantity < 10).length,
      icon: AlertCircle,
      color: "bg-gradient-to-br from-rose-500 to-rose-600",
      change: "-3%",
      positive: false
    }
  ];

  const quickActions = [
    {
      title: "Add Product",
      description: "Create a new product listing",
      icon: Plus,
      path: "/dashboard/products",
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      title: "Manage Orders",
      description: "View and manage orders",
      icon: ListOrdered,
      path: "/dashboard/orders",
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      title: "Inventory",
      description: "Manage product inventory",
      icon: Package,
      path: "/dashboard/products",
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome, {user.username} !
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Calendar size={16} className="text-indigo-500" />
              <p className="text-gray-600">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-xl shadow-sm border border-indigo-100">
              <div className="flex items-center gap-2">
                <Clock className="text-indigo-600" size={18} />
                <span className="text-gray-700 font-medium">
                  {currentTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      
      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {adminStats.map((stat) => (
          <motion.div
            key={stat.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className={`${stat.color} p-4`}>
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <p className="text-sm opacity-80">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <stat.icon className="h-8 w-8 text-white opacity-80" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {quickActions.map((action) => (
            <motion.div
              key={action.title}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer"
              onClick={() => navigate(action.path)}
            >
              <div className={`${action.color} p-3 rounded-lg inline-block mb-4`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-black">Recent Orders</h2>
          <button
            onClick={() => navigate('/dashboard/orders')}
            className="text-sm border border-indigo-300 px-3 py-1 rounded-lg hover:bg-indigo-100 text-indigo-600 transition"
          >
            View All
          </button>
        </div>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No orders found</p>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.order_id} className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg shadow">
                <div>
                  <p className="font-medium">Order #{order.order_id}</p>
                  <p className="text-sm opacity-80">
                    {new Date(order.created_at).toDateString()}
                  </p>
                </div>
                <span className="font-medium">${Number(order.total_amount).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;

