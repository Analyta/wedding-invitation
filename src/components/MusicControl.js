import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import wedding from '../assets/wedding.mp3';

// Nhạc cưới - ưu tiên file local, fallback to online
const MUSIC_SOURCES = [
  wedding, // File local trong public folder
];

function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Khởi tạo audio khi component mount
    const audio = new Audio();
    audio.src = wedding;
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'auto';

    // Xử lý sự kiện khi audio đã tải xong
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });

    audioRef.current = audio;

    // Hàm xử lý tương tác người dùng
    const handleUserInteraction = async () => {
      if (!isLoaded) return;
      try {
        await audio.play();
        setIsPlaying(true);
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      } catch (error) {
        console.log('Không thể phát nhạc:', error);
      }
    };

    // Thử phát nhạc khi component mount
    const tryAutoPlay = async () => {
      if (!isLoaded) return;
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Không thể tự động phát nhạc:', error);
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);
      }
    };

    // Thử phát nhạc khi đã tải xong
    if (isLoaded) {
      tryAutoPlay();
    }

    // Cleanup khi component unmount
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.removeEventListener('canplaythrough', () => {});
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [isLoaded]);

  const togglePlay = () => {
    if (!audioRef.current || !isLoaded) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.log('Không thể phát nhạc:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current || !isLoaded) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="music-controls"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button 
          className="music-btn play-btn"
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
          disabled={!isLoaded}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </motion.button>

        <motion.button 
          className="music-btn volume-btn"
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={isMuted ? "Tắt âm thanh" : "Bật âm thanh"}
          disabled={!isLoaded}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

export default MusicControl; 