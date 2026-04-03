const db = require('./db');
const tables = ['patient','blood_request','employee','donor','blood_bank','blood'];
(async () => {
  for (const t of tables) {
    await new Promise(resolve => {
      db.query('SHOW COLUMNS FROM ??', [t], (err, rows) => {
        console.log('TABLE', t);
        if (err) {
          console.log('  ERROR', err.sqlMessage);
        } else {
          rows.forEach(r => console.log(' ', r.Field, r.Type));
        }
        resolve();
      });
    });
  }
  db.end();
})();
