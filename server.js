const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 7777;
const MAX_LENGTH = 50000;  // Maximum allowed length for messages

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/ask', (req, res) => {
    const { message, public } = req.body;
    const date = new Date().toLocaleDateString('en-GB').split('/').join('.'); // Format date as dd.mm.yyyy
    const publicTag = public ? '[PUBLIC]' : '';

    const formattedMessage = `[${date}] ${publicTag}\n${message}\n\n`;

    if (formattedMessage.length > MAX_LENGTH) {
        return res.status(413).send('Message too long'); // Return an error if message exceeds limit
    }

    fs.appendFileSync('messages.txt', formattedMessage, 'utf8');
    res.status(200).send('Message received');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

