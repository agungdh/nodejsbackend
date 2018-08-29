var express = require('express')
var mysql = require('mysql')
var bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node_crud'
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/mahasiswa', (req, res) => {
	connection.query('SELECT * FROM mahasiswa', function (err, rows, fields) {
	  if (err) throw err

	  res.json(rows)
	})
})

app.get('/mahasiswa/:npm', (req, res) => {
	var params = req.params
	connection.query('SELECT * FROM mahasiswa WHERE npm = ?', [params.npm], function (err, rows, fields) {
	  if (err) throw err

	  res.json(rows)
	})
})

app.post('/mahasiswa', (req, res) => {
	var body = req.body
	connection.query('INSERT INTO mahasiswa SET ?', {'npm' : body.npm, 'nama' : body.nama, 'alamat' : body.alamat, 'tanggallahir' : body.tanggallahir, 'jeniskelamin' : body.jeniskelamin, }, function (err, rows, fields) {
	  if (err) throw err

	  res.json({'status' : true})
	})
})