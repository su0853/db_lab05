// transactionExample.js
const pool = require('./db');

async function doTransaction() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction(); // 開始交易
    
    const Student_ID = 'S10811005';
    const updateDepartment_ID = 'EE001';
    
    const result = await conn.query('SELECT * FROM STUDENT WHERE Student_ID = ?', [Student_ID]);
    if (result.length==0) {
      console.log('查無此學生');
        return;
    }
    else {
      console.log('查詢結果：', result[0]);
    }

    // 假設要同時將學生 'S10811005' 的系所由 CS001 換成 EE001
    const updateStudent = 'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?';
    await conn.query(updateStudent, [updateDepartment_ID, Student_ID]);
    
    // 假設同時更新其他相關表格
    
    
    // 如果以上操作都成功，則提交交易
    await conn.commit();
    console.log('交易成功，已提交');
    const updated_result = await conn.query('SELECT * FROM STUDENT WHERE Student_ID = ?', [Student_ID]);
    console.log('更新後的學生資料：', updated_result[0]);

    
  } catch (err) {
    // 若有任何錯誤，回滾所有操作
    if (conn) await conn.rollback();
    console.error('交易失敗，已回滾：', err);
  } finally {
    if (conn) conn.release();
  }
}

doTransaction();
