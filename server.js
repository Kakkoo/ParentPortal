const express = require('express');
const app = express();

//First route
app.get('/', (req, res) => res.send('Hello World'));

const port = 7200;
app.listen(port, () => console.log(`Server running on port ${port}`));


