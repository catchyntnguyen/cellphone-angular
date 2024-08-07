const connectDB = require('../config/connectDB');
const fs = require('fs');

async function fetchDataAndWriteToFile() {
  try {
    const pool = connectDB;
    const connection = await pool.getConnection();
    const [categories] = await connection.execute('SELECT * FROM categories');
    const [categories_brand] = await connection.execute('SELECT * FROM categories_brand');
    const [orders] = await connection.execute('SELECT * FROM orders ORDER BY id DESC');
    const [products] = await connection.execute('SELECT * FROM products ORDER BY id DESC');
    const [product_versions] = await connection.execute('SELECT * FROM product_versions');
    const [users] = await connection.execute('SELECT * FROM users ORDER BY id DESC');
    const [orderdetail] = await connection.execute('SELECT * FROM orderdetail');
    const data = {
      categories: categories,
      categories_brand: categories_brand,
      orders: orders,
      products: products,
      product_versions: product_versions,
      users: users,
      orderdetail: orderdetail,
    }
    const jsonData = JSON.stringify(data, null, 2);
    await fs.promises.writeFile('../frontend/src/assets/data/data.json', jsonData);
    console.log('Data has been written to data.json');
    connection.release();
  } catch (error) {
    console.log('Error: ', error);
  }
}
// fetchDataAndWriteToFile();
const registerHandler = async (req, res) => {
  let { name, phone, email, password } = req.body;
  try {
    const pool = connectDB;
    const connection = await pool.getConnection();
    await connection.query(`INSERT INTO users (email,name,phone,address,password,role) VALUES (?,?,?,?,?,?)`, [email, name, phone, "", password, 0]);
    connection.release();
    fetchDataAndWriteToFile();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const updateStatus = async (req, res) => {
  let { id } = req.body;
  try {
    const pool = connectDB;
    const connection = await pool.getConnection();
    await connection.query(`UPDATE orders SET status = ? WHERE id = ?`, [4, id]);
    connection.release();
    fetchDataAndWriteToFile();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const checkOut = async (req, res) => {
  try {
    let { receiverName, receiverEmail, receiverPhone, receiverAddress, arrayProducts, idUserBuy, totalProducts } = req.body;
    // console.log(receiverName, receiverEmail, receiverPhone, receiverAddress, arrayProducts, idUserBuy, totalProducts);
    await connectDB.query(`INSERT INTO orders (idUserBuy, receiverName, receiverPhone, receiverAddress, status, createdAt, total, receiverEmail) VALUES (?, ?, ?, ?, 0, CURRENT_TIMESTAMP, ?, ?)`, [idUserBuy, receiverName, receiverPhone, receiverAddress, totalProducts, receiverEmail]);
    const result = await connectDB.query('SELECT LAST_INSERT_ID() as orderId'); 
    const orderId = result[0];
    arrayProducts.forEach(i => {
      let tolal = i.priceNew * i.soluong;
      // console.log(orderId[0].orderId, i.id, i.soluong, i.priceNew, tolal)
      connectDB.query(`INSERT INTO orderdetail (idOrder, product_id, quantity, price, total) VALUES (?, ?, ?, ?, ?);`, [orderId[0].orderId, i.id, i.soluong, i.priceNew, tolal], (error, results) => {
        if (error) {
          console.error(error);
        }
        else {
          console.log('Thêm hàng vào giỏ hàng thành công');
        }
      });
    });
    fetchDataAndWriteToFile();
  }
  catch (error) {
  }
}

module.exports = {
  registerHandler,
  checkOut,
  updateStatus
};
