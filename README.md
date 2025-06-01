# 💕 Wedding Invitation - Thiệp Cưới Online

Một thiệp cưới online hiện đại, đẹp mắt với nhiều tính năng tương tác và hiệu ứng đặc biệt, được xây dựng bằng React.

## 🌟 Tính Năng Chính

### 🎨 Giao Diện & Hiệu Ứng
- **Thiết kế hiện đại**: Giao diện sang trọng, tinh tế
- **Hiệu ứng đặc biệt**:
  - Trái tim bay lơ lửng
  - Cánh hoa rơi
  - Bóng bay và confetti
  - Lấp lánh khi cuộn trang
  - Hiệu ứng mượt mà khi cuộn
  - Pháo hoa khi chụp ảnh

### 🎵 Âm Thanh
- Nhạc nền tự động phát
- Điều khiển phát/dừng
- Điều khiển âm lượng
- Nhạc lặp lại tự động

### 📸 Photo Booth
- Tạo khung ảnh kỷ niệm
- Tùy chỉnh thông tin đám cưới
- Tải xuống ảnh
- Chia sẻ lên mạng xã hội
- Hiệu ứng chụp ảnh chân thực

### 🗺️ Bản Đồ & Địa Điểm
- Tích hợp Google Maps
- Thông tin chi tiết địa điểm
- Chỉ đường trực tiếp
- Thông tin liên hệ venue

### 💌 Tương Tác
- **Đếm ngược**: Thời gian đến ngày cưới
- **Câu nói tình yêu**: Slideshow tự động
- **Sổ lưu bút**: Ghi lại lời chúc
- **RSVP**: Xác nhận tham dự
- **Thư viện ảnh**: Chia sẻ khoảnh khắc

### 📱 Responsive
- Tương thích mọi thiết bị
- Tối ưu cho mobile
- Hiệu ứng mượt mà

## 🚀 Cài Đặt

### Yêu Cầu
- Node.js (v14+)
- npm hoặc yarn

### Các Bước Cài Đặt

1. **Clone Project**
```bash
git clone [your-repo-url]
cd wedding-invitation
```

2. **Cài Đặt Dependencies**
```bash
npm install
```

3. **Chạy Development Server**
```bash
npm start
```
Website sẽ mở tại `http://localhost:3000`

## 🎨 Tùy Chỉnh

### 1. Thông Tin Cơ Bản
Chỉnh sửa trong `src/App.js`:
```javascript
// Thông tin cô dâu chú rể
<h1 className="main-title">Tên Chú Rể & Tên Cô Dâu</h1>

// Ngày cưới
const WEDDING_DATE = new Date('2024-12-15T14:00:00');

// Địa điểm
<div className="venue">
  <FaMapMarkerAlt /> Địa chỉ của bạn
</div>
```

### 2. Thay Đổi Ảnh
Cập nhật URL ảnh trong `src/App.js`:
```javascript
// Ảnh cô dâu chú rể
const DEMO_BRIDE_IMAGE = "URL_ảnh_cô_dâu";
const DEMO_GROOM_IMAGE = "URL_ảnh_chú_rể";

// Ảnh gallery
const DEMO_GALLERY_IMAGES = [
  "URL_ảnh_1",
  "URL_ảnh_2",
  // Thêm ảnh khác
];
```

### 3. Cập Nhật Bản Đồ
Chỉnh sửa trong `src/components/WeddingMap.js`:
```javascript
const venueInfo = {
  name: "Tên địa điểm",
  address: "Địa chỉ đầy đủ",
  phone: "Số điện thoại",
  coordinates: {
    lat: 10.7769, // Vĩ độ
    lng: 106.7009 // Kinh độ
  }
};
```

### 4. Thêm Nhạc
1. Đặt file nhạc vào `public/music/`
2. Cập nhật trong `src/components/MusicControl.js`:
```javascript
const audio = new Audio('/music/wedding-song.mp3');
```

### 5. Tùy Chỉnh Màu Sắc
Chỉnh sửa trong `src/styles/variables.css`:
```css
:root {
  --primary-color: #ff6b9d;
  --secondary-color: #ffecd2;
  --accent-color: #d4a574;
}
```

## 📁 Cấu Trúc Project

```
wedding-invitation/
├── public/
│   ├── index.html
│   └── music/
├── src/
│   ├── components/
│   │   ├── MusicControl.js
│   │   ├── VisualEffects.js
│   │   ├── ScrollAnimations.js
│   │   ├── WeddingMap.js
│   │   └── PhotoBooth.js
│   ├── styles/
│   │   ├── main.css
│   │   ├── variables.css
│   │   └── components/
│   ├── App.js
│   └── index.js
└── package.json
```

## 🚀 Deploy

### Netlify (Khuyến Nghị)
1. Build: `npm run build`
2. Đăng ký [Netlify](https://netlify.com)
3. Kéo thả thư mục `build`
4. Nhận URL tự động

### Vercel
1. Cài đặt: `npm i -g vercel`
2. Deploy: `vercel`

### GitHub Pages
1. Cài đặt: `npm install --save-dev gh-pages`
2. Cập nhật `package.json`:
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

### Tích Hợp Database
Để lưu RSVP và guest book:

1. **Firebase**:
   - Tạo project tại [Firebase Console](https://console.firebase.google.com)
   - Thêm Firestore Database
   - Cấu hình security rules

2. **MongoDB**:
   - Tạo cluster tại [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Kết nối với backend API

## 📝 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👥 Đóng Góp

Mọi đóng góp đều được hoan nghênh! Vui lòng:
1. Fork project
2. Tạo branch mới
3. Commit thay đổi
4. Push lên branch
5. Tạo Pull Request

## 📧 Liên Hệ

Nếu có thắc mắc hoặc góp ý, vui lòng tạo issue hoặc liên hệ qua email.
