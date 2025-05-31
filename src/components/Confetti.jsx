import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

/**
 * Componente para exibir animação de confete
 * @param {Object} props 
 * @param {boolean} props.trigger - Se verdadeiro, dispara a animação 
 * @param {number} props.duration - Duração da animação em milissegundos
 * @param {function} props.onComplete - Callback quando a animação terminar
 */
const Confetti = ({ trigger = false, duration = 3000, onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true);
      
      const end = Date.now() + duration;
      
      // Função para criar um canhão de confete
      const createConfettiCannon = (particleRatio, opts) => {
        confetti({
          ...opts,
          origin: { y: 0.7 },
          particleCount: Math.floor(200 * particleRatio)
        });
      };
      
      // Função para executar a animação em loop
      const runAnimation = () => {
        const now = Date.now();
        
        if (now < end) {
          // Disparar diferentes cores e formas de confete
          createConfettiCannon(0.25, { spread: 26, startVelocity: 55 });
          createConfettiCannon(0.2, { spread: 60 });
          createConfettiCannon(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
          createConfettiCannon(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
          createConfettiCannon(0.1, { spread: 120, startVelocity: 45 });
          
          // Continuar a animação
          requestAnimationFrame(runAnimation);
        } else {
          setIsActive(false);
          if (onComplete) {
            onComplete();
          }
        }
      };
      
      // Iniciar a animação
      runAnimation();
    }
  }, [trigger, duration, isActive, onComplete]);
  
  return null; // Este componente não renderiza elementos visíveis
};

export default Confetti;