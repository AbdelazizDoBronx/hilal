const Logo = ({ variant = 'default', size = 'md', className = '' }) => {
  const logos = {
    default: '/images/logos/Untitled-2-05.png',
    dark: '/images/logos/Untitled-2-02.png',
    light: '/images/logos/Untitled-2-04.png',
    minimal: '/images/logos/Untitled-2-08.png',
    symbol: '/images/logos/Untitled-2-06.png',
    symbol_only: "/images/logos/Untitled-2-03.png",
    full_logo: "/images/logos/Untitled-2-01.png",
    text_only: "/images/logos/Untitled-2-07.png",
  };

  
  const sizes = {
    sm: 'h-12', 
    md: 'h-20', 
    lg: 'h-36',  
    xl: 'h-44',  
    '2xl': 'h-52', 
    '3xl': 'h-60', 
    '4xl': 'h-72', 
  };

  const selectedLogo = logos[variant] || logos.default;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <div className={`${className} flex items-center justify-center`}>
      <img 
        src={selectedLogo || "/placeholder.svg"} 
        alt="AlHilal Distribution" 
        className={`${sizeClass} w-auto object-contain transition-all duration-300`}
      />
    </div>
  );
};

export default Logo;
