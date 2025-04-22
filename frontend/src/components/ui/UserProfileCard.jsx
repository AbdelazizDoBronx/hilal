import { User, LogOut, ChevronLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserProfileCard = ({ user, onLogout, isLoading }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
            <User size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {user.username}
            </span>
            <span className="text-xs text-gray-500">
              {user.useremail}
            </span>
          </div>
        </div>
        <motion.div className="dropdown dropdown-top dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
            <ChevronLeft size={20} className="rotate-90" />
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-box w-52 mt-1">
            <li>
              <NavLink to="/dashboard/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                <User size={16} className="text-indigo-600" />
                <span className="text-gray-900">Profile</span>
              </NavLink>
            </li>
            <div className="divider my-1"></div>
            <li>
              <button
                onClick={onLogout}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
              >
                <LogOut size={16} className="text-red-600" />
                <span className="text-gray-900">
                  {isLoading ? 'Déconnexion...' : 'Se déconnecter'}
                </span>
              </button>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfileCard;