const express = require('express');
let router = express.Router();
const { addProduct,updateProduct, deleteProduct } = require('../controller/homeController');

// Định nghĩa route cho việc thêm sản phẩm
router.post('/admin/product-add/action', addProduct);
router.post('/admin/product-detail/action', updateProduct);
router.post('/admin/product/detele', deleteProduct);

module.exports = router;
