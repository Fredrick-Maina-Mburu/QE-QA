const fs = require('fs')
const http = require('http')


function serveStaticFile(res, filePath, contentType, responseCode = 200) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
    } else {
      
      res.writeHead(responseCode, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}


function updateDatabase(data, res) {
  const fileContent = `const data = ${JSON.stringify(data, null, 2)}; module.exports = { data }`;
  fs.writeFile('./db.js', fileContent, 'utf8', (err) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Failed to update data.' }));
    } else {
      delete require.cache[require.resolve('./db.js')];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Data updated successfully!' }));
    }
  });
}


const server = http.createServer((req, res) => {

  if (req.method === 'GET') {
    if (req.url === '/') {
      serveStaticFile(res, '../frontend/index.html', 'text/html');
    } else if (req.url === '/script.js') {
      serveStaticFile(res, '../frontend/script.js', 'text/javascript');
    } else if (req.url === '/style.css') {
      serveStaticFile(res, '../frontend/style.css', 'text/css');
    } else if (req.url === '/db.js') {
      serveStaticFile(res, './db.js', 'application/javascript');
    } else if (req.url === '/data') {
      const data = require('./db.js').data;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }
  }

  if(req.url.startsWith('/view/') && req.method === 'GET'){
    const id = req.url.split('/').pop()
    let data = require('./db.js').data
    data = data.filter(item => item.id == id)
    if(data){
      res.writeHead(200, {'Content-Type' : 'application/json'})
      res.end(JSON.stringify(data, null, 2))
    }
  }

  if (req.method === 'POST' && req.url === '/add') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const { title, price, date, location, company, imageUrl } = JSON.parse(body);
      const data = require('./db.js').data;

      const newItem = {
        id: data.length + 1,
        title,
        price,
        date,
        location,
        company,
        imageUrl,
      };

      data.push(newItem);
      updateDatabase(data, res);
    });
  }

  if (req.method === 'DELETE' && req.url.startsWith('/delete/')) {
    const id = req.url.split('/').pop();
    delete require.cache[require.resolve('./db.js')];
    let data = require('./db.js').data;
    data = data.filter(item => item.id != id);
    updateDatabase(data, res);
  }


  if (req.method === 'PUT' && req.url.startsWith('/edit/')) {
    const id = req.url.split('/').pop();
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const { title, price, date, location, company, imageUrl } = JSON.parse(body);
      let data = require('./db.js').data;

      const itemIndex = data.findIndex(item => item.id == id);
      if (itemIndex >= 0) {
        data[itemIndex] = { ...data[itemIndex], title, price, date, location, company, imageUrl };
        updateDatabase(data, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Item not found!' }));
      }
    });
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});