import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

// Nhạc cưới - ưu tiên file local, fallback to online
const MUSIC_SOURCES = [
  "/wedding-music.mp3", // File local trong public folder
  "https://www.bensound.com/bensound-music/bensound-romantic.mp3",
  "https://www.bensound.com/bensound-music/bensound-love.mp3",
  "https://www.bensound.com/bensound-music/bensound-dreams.mp3"
];

function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(0.3);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // Tạo audio element với source đầu tiên
    const audio = new Audio();
    audio.loop = true;
    audio.volume = currentVolume;
    audio.preload = 'auto';
    audio.src = MUSIC_SOURCES[currentSourceIndex];
    
    // Handle lỗi loading
    audio.addEventListener('error', () => {
      console.log(`Không load được: ${MUSIC_SOURCES[currentSourceIndex]}`);
      // Thử source tiếp theo
      if (currentSourceIndex < MUSIC_SOURCES.length - 1) {
        setCurrentSourceIndex(prev => prev + 1);
      }
    });

    audio.addEventListener('canplaythrough', () => {
      console.log(`Đã load thành công: ${MUSIC_SOURCES[currentSourceIndex]}`);
      // Tự động phát khi load xong
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Không thể tự động phát:', err);
      });
    });

    audioRef.current = audio;

    // Cleanup khi component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Cập nhật source khi index thay đổi
  useEffect(() => {
    if (audioRef.current && MUSIC_SOURCES[currentSourceIndex]) {
      audioRef.current.src = MUSIC_SOURCES[currentSourceIndex];
      audioRef.current.load();
    }
  }, [currentSourceIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    // Tự động phát nhạc nếu có thể
    const tryPlay = () => {
      if (!audioRef.current) return;
      if (!isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(() => {});
        }
      }
    };
    // Thử phát nhạc khi load
    tryPlay();
    // Nếu bị chặn, phát khi có bất kỳ tương tác nào
    const events = ['pointerdown', 'touchstart', 'keydown', 'scroll'];
    events.forEach(evt => window.addEventListener(evt, tryPlay, { once: true }));
    return () => {
      events.forEach(evt => window.removeEventListener(evt, tryPlay));
    };
  }, [currentSourceIndex]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Thử phát nhạc
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Lỗi phát nhạc:', error);
      // Thử source tiếp theo nếu có
      if (currentSourceIndex < MUSIC_SOURCES.length - 1) {
        setCurrentSourceIndex(prev => prev + 1);
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.volume = currentVolume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  useEffect(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = currentVolume;
    }
  }, [currentVolume, isMuted]);

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