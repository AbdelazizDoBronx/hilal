import Logo from "../ui/Logo";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLayout({ children, title, subtitle }) {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side - Form section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full md:w-2/5 bg-white p-8 md:p-12 flex flex-col justify-center relative"
      >
        {/* Subtle gradient background */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50/50 to-transparent"></div>

        <div className="max-w-md mx-auto w-full relative z-10">
          {/* Modern logo container with animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-10"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl -m-2 group-hover:scale-105 transition-transform duration-300"></div>
              <Logo
                variant="minimal"
                size="xl"
                className="relative w-40 h-40 p-4 bg-white rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Title with modern underline effect */}
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-display font-semibold text-neutral-900 mb-2 relative"
          >
            {title}
            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
          </motion.h1>

          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-neutral-600 mb-8 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* Glass-morphism form container */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-neutral-100/80"
          >
            {children}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-neutral-500"
          >
            <span className="inline-block px-4 py-2 bg-white/50 rounded-full backdrop-blur-sm">
              © 2025 AlHilal Distribution • Tous droits réservés
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Immersive Promotional Experience */}
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
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-auth-pattern opacity-15"></div>
          <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br 
            ${isRegisterPage 
              ? 'from-blue-500/30' 
              : 'from-emerald-500/30'} 
            to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4`}>
          </div>
          <div className={`absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr 
            ${isRegisterPage 
              ? 'from-violet-500/20' 
              : 'from-emerald-500/20'} 
            to-transparent rounded-full blur-2xl`}>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center p-12">
          <div className="max-w-xl mx-auto">
            {isRegisterPage ? (
              <>
                {/* Register page content */}
                <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight mb-4">
                  Rejoignez <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-violet-300">l'avenir</span> de la distribution
                </h2>
                
                <p className="text-white/80 text-xl mb-8 leading-relaxed">
                  Créez votre compte et transformez votre expérience de gestion d'inventaire dès aujourd'hui.
                </p>
                
                {/* Benefits showcase */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-xl shadow-black/5">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/15 rounded-xl mb-4">
                      <svg className="w-6 h-6 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">Rapide et Efficace</h3>
                    <p className="text-white/70 text-sm">Gérez votre inventaire en temps réel avec des mises à jour instantanées</p>
                  </div>
                  
                  <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-xl shadow-black/5">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/15 rounded-xl mb-4">
                      <svg className="w-6 h-6 text-violet-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">Analyses Avancées</h3>
                    <p className="text-white/70 text-sm">Obtenez des insights précieux sur votre chaîne d'approvisionnement</p>
                  </div>
                </div>
                
                {/* Business impact metrics */}
                <div className="mt-6 backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-xl shadow-black/5">
                  <h3 className="text-white text-lg font-semibold mb-4">Impact commercial prouvé</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-white text-2xl font-bold">+42%</div>
                      <div className="text-white/70 text-xs">Efficacité opérationnelle</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-white text-2xl font-bold">-18%</div>
                      <div className="text-white/70 text-xs">Coûts d'inventaire</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <div className="text-white text-2xl font-bold">+63%</div>
                      <div className="text-white/70 text-xs">Satisfaction client</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
                  <>
                    <h2 className="font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 text-5xl md:text-6xl font-light leading-tight mb-8">
                      Entrez dans le
                      <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                        Futur de la Distribution
                      </span>
                      <span className="relative inline-block">
                        aujourd'hui
                        <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full"></span>
                      </span>
                    </h2>
                
                    {/* Glass card with better visual hierarchy */}
                    <div className="mt-14 backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-xl shadow-black/5 hover:shadow-2xl hover:bg-white/15 transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-white/15 rounded-2xl">
                          <Logo variant="symbol" size="sm" className="filter drop-shadow-lg" />
                        </div>
                        <div className="ml-5">
                          <div className="text-white/70 text-sm font-medium uppercase tracking-wide">Valeur totale de l'inventaire</div>
                          <div className="text-white text-3xl font-semibold mt-1">1,347,250.00 MAD</div>
                        </div>
                      </div>
                
                      {/* Improved metric cards with hover effects */}
                      <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-5 group hover:bg-white/20 transition-all duration-300">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white/70 text-sm font-medium">Produits</div>
                            <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">
                              <svg className="w-4 h-4 text-emerald-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                          </div>
                          <div className="text-white text-2xl font-semibold group-hover:scale-105 transform transition-transform duration-300">2,546</div>
                        </div>
                        <div className="bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-5 group hover:bg-white/20 transition-all duration-300">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white/70 text-sm font-medium">Fournisseurs</div>
                            <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">
                              <svg className="w-4 h-4 text-teal-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                          </div>
                          <div className="text-white text-2xl font-semibold group-hover:scale-105 transform transition-transform duration-300">128</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}