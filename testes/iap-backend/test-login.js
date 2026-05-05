const http = require('http');

const data = JSON.stringify({
  email: 'admin@petrobras.com.br',
  password: '123456'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => { body += d; });
  res.on('end', () => {
    const fs = require('fs');
    fs.writeFileSync('login-test-result.txt', `Status: ${res.statusCode}\nBody: ${body}`);
    console.log('Done');
  });
});

req.on('error', error => {
  const fs = require('fs');
  fs.writeFileSync('login-test-result.txt', `Error: ${error.message}`);
});

req.write(data);
req.end();
