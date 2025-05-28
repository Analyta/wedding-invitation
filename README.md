# 💕 Thiệp Cưới Online - Wedding Invitation

Một thiệp cưới online đẹp mắt với hiệu ứng đặc biệt và tương tác phong phú, được tạo bằng React.

## ✨ Tính Năng Nổi Bật

### 🎭 Hiệu Ứng Visual
- **Floating Hearts**: Trái tim bay lơ lửng
- **Petals Effect**: Hiệu ứng cánh hoa rơi
- **Balloons Effect**: Bóng bay và confetti
- **Scroll Sparkles**: Lấp lánh khi cuộn trang
- **Scroll Animations**: Hiệu ứng mượt mà khi cuộn
- **Fireworks**: Pháo hoa khi chụp ảnh

### 🎵 Âm Thanh & Nhạc
- Điều khiển phát/dừng nhạc nền
- Điều khiển âm lượng
- Nhạc lặp lại tự động

### 📸 Photo Booth Thông Minh
- Tạo khung ảnh kỷ niệm với thông tin đám cưới
- Tải xuống ảnh đã tạo
- Chia sẻ lên mạng xã hội (Facebook, Instagram)
- Hiệu ứng chụp ảnh chân thực

### 🗺️ Bản Đồ Địa Điểm
- Google Maps tích hợp
- Thông tin chi tiết địa điểm
- Nút chỉ đường trực tiếp
- Thông tin liên hệ venue

### 📝 Tương Tác Khách Mời
- **Countdown Timer**: Đếm ngược thời gian
- **Love Quotes**: Slideshow câu nói tình yêu
- **Guest Book**: Sổ lưu bút trực tuyến
- **RSVP Form**: Xác nhận tham dự
- **Gallery**: Thư viện ảnh đẹp

### 📱 Responsive Design
- Tương thích mọi thiết bị
- Tối ưu cho mobile
- Hiệu ứng mượt mà

## 🚀 Cài Đặt

### Yêu Cầu Hệ Thống
- Node.js (v14 hoặc cao hơn)
- npm hoặc yarn

### Bước 1: Clone Project
```bash
git clone [your-repo-url]
cd wedding-invitation
```

### Bước 2: Cài Đặt Dependencies
```bash
npm install
```

### Bước 3: Chạy Development Server
```bash
npm start
```

Website sẽ mở tại `http://localhost:3000`

## 🎨 Tùy Chỉnh Thiệp Cưới

### 1. Thông Tin Cơ Bản
Chỉnh sửa file `src/App.js`:

```javascript
// Thay đổi tên cô dâu chú rể
<h1 className="main-title">Tên Chú Rể & Tên Cô Dâu</h1>

// Thay đổi ngày cưới
const WEDDING_DATE = new Date('2024-12-15T14:00:00');

// Thay đổi địa điểm
<div className="venue">
  <FaMapMarkerAlt /> Địa chỉ của bạn
</div>
```

### 2. Thay Đổi Ảnh
Thay thế các URL ảnh demo:

```javascript
// Ảnh cô dâu chú rể
const DEMO_BRIDE_IMAGE = "URL_ảnh_cô_dâu";
const DEMO_GROOM_IMAGE = "URL_ảnh_chú_rể";

// Ảnh gallery
const DEMO_GALLERY_IMAGES = [
  "URL_ảnh_1",
  "URL_ảnh_2",
  // ... thêm ảnh
];
```

### 3. Thay Đổi Bản Đồ
Chỉnh sửa `src/components/WeddingMap.js`:

```javascript
const venueInfo = {
  name: "Tên địa điểm của bạn",
  address: "Địa chỉ đầy đủ",
  phone: "Số điện thoại", 
  coordinates: {
    lat: 10.7769, // Latitude thực tế
    lng: 106.7009 // Longitude thực tế
  }
};
```

### 4. Thêm Nhạc Nền
Đặt file nhạc vào thư mục `public/music/` và cập nhật:

```javascript
// Trong src/components/MusicControl.js
const audio = new Audio('/music/wedding-song.mp3');
```

### 5. Tùy Chỉnh Màu Sắc
Chỉnh sửa `src/App.css`:

```css
/* Thay đổi màu chủ đạo */
:root {
  --primary-color: #ff6b9d;
  --secondary-color: #ffecd2;
  --accent-color: #d4a574;
}
```

