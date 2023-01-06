import express from 'express';

const app = express();

//port
const port = 3000;

//routes
app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

export default app;