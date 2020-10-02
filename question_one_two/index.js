const express = require('express');


const app = express();

const PORT = 4000;

app.use('/zallat/api/state', require('./routes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));