### 6. Thêm/Sửa Câu Nói Tình Yêu
```javascript
const LOVE_QUOTES = [
  "Câu nói tình yêu của bạn 1",
  "Câu nói tình yêu của bạn 2",
  // ... thêm câu nói
];
```

## 🎯 Cấu Trúc Project

```
wedding-invitation/
├── public/
│   ├── index.html
│   └── music/ (đặt file nhạc ở đây)
├── src/
│   ├── components/
│   │   ├── MusicControl.js      # Điều khiển nhạc
│   │   ├── VisualEffects.js     # Hiệu ứng visual
│   │   ├── ScrollAnimations.js  # Hiệu ứng scroll
│   │   ├── WeddingMap.js       # Bản đồ địa điểm
│   │   └── PhotoBooth.js       # Photo booth
│   ├── App.js                  # Component chính
│   ├── App.css                # Styles chính
│   └── index.js               # Entry point
└── package.json
```

## 🚀 Deploy Website

### Option 1: Netlify (Đơn Giản Nhất)
1. Build project: `npm run build`
2. Đăng ký tài khoản [Netlify](https://netlify.com)
3. Kéo thả thư mục `build` vào Netlify
4. Website sẽ có URL tự động

### Option 2: Vercel
1. Cài đặt Vercel CLI: `npm i -g vercel`
2. Chạy: `vercel`
3. Làm theo hướng dẫn

### Option 3: GitHub Pages
1. Cài đặt: `npm install --save-dev gh-pages`
2. Thêm vào `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/wedding-invitation",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```
3. Deploy: `npm run deploy`

## 🔧 Tính Năng Nâng Cao

### Tích Hợp Database (Tuỳ Chọn)
Để lưu RSVP và guest book, bạn có thể tích hợp:

1. **Firebase**: 
   - Tạo project tại [Firebase Console](https://console.firebase.google.com)
   - Thêm Firestore Database
   - Cài đặt: `npm install firebase`

2. **Supabase**: 
   - Tạo project tại [Supabase](https://supabase.com)
   - Cài đặt: `npm install @supabase/supabase-js`

### Google Analytics (Tuỳ Chọn)
Thêm tracking code vào `public/index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📱 SEO & Social Media

### Meta Tags
File `public/index.html` đã được tối ưu với:
- Open Graph tags cho Facebook
- Twitter Cards
- Meta description
- Viewport responsive

### Tùy Chỉnh Social Sharing
Cập nhật meta tags trong `public/index.html`:

```html
<meta property="og:title" content="💕 Thiệp Cưới [Tên Của Bạn] 💕" />
<meta property="og:description" content="Mô tả đám cưới của bạn" />
<meta property="og:image" content="URL_ảnh_preview" />
```

## 🐛 Troubleshooting

### Audio không phát được
- Hầu hết trình duyệt chặn autoplay audio
- Người dùng cần click để bắt đầu nhạc
- Đặt file nhạc trong thư mục `public/music/`

### Hiệu ứng lag trên mobile
- Giảm số lượng particles trong visual effects
- Tắt một số hiệu ứng phức tạp cho mobile

### Google Maps không hiển thị
- Kiểm tra coordinates trong `WeddingMap.js`
- Cập nhật API key nếu cần (cho production)

## 💡 Tips & Tricks

1. **Performance**: Tối ưu ảnh trước khi upload (WebP format)
2. **Loading**: Thêm preloader cho ảnh lớn
3. **Testing**: Test trên nhiều thiết bị và trình duyệt
4. **Backup**: Lưu source code trên GitHub
5. **Analytics**: Theo dõi lượt truy cập bằng Google Analytics

## 📞 Hỗ Trợ

Nếu gặp vấn đề khi sử dụng, hãy:
1. Kiểm tra console browser (F12)
2. Đảm bảo Node.js version tương thích
3. Xóa `node_modules` và chạy lại `npm install`
4. Kiểm tra internet connection cho các APIs

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

---

**Chúc bạn có một đám cưới thật hạnh phúc! 💕**

> "Tình yêu không chỉ là nhìn vào mắt nhau, mà là cùng nhau nhìn về một hướng." - Antoine de Saint-Exupéry
