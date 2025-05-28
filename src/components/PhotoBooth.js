import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFacebook } from 'react-icons/fa';

const PREVIEW_WIDTH = 420;
const PREVIEW_HEIGHT = 560;
const DEFAULT_NAMES = 'Cô Dâu & Chú Rể - 2024';

function PhotoBooth() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [hasResult, setHasResult] = useState(false);
  const canvasRef = useRef(null);

  // Xử lý upload ảnh
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target.result);
      setHasResult(true);
      setTimeout(() => drawWeddingFrame(ev.target.result), 0);
    };
    reader.readAsDataURL(file);
  };

  // Vẽ khung cưới mới: viền vàng kim bo tròn, 4 góc trái tim, trên nhẫn cưới, dưới tên
  const drawWeddingFrame = (imgSrc) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    img.onload = () => {
      // Clear
      ctx.clearRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);
      // Nền trắng
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);
      // Vẽ ảnh người dùng (giữ tỉ lệ, crop vừa khung)
      const border = 32;
      const frameW = PREVIEW_WIDTH - border * 2;
      const frameH = PREVIEW_HEIGHT - border * 2 - 40;
      const scale = Math.max(frameW / img.width, frameH / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = border + (frameW - w) / 2;
      const y = border + 20 + (frameH - h) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(border + 20, border + 20);
      ctx.lineTo(PREVIEW_WIDTH - border - 20, border + 20);
      ctx.lineTo(PREVIEW_WIDTH - border - 20, PREVIEW_HEIGHT - border - 20);
      ctx.lineTo(border + 20, PREVIEW_HEIGHT - border - 20);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x, y, w, h);
      ctx.restore();
      // Viền vàng kim bo tròn
      ctx.save();
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 10;
      ctx.shadowColor = '#fffde7';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.roundRect(border, border + 20, PREVIEW_WIDTH - border * 2, PREVIEW_HEIGHT - border * 2 - 40, 32);
      ctx.stroke();
      ctx.restore();
      // 4 góc icon trái tim 💛
      ctx.save();
      ctx.font = '28px serif';
      ctx.fillText('💛', border - 8, border + 36);
      ctx.fillText('💛', PREVIEW_WIDTH - border - 24, border + 36);
      ctx.fillText('💛', border - 8, PREVIEW_HEIGHT - border - 8);
      ctx.fillText('💛', PREVIEW_WIDTH - border - 24, PREVIEW_HEIGHT - border - 8);
      ctx.restore();
      // Icon nhẫn cưới ở trên
      ctx.save();
      ctx.font = '32px serif';
      ctx.textAlign = 'center';
      ctx.fillText('💍', PREVIEW_WIDTH / 2, border + 8);
      ctx.restore();
      // Tên cô dâu chú rể ở dưới
      ctx.save();
      ctx.font = 'bold 22px serif';
      ctx.fillStyle = '#b8860b';
      ctx.textAlign = 'center';
      ctx.fillText(DEFAULT_NAMES, PREVIEW_WIDTH / 2, PREVIEW_HEIGHT - 12);
      ctx.restore();
    };
    img.src = imgSrc;
  };

  // Tải về
  const downloadPhoto = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `wedding-photo-${new Date().getTime()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  // Chia sẻ Facebook
  const shareFacebook = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=`,
      '_blank'
    );
  };

  // Quay lại
  const reset = () => {
    setUploadedImage(null);
    setHasResult(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);
    }
  };

  return (
    <div className="photo-booth-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="photo-booth-container" style={{ maxWidth: 600, width: '100%' }}>
        <h2 className="section-title" style={{ textAlign: 'center', fontSize: 32, marginBottom: 8 }}>Photo Booth Kỷ Niệm</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', color: '#b8860b', fontSize: 18, marginBottom: 32 }}>Tải ảnh của bạn lên và nhận khung cưới sang trọng!</p>
        <div className="photo-booth-content" style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', padding: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="camera-view" style={{ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT, margin: '0 auto', background: '#fff', borderRadius: 32, boxShadow: '0 2px 16px rgba(255,215,0,0.08)' }}>
              <canvas ref={canvasRef} className="captured-image" width={PREVIEW_WIDTH} height={PREVIEW_HEIGHT} style={{ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT, borderRadius: 32 }} />
            </div>
            <div className="action-buttons" style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
              {!hasResult && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-photo-input"
                    onChange={handleUpload}
                  />
                  <motion.label
                    htmlFor="upload-photo-input"
                    className="capture-btn"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ fontSize: 18, padding: '1rem 2.5rem', background: 'linear-gradient(90deg,#ffd700,#fffbe7)', color: '#b8860b', borderRadius: 24, fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px #fffde7' }}
                  >
                    Chọn ảnh từ máy
                  </motion.label>
                </>
              )}
              {hasResult && (
                <>
                  <motion.button
                    className="download-btn"
                    onClick={downloadPhoto}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ fontSize: 18, padding: '1rem 2.5rem', background: 'linear-gradient(90deg,#ffd700,#fffbe7)', color: '#b8860b', borderRadius: 24, fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px #fffde7', border: 'none' }}
                  >
                    <FaDownload style={{ marginRight: 8 }} /> Tải về
                  </motion.button>
                  <motion.button
                    className="download-btn"
                    onClick={shareFacebook}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ fontSize: 18, padding: '1rem 2.5rem', background: 'linear-gradient(90deg,#3b5998,#8b9dc3)', color: '#fff', borderRadius: 24, fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px #8b9dc3', border: 'none' }}
                  >
                    <FaFacebook style={{ marginRight: 8 }} /> Chia sẻ Facebook
                  </motion.button>
                  <motion.button
                    className="retake-btn"
                    onClick={reset}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ fontSize: 18, padding: '1rem 2.5rem', background: '#fff', color: '#b8860b', borderRadius: 24, fontWeight: 600, cursor: 'pointer', border: '2px solid #ffd700', boxShadow: '0 2px 8px #fffde7' }}
                  >
                    Chọn ảnh khác
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoBooth; 