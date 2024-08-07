const express = require('express');
const bodyParser = require('body-parser');
const webRouter = require('./routes/web');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware để phân tích yêu cầu JSON và URL-encoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Middleware để parse application/json và application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối database
const connectDB = require('./config/connectDB');

// Sử dụng middleware cors
app.use(cors({
  credentials:true,
  origin:["http://localhost:4200"]
}));

// Sử dụng route
app.use('/', webRouter);

// Bắt đầu máy chủ
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
