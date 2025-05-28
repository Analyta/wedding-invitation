import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaEnvelope, FaQuoteLeft, FaBook, FaHeart } from 'react-icons/fa';
import Countdown from 'react-countdown';
import confetti from 'canvas-confetti';

// Import new components
import MusicControl from './components/MusicControl';
import { 
  FloatingHearts, 
  HeaderPetalsEffect, 
  HeaderBalloonsEffect, 
  HeaderFireworksEffect, 
  HeaderHeartsEffect,
  FlowerCursorEffect
} from './components/VisualEffects';
import { AnimatedSection, StaggeredContainer, StaggeredItem } from './components/ScrollAnimations';
import WeddingMap from './components/WeddingMap';
import PhotoBooth from './components/PhotoBooth';

import './styles/main.css';

// Import images
import brideImage from './assets/images/avt.jpg';
import groomImage from './assets/images/avt.jpg';

// Demo images - you can replace these with actual photos
const DEMO_BRIDE_IMAGE = brideImage;
const DEMO_GROOM_IMAGE = groomImage;

const DEMO_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
];

// Love quotes for slideshow
const LOVE_QUOTES = [
  "Tình yêu không chỉ là nhìn vào mắt nhau, mà là cùng nhau nhìn về một hướng.",
  "Trong vạn vật, ta chỉ yêu mình em.",
  "Yêu em là điều đẹp nhất đã xảy ra với anh.",
  "Tình yêu đích thực bắt đầu khi không mong đợi điều gì đổi lại.",
  "Em là lý do anh tin vào tình yêu đích thực.",
  "Mỗi ngày bên em đều là một ngày đặc biệt."
];

// Wedding date for countdown
const WEDDING_DATE = new Date('2025-10-11T11:00:00');

// Love Quotes Slideshow
function LoveQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % LOVE_QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedSection className="love-quotes-section">
      <motion.div 
        className="quote-container"
        key={currentQuote}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <FaQuoteLeft className="quote-icon" />
        <p className="quote-text">{LOVE_QUOTES[currentQuote]}</p>
      </motion.div>
    </AnimatedSection>
  );
}

