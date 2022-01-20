require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Tell express to use your routers here
const customerRouter = require('./routers/customer');
app.use('/customer', customerRouter);





app.get('*', (req, res) => {
    res.json({ ok: true });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
})