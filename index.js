const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const connectDatabase = async() => {
    try {
        await mongoose.connect(
            "mongodb+srv://nhuthifc_db_user:30122005@netc.smhimsa.mongodb.net/quiz",
          
        );
        console.log("Connected to Quiz database");
    } catch (error) {
        console.error("Connect Database Error !!!", error);
        process.exit(1);
    }
}
var db = connectDatabase();
const getRandomCode = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const app = express();
app.use(express.json()); 

const OtpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true },
    otpCode: { type: String, required: true },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300,  
    }
  },
  { versionKey: false }
);
const OTP = mongoose.model(
  "Otps",
  OtpSchema,
  "otps"
);


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'nhutrunghai@gmail.com', 
        pass: 'hxhw nrvk mxzh pedi' 
    }
})
app.post('/api/send-email', (req, res) => {
    const targetEmail = req.body.email; 
    if (!targetEmail) {
        return res.status(400).end();
    }
    const verificationCode = getRandomCode(6);
    const newOtp = new OTP({
        email: targetEmail,
        otpCode: verificationCode,
    });
    newOtp.save();
    const mailOptions = {
        from: 'nhutrunghai@gmail.com', 
        to: targetEmail,
        subject: 'Mã xác minh tài khoản Quiz EPU của bạn',
        text: `Mã xác minh của bạn là ${verificationCode}.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
                <div style="background-color: #5580C8; color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">XÁC MINH TÀI KHOẢN</h1>
                </div>
                <div style="padding: 30px; text-align: center;">
                    <p style="font-size: 16px; color: #333;">Xin chào,</p>
                    <p style="font-size: 16px; color: #555;">
                        Cảm ơn bạn đã đăng ký dịch vụ Quiz EPU. Vui lòng sử dụng mã xác minh dưới đây để hoàn tất quá trình đăng ký.
                    </p>
                    
                    <!-- Mã Code Thay Thế Nút Đặt lại Mật khẩu -->
                    <div style="margin: 30px 0; padding: 15px 20px; background-color: #f0f0f0; border-radius: 8px; border: 2px dashed #5580C8; display: inline-block;">
                        <span style="font-size: 32px; font-weight: bold; color: #5580C8; letter-spacing: 5px;">${verificationCode}</span>
                    </div>
                    
                    <p style="font-size: 14px; color: #999; margin-top: 20px;">
                        Mã này chỉ có hiệu lực trong 5 phút. Vui lòng không chia sẻ mã này với bất kỳ ai.
                    </p>
                </div>
                <div style="background-color: #f7f7f7; padding: 15px; text-align: center; font-size: 12px; color: #888;">
                    &copy; ${new Date().getFullYear()} Quiz EPU. Mọi quyền được bảo lưu.
                </div>
            </div>
        `,
    };

    // --- 4. Gửi Email ---
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        // Trả về 200 OK hoặc 204 No Content
        res.status(200).end();
    });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});