// Countdown Timer
function CountdownTimer() {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className="countdown-completed">
          <h3>🎉 Hôm nay là ngày cưới! 🎉</h3>
        </div>
      );
    } else {
      return (
        <div className="countdown-container">
          <h3 className="countdown-title">⏰ Còn lại bao lâu nữa?</h3>
          <div className="countdown-timer">
            <div className="time-unit">
              <span className="time-number">{days}</span>
              <span className="time-label">Ngày</span>
            </div>
            <div className="time-unit">
              <span className="time-number">{hours}</span>
              <span className="time-label">Giờ</span>
            </div>
            <div className="time-unit">
              <span className="time-number">{minutes}</span>
              <span className="time-label">Phút</span>
            </div>
            <div className="time-unit">
              <span className="time-number">{seconds}</span>
              <span className="time-label">Giây</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return <Countdown date={WEDDING_DATE} renderer={renderer} />;
}

// Guest Book Component
function GuestBook() {
  const [guestMessages, setGuestMessages] = useState([
    { id: 1, name: "Nguyễn Văn A", message: "Chúc hai bạn hạnh phúc mãi mãi!", time: "2 giờ trước" },
    { id: 2, name: "Trần Thị B", message: "Yêu thương và hạnh phúc sẽ theo hai bạn suốt đời!", time: "5 giờ trước" },
    { id: 3, name: "Lê Văn C", message: "Chúc mừng cặp đôi xinh đẹp! 💕", time: "1 ngày trước" }
  ]);
  const [newMessage, setNewMessage] = useState({ name: '', message: '' });

  const addMessage = (e) => {
    e.preventDefault();
    if (newMessage.name && newMessage.message) {
      const message = {
        id: Date.now(),
        name: newMessage.name,
        message: newMessage.message,
        time: "Vừa xong"
      };
      setGuestMessages(prev => [message, ...prev]);
      setNewMessage({ name: '', message: '' });
    }
  };

  return (
    <AnimatedSection className="guest-book-section">
      <motion.h2 
        className="guest-book-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <FaBook /> Sổ lưu bút
      </motion.h2>
      
      <div className="guest-book-container">
        <motion.form 
          className="guest-message-form"
          onSubmit={addMessage}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <input
            type="text"
            placeholder="Tên của bạn"
            value={newMessage.name}
            onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
            required
          />
          <textarea
            placeholder="Gửi lời chúc đến cô dâu chú rể..."
            value={newMessage.message}
            onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
            required
          ></textarea>
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Gửi lời chúc 💌
          </motion.button>
        </motion.form>

        <div className="guest-messages">
          <AnimatePresence>
            {guestMessages.map((msg, index) => (
              <motion.div 
                key={msg.id}
                className="guest-message"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="message-header">
                  <span className="message-name">{msg.name}</span>
                  <span className="message-time">{msg.time}</span>
                </div>
                <p className="message-text">{msg.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Header() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <AnimatedSection className="header" animation="fadeInUp">
      <div className="header-background"></div>
      
      <motion.div 
        className="header-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="title-wrapper"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <motion.h1 
            className="main-title"
            onHoverStart={triggerConfetti}
            whileHover={{ scale: 1.05 }}
          >
            Linh & Yến
          </motion.h1>
          <motion.div 
            className="title-decoration"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <FaHeart className="heart-icon" />
          </motion.div>
        </motion.div>

        <motion.p 
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Chúng mình sẽ kết hôn!
        </motion.p>

        <motion.div 
          className="date-venue"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <motion.div 
            className="date"
            whileHover={{ scale: 1.05 }}
          >
            <FaCalendarAlt /> 11 tháng 10, 2025
          </motion.div>
          <motion.div 
            className="venue"
            whileHover={{ scale: 1.05 }}
          >
            <FaMapMarkerAlt /> Nhà Hàng Tiệc Cưới ABC, TP.HCM
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <CountdownTimer />
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}

function CoupleSection() {
  return (
    <AnimatedSection className="couple-section" animation="fadeInUp">
      <div className="couple-section-background"></div>
      <div className="couple-content">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FaHeart className="title-icon" />
          <h2>Cặp đôi hạnh phúc</h2>
        </motion.div>

        <div className="couple-info">
          <div className="couple-photo-container">
            <motion.div 
              className="photo-container groom"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="photo-frame">
                <img 
                  src={DEMO_GROOM_IMAGE} 
                  alt="Chú rể" 
                  className="couple-photo"
                />
                <div className="photo-overlay">
                  <h3>Chú rể</h3>
                  <p>Linh</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="heart-divider"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHeart className="heart-icon-large" />
            </motion.div>
            
            <motion.div 
              className="photo-container bride"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="photo-frame">
                <img 
                  src={DEMO_BRIDE_IMAGE} 
                  alt="Cô dâu" 
                  className="couple-photo"
                />
                <div className="photo-overlay">
                  <h3>Cô dâu</h3>
                  <p>Mai Yến</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="love-story-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3>Our Story</h3>
            <p className="love-story">
              "Tình yêu không chỉ là nhìn vào mắt nhau, mà là cùng nhau nhìn về một hướng. 
              Chúng mình đã tìm thấy tình yêu đích thực và giờ đây sẵn sàng bước vào cuộc sống mới 
              với nhau. Hãy cùng chúng mình chia sẻ niềm hạnh phúc này!"
            </p>
          </motion.div>
        </div>

        <LoveQuotes />
      </div>
    </AnimatedSection>
  );
}

function Timeline() {
  const timelineData = [
    {
      time: "10:00",
      title: "Lễ ăn hỏi",
      description: "Tại nhà cô dâu"
    },
    {
      time: "14:00", 
      title: "Lễ cưới",
      description: "Nhà Hàng Tiệc Cưới ABC"
    },
    {
      time: "17:00",
      title: "Tiệc cưới",
      description: "Ăn uống và vui chơi cùng gia đình, bạn bè"
    }
  ];

  return (
    <AnimatedSection className="timeline-section" animation="fadeInLeft">
      <motion.h2 
        className="timeline-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Chương trình ngày cưới
      </motion.h2>
      <StaggeredContainer className="timeline" staggerDelay={0.2}>
        {timelineData.map((item, index) => (
          <StaggeredItem key={index} className="timeline-item">
            <div className="timeline-time">{item.time}</div>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </StaggeredItem>
        ))}
      </StaggeredContainer>
    </AnimatedSection>
  );
}

function Gallery() {
  return (
    <AnimatedSection className="gallery-section" animation="scaleIn">
      <motion.h2 
        className="gallery-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Kỷ niệm của chúng mình
      </motion.h2>
      <StaggeredContainer className="gallery-grid" staggerDelay={0.1}>
        {DEMO_GALLERY_IMAGES.map((image, index) => (
          <StaggeredItem key={index} className="gallery-item">
            <motion.div 
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={image} 
                alt={`Kỷ niệm ${index + 1}`} 
                className="gallery-photo"
              />
            </motion.div>
          </StaggeredItem>
        ))}
      </StaggeredContainer>
    </AnimatedSection>
  );
}

function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attendance: '',
    guests: 1,
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    alert('Cảm ơn bạn đã xác nhận! Chúng mình rất mong được gặp bạn trong ngày trọng đại này.');
    console.log('RSVP Data:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatedSection className="rsvp-section" animation="slideInUp">
      <motion.h2 
        className="rsvp-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        💌 Bạn có tham dự cùng chúng mình không?
      </motion.h2>
      
      <motion.p 
        className="rsvp-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        Sự hiện diện của bạn sẽ làm cho ngày cưới của chúng mình thêm ý nghĩa
      </motion.p>

      <motion.form 
        className="rsvp-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">🧑‍💼 Họ và tên *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Vui lòng nhập họ tên"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">📞 Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0123 456 789"
            />
          </div>
        </div>
        
        <div className="form-group attendance-group">
          <label>🎉 Bạn có thể tham dự không? *</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="attendance"
                value="yes"
                checked={formData.attendance === 'yes'}
                onChange={handleChange}
                required
              />
              <span className="radio-custom"></span>
              <span className="radio-text">✅ Có, tôi sẽ đến</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={formData.attendance === 'no'}
                onChange={handleChange}
                required
              />
              <span className="radio-custom"></span>
              <span className="radio-text">❌ Rất tiếc, tôi không thể đến</span>
            </label>
          </div>
        </div>
        
        {formData.attendance === 'yes' && (
          <motion.div 
            className="form-group"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="guests">👥 Số người tham dự</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
            >
              <option value={1}>1 người</option>
              <option value={2}>2 người (có người đi cùng)</option>
              <option value={3}>3 người</option>
              <option value={4}>4+ người</option>
            </select>
          </motion.div>
        )}
        
        <div className="form-group">
          <label htmlFor="message">💝 Lời chúc cho cô dâu chú rể</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Gửi lời chúc mừng đến cô dâu chú rể..."
          ></textarea>
        </div>
        
        <motion.button 
          type="submit" 
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaEnvelope /> Gửi xác nhận
        </motion.button>
      </motion.form>
    </AnimatedSection>
  );
}

function Footer() {
  return (
    <AnimatedSection className="footer" animation="fadeInUp">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="footer-text">
          Cảm ơn bạn đã dành thời gian xem thiệp mời của chúng mình
        </p>
        <div className="footer-hearts">💕 💕 💕</div>
        <p style={{marginTop: '10px', fontSize: '0.9rem', opacity: 0.7}}>
          Với tình yêu, Minh & Hoa
        </p>
      </motion.div>
    </AnimatedSection>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [showMusicControl, setShowMusicControl] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowMusicControl(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-background"></div>
        <motion.div
          className="loading-content"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="loading-rings">
            <motion.div 
              className="loading-ring ring-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="loading-ring ring-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="loading-ring ring-3"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.div
            className="loading-heart-container"
            animate={{ 
              scale: [1, 1.2, 1],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaHeart className="loading-heart" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Đang tải thiệp cưới...
          </motion.p>
          <div className="loading-dots">
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            >.</motion.span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="wedding-invitation">
      <FlowerCursorEffect />
      <AnimatePresence>
        {showMusicControl && <MusicControl />}
      </AnimatePresence>
      
      {/* Global Effects for entire page */}
      <FloatingHearts />
      <HeaderPetalsEffect />
      <HeaderBalloonsEffect />
      <HeaderFireworksEffect />
      <HeaderHeartsEffect />
      
      <Header />
      <CoupleSection />
      <Timeline />
      <Gallery />
      <PhotoBooth />
      <GuestBook />
      <RSVP />
      <WeddingMap />
      <Footer />
    </div>
  );
}

export default App;
