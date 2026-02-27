const http = require('http');

const data = JSON.stringify({
    name: 'Mule',
    email: 'muleab7@gmail.com',
    subject: 'Direct Message from Website',
    content: 'Hello, this is a test message from node!',
    source: 'chat_widget'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/messages',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (d) => { body += d; });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Body:', body);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
