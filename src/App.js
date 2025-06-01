import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaQuoteLeft, FaBook, FaHeart, FaEdit, FaListUl } from 'react-icons/fa';
import Countdown from 'react-countdown';
import confetti from 'canvas-confetti';
import { ref, push, onValue, set } from 'firebase/database';
import { database } from './firebase';

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

import './styles/main.css';

// Import images
import brideImage from './assets/images/avt_yen.jpg';
import groomImage from './assets/images/avt_linh.jpg';
import ac1 from './assets/images/ac1.jpg';
import ac2 from './assets/images/ac2.jpg';
import ac3 from './assets/images/ac3.jpg';
import ac4 from './assets/images/ac4.jpg';
import ac5 from './assets/images/ac5.jpg';
import ac6 from './assets/images/ac6.jpg';

// Demo images - you can replace these with actual photos
const DEMO_BRIDE_IMAGE = brideImage;
const DEMO_GROOM_IMAGE = groomImage;

const DEMO_GALLERY_IMAGES = [
  ac1,
  ac2,
  ac3,
  ac4,
  ac5,
  ac6
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
const WEDDING_DATE = new Date('2025-06-14T11:00:00');

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
        <motion.div 
          className="countdown-completed"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [-5, 5, -5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎉 Hôm nay là ngày cưới! 🎉
          </motion.h3>
        </motion.div>
      );
    } else {
      return (
        <motion.div 
          className="countdown-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="countdown-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ⏰ Còn lại bao lâu nữa?
          </motion.h3>
          <motion.div 
            className="countdown-timer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="time-unit"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="time-number"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {days}
              </motion.span>
              <span className="time-label">Ngày</span>
            </motion.div>
            <motion.div 
              className="time-unit"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="time-number"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                {hours}
              </motion.span>
              <span className="time-label">Giờ</span>
            </motion.div>
            <motion.div 
              className="time-unit"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="time-number"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                {minutes}
              </motion.span>
              <span className="time-label">Phút</span>
            </motion.div>
            <motion.div 
              className="time-unit"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="time-number"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                {seconds}
              </motion.span>
              <span className="time-label">Giây</span>
            </motion.div>
          </motion.div>
        </motion.div>
      );
    }
  };

  return <Countdown date={WEDDING_DATE} renderer={renderer} />;
}

// Guest Book Component
function GuestBook() {
  const [guestMessages, setGuestMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ name: '', message: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.entries(data).map(([id, message]) => ({
          id,
          ...message
        })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setGuestMessages(messages);
      }
    });
    return () => unsubscribe();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} giờ trước`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} ngày trước`;
    }
  };

  const addMessage = async (e) => {
    e.preventDefault();
    if (newMessage.name && newMessage.message) {
      setIsSubmitting(true);
      setError('');
      try {
        const messagesRef = ref(database, 'messages');
        const newMessageRef = push(messagesRef);
        await set(newMessageRef, {
          name: newMessage.name,
          message: newMessage.message,
          timestamp: new Date().toISOString()
        });
        setNewMessage({ name: '', message: '' });
        alert('Gửi lời chúc thành công! 💝');
      } catch (error) {
        setError('Không thể gửi tin nhắn. Vui lòng thử lại sau.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const filteredMessages = guestMessages.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pastel color palette for cards
  const pastelColors = [
    '#fff6fa', '#f8e1f4', '#e3f6fd', '#fef6e4', '#e4f9f5', '#f3e8ff', '#f9fbe7'
  ];

  return (
    <section className="guest-book-section">
      <div className="guest-book-title">
        <FaBook style={{ fontSize: '2rem', color: '#a29bfe', marginBottom: '0.5rem', verticalAlign: 'middle' }} />
        <span style={{ marginLeft: 8 }}>Sổ lưu bút</span>
      </div>
      <div className="guest-book-search" style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <input
          type="text"
          className="guest-book-search-input"
          placeholder="Tìm kiếm lời chúc..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ maxWidth: 400, width: '100%' }}
        />
      </div>
      {error && <div className="guest-book-error">{error}</div>}
      <div className="guest-book-flex">
        <form className="guest-message-form" onSubmit={addMessage}>
          <div className="guest-book-subtitle" style={{textAlign:'center'}}>
            <FaEdit className="subtitle-icon" /> Gửi lời chúc
          </div>
          <div className="guest-book-form-fields">
            <input
              type="text"
              className="guest-book-input"
              placeholder="Tên của bạn"
              value={newMessage.name}
              onChange={e => setNewMessage({ ...newMessage, name: e.target.value })}
              required
            />
            <textarea
              className="guest-book-textarea"
              placeholder="Gửi lời chúc đến cô dâu chú rể..."
              value={newMessage.message}
              onChange={e => setNewMessage({ ...newMessage, message: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="guest-book-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi lời chúc 💌'}
          </button>
        </form>
        <div className="guest-messages">
          <div className="guest-book-subtitle" style={{textAlign:'center'}}>
            <FaListUl className="subtitle-icon" /> Danh sách lời chúc
          </div>
          <div className="guest-messages-list">
            {filteredMessages.length === 0 && (
              <div className="guest-empty">Chưa có lời chúc nào.</div>
            )}
            {filteredMessages.map((msg, idx) => (
              <div
                className="guest-message"
                key={msg.id}
                style={{ '--card-bg': pastelColors[idx % pastelColors.length] }}
              >
                <div className="message-header">
                  <span className="message-name">{msg.name}</span>
                  <span className="message-time">{formatTimestamp(msg.timestamp)}</span>
                </div>
                <div className="message-text">{msg.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
            Mai Yến & Tuấn Linh
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
            <FaCalendarAlt /> 14 tháng 6, 2025
          </motion.div>
          <motion.div 
            className="venue"
            whileHover={{ scale: 1.05 }}
          >
            <FaMapMarkerAlt /> Nhà Mai Yến (Vĩnh Tân, Tân Uyên, Bình Dương)
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
                  <p>Tuấn Linh</p>
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
              "Cả nhà ơi, giật mình chưa? Mai Yến chính thức "tạm biệt em yêu độc thân" vào ngày 14/6/2025.
               Nay Mai Yến đã sẵn sàng "chốt kèo" để phiêu lưu vào thế giới "có đôi có cặp". 
               Mời mọi người đến tiệc vui cùng Mai Yến và Tuấn Linh nha. Mãi yêu mọi người ❤️"
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
      time: "11:00", 
      title: "Tiệc mừng",
      description: "Nhà Mai Yến (Vĩnh Tân, Tân Uyên, Bình Dương)"
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
          Với tình yêu, Mai Yến & Tuấn Linh
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
      <GuestBook />
      <WeddingMap />
      <Footer />
    </div>
  );
}

export default App; 