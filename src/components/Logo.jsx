import React from 'react';

const Logo = ({ size = 'md', animated = false, className = '' }) => {
  // Determinar tamanho com base no prop
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const animationClass = animated ? 'animate-float' : '';

  return (
    <div className={`relative ${sizeClass} ${animationClass} ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full" 
        fill="#37E359" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Logo DevClub baseada na imagem fornecida */}
        <rect x="13" y="14" width="24" height="24" />
        <rect x="19" y="20" width="12" height="12" fill="currentColor" className="text-white dark:text-secondary" />
        <rect x="38" y="14" width="10" height="10" />
        <rect x="49" y="14" width="20" height="10" />
        <rect x="70" y="14" width="10" height="10" />
        <rect x="81" y="14" width="6" height="38" />
        <rect x="38" y="25" width="53" height="12" />
        <rect x="81" y="38" width="6" height="10" />
        
        <rect x="13" y="39" width="6" height="28" />
        <rect x="13" y="68" width="6" height="6" />
        <rect x="20" y="39" width="24" height="10" />
        <rect x="20" y="49" width="6" height="15" />
        <rect x="36" y="49" width="8" height="15" />
        
        <rect x="50" y="39" width="24" height="10" />
        <rect x="50" y="49" width="8" height="15" />
        <rect x="66" y="49" width="8" height="15" />
        <rect x="74" y="39" width="6" height="28" />
        
        <rect x="13" y="80" width="6" height="6" />
        <rect x="19" y="86" width="6" height="6" />
        <rect x="25" y="92" width="6" height="6" />
        
        <rect x="38" y="80" width="6" height="6" />
        <rect x="44" y="86" width="6" height="6" />
        <rect x="50" y="92" width="6" height="6" />
        
        <rect x="63" y="80" width="6" height="6" />
        <rect x="69" y="86" width="6" height="6" />
        <rect x="75" y="92" width="6" height="6" />
        
        <rect x="88" y="80" width="12" height="12" />
        <rect x="94" y="86" width="0" height="0" />
        <rect x="94" y="86" width="0" height="0" />
      </svg>
    </div>
  );
};

export default Logo;