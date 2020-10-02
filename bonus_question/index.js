const express = require('express');

const app = express();

app.use('/zallat/api', require('./routes'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));