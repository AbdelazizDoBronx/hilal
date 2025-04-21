// src/pages/Dashboard.jsx
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../features/products/productSlice';
import { useGetOrdersQuery } from '../features/orders/orderSlice';
import { useGetCartQuery } from '../features/cart/cartSlice';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import UserDashboard from '../components/dashboard/UserDashboard';

const Dashboard = () => {
  const user = useSelector((state) => state.user.userInfo);
  const isAdmin = user?.role === 'admin';

  // Fetch data
  const { data: products = [] } = useGetProductsQuery(undefined, {
    skip: !isAdmin
  });
  const { data: orders = [] } = useGetOrdersQuery();
  const { data: cartItems = [] } = useGetCartQuery(undefined, {
    skip: isAdmin
  });

  // Calculate total revenue
  const totalRevenue = orders.reduce((acc, order) => acc + Number(order.total_amount), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {isAdmin ? (
        <AdminDashboard products={products} orders={orders} totalRevenue={totalRevenue} />
      ) : (
        <UserDashboard orders={orders} cartItems={cartItems} />
      )}
    </div>
  );
};

export default Dashboard;