import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDirections, FaPhone, FaClock } from 'react-icons/fa';
import { AnimatedSection } from './ScrollAnimations';

function WeddingMap() {
  // Replace with actual venue coordinates
  const venueInfo = {
    name: "Nhà Hàng Tiệc Cưới ABC",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    phone: "028 1234 5678", 
    coordinates: {
      lat: 10.7769,
      lng: 106.7009
    },
    hours: "08:00 - 22:00",
    description: "Nhà hàng tiệc cưới sang trọng với không gian thoáng đãng và dịch vụ chuyên nghiệp"
  };

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4955074829547!2d${venueInfo.coordinates.lng}!3d${venueInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzM2LjgiTiAxMDbCsDQyJzAzLjIiRQ!5e0!3m2!1svi!2s!4v1234567890123`;

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