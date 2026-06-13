# 🔐 Server OTP Quiz

> Backend Node.js nhỏ phục vụ luồng OTP/quiz, phù hợp để luyện API server, gửi mã xác thực và xử lý request.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=plastic&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=plastic&logo=express&logoColor=white)
![OTP](https://img.shields.io/badge/OTP_Service-2563EB?style=plastic)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=plastic&logo=javascript&logoColor=000)

---

## 📌 Mục tiêu project

**Server OTP Quiz** là project backend thực hành với Node.js. Repo tập trung vào việc xây dựng server đơn giản, xử lý request và có thể mở rộng cho các chức năng OTP hoặc quiz.

---

## 🧩 Thành phần chính

| File | Vai trò |
|---|---|
| `index.js` | File server chính |
| `package.json` | Scripts và dependencies |
| `package-lock.json` | Khóa phiên bản dependencies |
| `node_modules/` | Dependencies đã bị commit, nên dọn khỏi repo |

---

## 🚀 Cách chạy

### 1. Cài dependencies

```bash
npm install
```

### 2. Chạy server

```bash
npm start
```

Nếu `package.json` chưa có script phù hợp, có thể chạy trực tiếp:

```bash
node index.js
```

---

## 🧹 Việc nên dọn ngay

Repo hiện đang có `node_modules` trên GitHub. Với repo public, nên xóa khỏi Git để nhìn chuyên nghiệp hơn:

```bash
git rm -r --cached node_modules
git commit -m "Remove committed node_modules"
git push
```

Thêm `.gitignore` nếu chưa có:

```gitignore
node_modules/
.env
.env.local
npm-debug.log*
```

---

## 🧭 Roadmap

- [ ] Chuẩn hóa script `npm start`
- [ ] Thêm `.gitignore`
- [ ] Thêm `.env.example`
- [ ] Tách route/controller nếu API lớn hơn
- [ ] Viết ví dụ endpoint OTP/quiz
- [ ] Thêm validation request
- [ ] Thêm test API cơ bản

---

## ⚠️ Lưu ý bảo mật

Nếu server dùng OTP/email/API key, không commit thông tin thật lên GitHub. Hãy dùng `.env` và chỉ public `.env.example`.

---

<div align="center">

Backend practice project by [Nhữ Trung Hải](https://github.com/nhutrunghai)

</div>
