import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './VisualEffects.css';

// Header Petals Effect - Only in header
export function HeaderPetalsEffect() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const createPetal = () => {
      const petal = {
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        rotation: Math.random() * 360,
        color: ['🌸', '🌺', '🌷', '🌹', '💐', '🏵️', '🌻'][Math.floor(Math.random() * 7)],
        size: Math.random() * 15 + 20
      };
      setPetals(prev => [...prev, petal]);
      
      setTimeout(() => {
        setPetals(prev => prev.filter(p => p.id !== petal.id));
      }, petal.animationDuration * 1000);
    };

    const interval = setInterval(createPetal, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-petals-effect">
      <AnimatePresence>
        {petals.map(petal => (
          <motion.div
            key={petal.id}
            className="header-petal"
            style={{
              left: `${petal.left}%`,
              opacity: petal.opacity,
              fontSize: `${petal.size}px`
            }}
            initial={{ y: -50, rotate: petal.rotation }}
            animate={{ 
              y: '120vh', 
              rotate: petal.rotation + 360,
              x: [0, 30, -30, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: petal.animationDuration, 
              ease: 'easeInOut',
              x: { repeat: Infinity, duration: 2 }
            }}
          >
            {petal.color}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Header Balloons Effect - Only in header
export function HeaderBalloonsEffect() {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const createBalloon = () => {
      const balloon = {
        id: Math.random(),
        left: Math.random() * 90,
        animationDuration: Math.random() * 4 + 3,
        color: ['🎈', '🎉', '🎊', '🪅', '🎁', '🎀'][Math.floor(Math.random() * 6)],
        size: Math.random() * 20 + 25
      };
      setBalloons(prev => [...prev, balloon]);
      
      setTimeout(() => {
        setBalloons(prev => prev.filter(b => b.id !== balloon.id));
      }, balloon.animationDuration * 1000);
    };

    const interval = setInterval(createBalloon, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-balloons-effect">
      <AnimatePresence>
        {balloons.map(balloon => (
          <motion.div
            key={balloon.id}
            className="header-balloon"
            style={{
              left: `${balloon.left}%`,
              fontSize: `${balloon.size}px`
            }}
            initial={{ y: '120vh', rotate: 0 }}
            animate={{ 
              y: '-100vh', 
              rotate: [0, 10, -10, 0],
              x: [0, 20, -20, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: balloon.animationDuration, 
              ease: 'easeOut',
              rotate: { repeat: Infinity, duration: 3 },
              x: { repeat: Infinity, duration: 2 }
            }}
          >
            {balloon.color}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Header Fireworks Effect - Only in header
export function HeaderFireworksEffect() {
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    const createFirework = () => {
      const firework = {
        id: Math.random(),
        left: Math.random() * 60 + 20,
        top: Math.random() * 40 + 20,
        particles: Array.from({ length: 15 }, (_, i) => ({
          id: i,
          angle: (i * 24) * (Math.PI / 180),
          color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3', '#a8e6cf', '#fd79a8', '#00cec9'][Math.floor(Math.random() * 8)]
        }))
      };
      
      setFireworks(prev => [...prev, firework]);
      
      setTimeout(() => {
        setFireworks(prev => prev.filter(f => f.id !== firework.id));
      }, 2500);
    };

    const interval = setInterval(createFirework, 2000);
    // Create initial firework after 1 second
    setTimeout(createFirework, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-fireworks-effect">
      <AnimatePresence>
        {fireworks.map(firework => (
          <div
            key={firework.id}
            className="header-firework"
            style={{
              left: `${firework.left}%`,
              top: `${firework.top}%`
            }}
          >
            {firework.particles.map(particle => (
              <motion.div
                key={particle.id}
                className="header-firework-particle"
                style={{ backgroundColor: particle.color }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(particle.angle) * 150,
                  y: Math.sin(particle.angle) * 150,
                  opacity: 0,
                  scale: 0
                }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
              />
            ))}
            {/* Center burst */}
            <motion.div
              className="header-firework-center"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Header Hearts Effect - Only in header
export function HeaderHeartsEffect() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const createHeart = () => {
      const heart = {
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.8 + 0.4,
        size: Math.random() * 20 + 15,
        color: ['💕', '💖', '💗', '💝', '❤️', '💘', '💜', '💙'][Math.floor(Math.random() * 8)]
      };
      setHearts(prev => [...prev, heart]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== heart.id));
      }, heart.animationDuration * 1000);
    };

    const interval = setInterval(createHeart, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-hearts-effect">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="header-heart"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              opacity: heart.opacity
            }}
            initial={{ y: '120vh', rotate: 0, scale: 0 }}
            animate={{ 
              y: '-100vh', 
              rotate: 360,
              scale: [0, 1, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: heart.animationDuration, 
              ease: 'easeInOut',
              scale: { times: [0, 0.2, 0.8, 1] }
            }}
          >
            {heart.color}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Keep original effects for backward compatibility but make them less frequent
export function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const createHeart = () => {
      const heart = {
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: Math.random() * 4 + 3,
        opacity: Math.random() * 0.3 + 0.2,
        size: Math.random() * 15 + 8
      };
      setHearts(prev => [...prev, heart]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== heart.id));
      }, heart.animationDuration * 1000);
    };

    const interval = setInterval(createHeart, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              opacity: heart.opacity
            }}
            initial={{ y: '100vh', rotate: 0 }}
            animate={{ y: '-100vh', rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: heart.animationDuration, ease: 'linear' }}
          >
            💕
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Remove other effects or make them minimal
export function PetalsEffect() { return null; }
export function BalloonsEffect() { return null; }
export function FireworksEffect() { return null; }
export function ScrollSparkles() { return null; }

const SVG_FLOWERS = [
  // Hoa hồng pastel
  `<svg width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='13' fill='#ffe0ec'/><ellipse cx='16' cy='16' rx='8' ry='10' fill='#ffb6c1'/><ellipse cx='16' cy='16' rx='4' ry='5' fill='#fff'/></svg>`,
  // Hoa hướng dương
  `<svg width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='7' fill='#ffe066'/><circle cx='16' cy='16' r='4' fill='#ffb347'/><g><ellipse cx='16' cy='6' rx='3' ry='6' fill='#ffe066' transform='rotate(0 16 16)'/><ellipse cx='16' cy='6' rx='3' ry='6' fill='#ffe066' transform='rotate(45 16 16)'/><ellipse cx='16' cy='6' rx='3' ry='6' fill='#ffe066' transform='rotate(90 16 16)'/><ellipse cx='16' cy='6' rx='3' ry='6' fill='#ffe066' transform='rotate(135 16 16)'/></g></svg>`,
  // Hoa cúc trắng
  `<svg width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='6' fill='#fff'/><circle cx='16' cy='16' r='3' fill='#ffe066'/><g><ellipse cx='16' cy='6' rx='2' ry='6' fill='#fff' transform='rotate(0 16 16)'/><ellipse cx='16' cy='6' rx='2' ry='6' fill='#fff' transform='rotate(45 16 16)'/><ellipse cx='16' cy='6' rx='2' ry='6' fill='#fff' transform='rotate(90 16 16)'/><ellipse cx='16' cy='6' rx='2' ry='6' fill='#fff' transform='rotate(135 16 16)'/></g></svg>`
];

export function FlowerCursorEffect() {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      if (window.innerWidth < 768) return; // chỉ desktop
      const flower = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        svg: SVG_FLOWERS[Math.floor(Math.random()*SVG_FLOWERS.length)],
        size: Math.random()*10+24
      };
      setFlowers(f => [...f, flower]);
      setTimeout(() => {
        setFlowers(f => f.filter(fl => fl.id !== flower.id));
      }, 700);
    };
    const handleTouch = (e) => {
      if (!e.touches || !e.touches[0]) return;
      const t = e.touches[0];
      const flower = {
        id: Math.random(),
        x: t.clientX,
        y: t.clientY,
        svg: SVG_FLOWERS[Math.floor(Math.random()*SVG_FLOWERS.length)],
        size: Math.random()*10+28
      };
      setFlowers(f => [...f, flower]);
      setTimeout(() => {
        setFlowers(f => f.filter(fl => fl.id !== flower.id));
      }, 700);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleTouch);
    window.addEventListener('touchstart', handleTouch);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  return (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',pointerEvents:'none',zIndex:1200}}>
      {flowers.map(f => (
        <span key={f.id} style={{position:'absolute',left:f.x,top:f.y,transform:'translate(-50%,-50%)',width:f.size,height:f.size,display:'inline-block',pointerEvents:'none',userSelect:'none',filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.10))'}} dangerouslySetInnerHTML={{__html:f.svg}} />
      ))}
    </div>
  );
} 