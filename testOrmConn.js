// testOrmConn.js
const { sequelize } = require('./orm');

(async function test() {
  try {
    await sequelize.authenticate();
    console.log('資料庫連線成功！');
  } catch (err) {
    console.error('資料庫連線失敗：', err);
  }
})();
