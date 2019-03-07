var app = require('./app');
var hostname = 'localhost';
var port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}:${port}`);
});
