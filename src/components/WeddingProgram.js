import React from 'react';
import { motion } from 'framer-motion';
import { FaGlassCheers, FaUtensils, FaMusic } from 'react-icons/fa';
import { AnimatedSection } from './ScrollAnimations';

const WeddingProgram = () => {
  const programItems = [
    {
      icon: <FaGlassCheers />,
      title: "Lễ Đính Hôn",
      time: "10:00",
      description: "Nghi thức trao nhẫn và chụp ảnh"
    },
    {
      icon: <FaUtensils />,
      title: "Tiệc Trưa",
      time: "11:30",
      description: "Thưởng thức bữa tiệc thân mật"
    },
    {
      icon: <FaMusic />,
      title: "Giao Lưu",
      time: "13:00",
      description: "Chương trình văn nghệ và giao lưu"
    }
  ];

  return (
    <AnimatedSection className="program-section">
      <div className="program-container">
        <motion.h2 
          className="program-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Chương Trình
        </motion.h2>

        <div className="program-timeline">
          {programItems.map((item, index) => (
            <motion.div
              key={index}
              className="program-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="program-icon">
                {item.icon}
              </div>
              <div className="program-content">
                <h3>{item.title}</h3>
                <div className="program-time">{item.time}</div>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="program-note"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p>💝 Rất mong được đón tiếp quý khách!</p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default WeddingProgram; 