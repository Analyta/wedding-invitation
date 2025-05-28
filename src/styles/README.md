# CSS Architecture Documentation

## Cấu trúc thư mục CSS

```
src/styles/
├── main.css              # File CSS chính - import tất cả modules
├── variables.css         # CSS Variables và constants
├── base.css             # Base styles, reset, common styles
├── components/          # Component-specific styles
│   ├── header.css
│   ├── music-control.css
│   ├── visual-effects.css
│   ├── couples.css
│   ├── countdown.css
│   ├── timeline.css
│   ├── gallery.css
│   ├── guest-book.css
│   ├── rsvp.css
│   ├── footer.css
│   ├── map.css
│   └── photo-booth.css
└── utils/              # Utility styles
    ├── animations.css   # Keyframe animations
    └── responsive.css   # Media queries
```

## Cách sử dụng

### 1. Import CSS chính
```javascript
import './styles/main.css';
```

### 2. CSS Variables
Tất cả colors, spacing, fonts đều được định nghĩa trong `variables.css`:
```css
var(--primary-color)
var(--spacing-md)
var(--font-script)
```

### 3. Component Styles
Mỗi component có file CSS riêng với tên tương ứng.

### 4. Animations
Tất cả animations được định nghĩa trong `utils/animations.css` và có thể sử dụng class utilities:
```css
.animate-heartbeat
.animate-fade-in-up
.animate-bounce
```

### 5. Responsive Design
Media queries được tập trung trong `utils/responsive.css`.

## Ưu điểm của cấu trúc này

1. **Modular**: Dễ maintain và tìm styles
2. **Reusable**: CSS variables và utility classes
3. **Organized**: Phân chia rõ ràng theo function
4. **Scalable**: Dễ thêm components mới
5. **Clean**: Code dễ đọc và debug

## Quy tắc naming

- **BEM methodology**: `.component-element--modifier`
- **Semantic names**: `.wedding-invitation`, `.couple-photos`
- **Consistent spacing**: Sử dụng CSS variables
- **Mobile-first**: Responsive design từ mobile lên desktop

## Performance

- CSS được tree-shaken tự động
- Variables giảm duplicate code
- Modular structure giúp cache tốt hơn
- Animations được optimize với will-change

## Maintenance

1. **Thêm component mới**: Tạo file trong `components/` và import vào `main.css`
2. **Modify colors**: Chỉnh trong `variables.css`
3. **Add animations**: Thêm vào `utils/animations.css`
4. **Responsive fixes**: Chỉnh trong `utils/responsive.css` 