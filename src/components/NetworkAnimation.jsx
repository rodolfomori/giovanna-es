import React, { useEffect, useRef } from 'react';

const NetworkAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas reference not found');
      return;
    }

    console.log('Animation component mounted, initializing canvas...');
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    // Debug: Add a colored background to check visibility
    console.log('Setting debug background color to canvas');
    canvas.style.backgroundColor = 'rgba(0, 255, 0, 0.05)';

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(`Canvas dimensions set: ${canvas.width}x${canvas.height}`);

    let particles = [];
    let animationFrameId;

    // Create particles
    const createParticles = () => {
      console.log('Creating particles');
      particles = [];
      const count = 40; // Fixed number for debugging
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 3, // Larger for visibility
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
      console.log(`Created ${particles.length} particles`);
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw debug frame for visibility
      ctx.strokeStyle = 'rgba(255,0,0,0.3)';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      
      // Draw text to confirm rendering
      ctx.fillStyle = 'rgba(55, 227, 89, 0.5)';
      ctx.font = '20px Arial';

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Boundary checking with bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(55, 227, 89, 0.9)';
        ctx.fill();
        
        // Connect nearby particles with lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(55, 227, 89, 0.3)';
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = window.requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      console.log('Window resized, adjusting canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };
    
    // Initialize and start animation
    createParticles();
    animate();
    console.log('Animation started');
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      console.log('Cleaning up animation');
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default NetworkAnimation;