const StatCard = ({ icon: Icon, title, value, iconColor }) => {
  return (
    <div className="bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-5 group hover:bg-white/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="text-white/70 text-sm font-medium">{title}</div>
        <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
      </div>
      <div className="text-white text-2xl font-semibold group-hover:scale-105 transform transition-transform duration-300">
        {value}
      </div>
    </div>
  );
};

export default StatCard;