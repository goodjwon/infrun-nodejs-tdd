const app = require('../index')
const syscDb = require('./sync-db');


syscDb().then(_ => {
    console.log('Sync database!')
    app.listen(3000, () => {
        console.log('Server is runing on 3000 port');
    })
});
