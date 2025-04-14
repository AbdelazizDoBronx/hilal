import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../ui/Logo";
import BackgroundParticles from "../ui/BackgroundParticles";
import { LoginContent, RegisterContent } from "./AuthContentSection";
import GlassCard from "../ui/GlassCard";

export default function AuthLayout({ children, title, subtitle }) {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full md:w-2/5 bg-white p-8 md:p-12 flex flex-col justify-center relative"
      >
        <BackgroundParticles />
        <div className="max-w-md mx-auto w-full relative z-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center mb-10"
          >
            <Logo variant="minimal" size="xl" className="w-40 h-40" />
          </motion.div>

          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-display font-semibold text-neutral-900 mb-2"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-neutral-600 mb-8"
          >
            {subtitle}
          </motion.p>

          <GlassCard className="p-8">
            {children}
          </GlassCard>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <span className="text-sm text-neutral-500">
              © 2025 AlHilal Distribution • Tous droits réservés
            </span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`hidden md:block md:w-3/5 relative overflow-hidden
          ${isRegisterPage
            ? 'bg-gradient-to-tr from-blue-900 via-indigo-800 to-violet-900'
            : 'bg-gradient-to-tr from-emerald-900 via-emerald-800 to-emerald-900'}
          [clip-path:polygon(10%_0,100%_0%,100%_100%,0%_100%)]`}
      >
        <BackgroundParticles />
        <div className="relative z-10 h-full flex flex-col justify-center p-12">
          <div className="max-w-xl mx-auto">
            {isRegisterPage ? <RegisterContent /> : <LoginContent />}
          </div>
        </div>
      </motion.div>
    </div>
  );
}