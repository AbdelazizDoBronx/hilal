import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import StatCard from '../ui/StatCard';
import Logo from '../ui/Logo';
import { Package, TrendingUp } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <GlassCard isDark className="p-6">
    <div className="w-12 h-12 flex items-center justify-center bg-white/15 rounded-xl mb-4">
      <Icon className="w-6 h-6 text-blue-300" />
    </div>
    <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
    <p className="text-white/70 text-sm">{description}</p>
  </GlassCard>
);

const MetricCard = ({ value, label }) => (
  <div className="bg-white/10 rounded-xl p-4 text-center">
    <div className="text-white text-2xl font-bold">{value}</div>
    <div className="text-white/70 text-xs">{label}</div>
  </div>
);

export const RegisterContent = () => (
  <>
    <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight mb-4">
      Rejoignez <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-violet-300">l'avenir</span> de la distribution
    </h2>
    
    <p className="text-white/80 text-xl mb-8 leading-relaxed">
      Créez votre compte et transformez votre expérience de gestion d'inventaire dès aujourd'hui.
    </p>
    
    <div className="grid grid-cols-2 gap-6 mt-8">
      <FeatureCard
        icon={TrendingUp}
        title="Rapide et Efficace"
        description="Gérez votre inventaire en temps réel avec des mises à jour instantanées"
      />
      <FeatureCard
        icon={Package}
        title="Analyses Avancées"
        description="Obtenez des insights précieux sur votre chaîne d'approvisionnement"
      />
    </div>
    
    <GlassCard isDark className="mt-6 p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Impact commercial prouvé</h3>
      <div className="grid grid-cols-3 gap-4">
        <MetricCard value="+42%" label="Efficacité opérationnelle" />
        <MetricCard value="-18%" label="Coûts d'inventaire" />
        <MetricCard value="+63%" label="Satisfaction client" />
      </div>
    </GlassCard>
  </>
);

export const LoginContent = () => (
  <>
    <h2 className="font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 text-5xl md:text-6xl font-light leading-tight mb-8">
      Entrez dans le
      <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
        Futur de la Distribution
      </span>
      <span className="relative inline-block text-white">
        aujourd'hui
        <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full"></span>
      </span>
    </h2>

    <GlassCard isDark hover className="mt-14 p-8">
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-14 h-14 bg-white/15 rounded-2xl">
          <Logo variant="symbol" size="sm" className="filter drop-shadow-lg" />
        </div>
        <div className="ml-5">
          <div className="text-white/70 text-sm font-medium uppercase tracking-wide">
            Valeur totale de l'inventaire
          </div>
          <div className="text-white text-3xl font-semibold mt-1">
            1,347,250.00 MAD
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <StatCard
          icon={Package}
          title="Produits"
          value="2,546"
          iconColor="text-emerald-300"
        />
        <StatCard
          icon={TrendingUp}
          title="Fournisseurs"
          value="128"
          iconColor="text-teal-300"
        />
      </div>
    </GlassCard>
  </>
);