var express = require('express')
var mysql = require('mysql')
var bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node_crud'
});

let port = 3000;
app.listen(port, () => 
	console.log(
		'APP Running on port '
		+ port
		+ "\n"
		+ 'Listening http://localhost:' + port + '/'
		+ "\n"
		+ 'Created by AgungDH'))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/mahasiswa', (req, res) => {
	connection.query('SELECT * FROM mahasiswa', function (err, rows, fields) {
	  if (err) throw err

	  res.json(rows)
	})
})

app.get('/mahasiswa/:npm', (req, res) => {
	var params = req.params

	connection.query('SELECT count(*) total FROM mahasiswa WHERE npm = ?', [params.npm], function (err, rows, fields) {
	  if (err) throw err

	  	if (rows[0].total != '0') {
	  		connection.query('SELECT * FROM mahasiswa WHERE npm = ?', [params.npm], function (err2, rows2, fields2) {
			  if (err2) throw err2

			  res.json(rows2[0])
			})
	  	} else {
	  		res.status(404);
			res.json({'status' : false, 'description' : 'NPM is not exist!'})
	  	}
  	})
})

app.post('/mahasiswa', (req, res) => {
	var body = req.body

	connection.query('SELECT count(*) total FROM mahasiswa WHERE npm = ?', [body.npm], function (err, rows, fields) {
	  if (err) throw err

	  if (rows[0].total == '0') {
  		connection.query('INSERT INTO mahasiswa SET ?', {'npm' : body.npm, 'nama' : body.nama, 'alamat' : body.alamat, 'tanggallahir' : body.tanggallahir, 'jeniskelamin' : body.jeniskelamin}, function (err2, rows2, fields2) {
		  if (err2) throw err2

		  res.json({'status' : true})
		})
	  } else {
	  	res.status(409);
	  	res.json({'status' : false, 'description' : 'NPM already exist!'})
	  }
	})
})

app.put('/mahasiswa/:npm', (req, res) => {
	var params = req.params
	var body = req.body

	connection.query('SELECT count(*) total FROM mahasiswa WHERE npm = ?', [body.npm], function (err, rows, fields) {
		if (err) throw err

		if (rows[0].total == '0' || params.npm == body.npm) {
			connection.query('UPDATE mahasiswa SET npm = ?, nama = ?, alamat = ?, tanggallahir = ?, jeniskelamin = ? WHERE npm = ?', [body.npm, body.nama, body.alamat, body.tanggallahir, body.jeniskelamin, params.npm], function (err2, rows2, fields2) {
			  if (err) throw err

			  res.json({'status' : true})
			})
		} else {
			res.status(404);
			res.json({'status' : false, 'description' : 'NPM already exist!'})
		}
	})
})

app.delete('/mahasiswa/:npm', (req, res) => {
	var params = req.params

	connection.query('SELECT count(*) total FROM mahasiswa WHERE npm = ?', [params.npm], function (err, rows, fields) {
		if (err) throw err

		if (rows[0].total != '0') {
			connection.query('DELETE FROM mahasiswa WHERE npm = ?', [params.npm], function (err2, rows2, fields2) {
			  if (err) throw err

			  res.json({'status' : true})
			})
		} else {
			res.status(404);
			res.json({'status' : false, 'description' : 'NPM is not exist!'})
		}
	})
})