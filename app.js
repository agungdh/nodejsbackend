var express = require('express')
var app = express()

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node_crud'
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/mahasiswa', (req, res) => {
	connection.connect()

	connection.query('SELECT * FROM mahasiswa', function (err, rows, fields) {
	  if (err) throw err

	  res.json(rows)
	})

	connection.end()
})

// app.get('/mahasiswa', (req, res) => res.send('Hello World!'))