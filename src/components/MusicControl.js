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
  const audioRef = useRef(new Audio(wedding));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.3;

    // Hàm xử lý tương tác người dùng
    const handleUserInteraction = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        // Xóa event listeners sau khi phát thành công
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      } catch (error) {
        console.log('Vẫn không thể phát nhạc:', error);
      }
    };

    // Thử phát nhạc khi component mount
    const tryAutoPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Không thể tự động phát nhạc:', error);
        // Nếu bị chặn, thử phát khi có tương tác người dùng
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);
      }
    };

    tryAutoPlay();

    // Cleanup khi component unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.log('Không thể phát nhạc:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.volume = isMuted ? 0.3 : 0;
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
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </motion.button>

        <motion.button 
          className="music-btn volume-btn"
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={isMuted ? "Tắt âm thanh" : "Bật âm thanh"}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

export default MusicControl; 