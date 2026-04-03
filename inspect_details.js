const db = require('./db');
const tables = ['patient','blood_request','employee','donor','blood_bank','blood'];
(async () => {
  for (const t of tables) {
    await new Promise(resolve => {
      db.query('SHOW CREATE TABLE ??', [t], (err, rows) => {
        console.log('===== TABLE', t, '=====');
        if (err) {
          console.log('ERROR', err.sqlMessage);
        } else {
          console.log(rows[0]['Create Table']);
        }
        resolve();
      });
    });
  }
  db.end();
})();
