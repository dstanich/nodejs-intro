const axios = require('axios');
const fs = require('fs');
const express = require('express');

axios.get('https://randomuser.me/api/?results=2').then((response) => {
    response.data.results.forEach((person) => {
      console.log(`Email: ${person.email}`);
    });
});

fs.readFile('./my-sample.json', (err, data) => {
    console.log('My file data:', JSON.parse(data));
});

const app = express();
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.listen(3000, () => console.log('Server is listening on port 3000'));

console.log('Hello world');
