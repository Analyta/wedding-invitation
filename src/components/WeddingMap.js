import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDirections, FaPhone, FaClock } from 'react-icons/fa';
import { AnimatedSection } from './ScrollAnimations';

function WeddingMap() {
  // Replace with actual venue coordinates
  const venueInfo = {
    name: "Nhà Mai Yến",
    address: "Vĩnh Tân, Tân Uyên, Bình Dương",
    phone: "033 4993 356", 
    coordinates: {
      lat: 11.130572324138944,
      lng: 106.72397644452428
    },
    hours: "08:00 - 22:00",
    description: "Địa điểm tổ chức lễ đính hôn"
  };

  // Sử dụng URL embed với Plus Code
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1234567890123!2d106.72397644452428!3d11.130572324138944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA3JzUwLjEiTiAxMDbCsDQzJzMzLjQiRQ!5e0!3m2!1svi!2s!4v1748666752296!5m2!1svi!2s&q=4PJG%2B69F%20T%C3%A2n%20Uy%C3%AAn%2C%20B%C3%ACnh%20D%C6%B0%C6%A1ng%2C%20Vi%E1%BB%87t%20Nam";

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${venueInfo.coordinates.lat},${venueInfo.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatedSection className="map-section">
      <div className="map-container">
        <motion.h2 
          className="map-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FaMapMarkerAlt /> Địa điểm tổ chức
        </motion.h2>

        <div className="map-content">
          <motion.div 
            className="map-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="venue-details">
              <h3 className="venue-name">{venueInfo.name}</h3>
              <p className="venue-description">{venueInfo.description}</p>
              
              <div className="venue-info-grid">
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <strong>Địa chỉ:</strong>
                    <p>{venueInfo.address}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <FaPhone className="info-icon" />
                  <div>
                    <strong>Điện thoại:</strong>
                    <p>{venueInfo.phone}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <FaClock className="info-icon" />
                  <div>
                    <strong>Giờ mở cửa:</strong>
                    <p>{venueInfo.hours}</p>
                  </div>
                </div>
              </div>

              <motion.button 
                className="directions-btn"
                onClick={openDirections}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDirections /> Chỉ đường
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="map-embed"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <iframe
              src={mapSrc}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ địa điểm cưới"
            ></iframe>
          </motion.div>
        </div>

        <motion.div 
          className="map-note"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p>💡 <strong>Lưu ý:</strong> Có bãi đỗ xe miễn phí cho khách mời. Vui lòng đến đúng giờ để không bỏ lỡ những khoảnh khắc đặc biệt!</p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

export default WeddingMap; 