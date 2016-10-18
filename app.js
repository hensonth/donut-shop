var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/donut-shop')
console.log('the environment is on' + process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production') {
// heroku mongo connection
  mongoose.connect('mongodb://hensonth:abcabc123@ds061076.mlab.com:61076/wdi6-henson/')
  console.log('connected')
} else {
  //local host mongo connection
  mongoose.connect('mongodb://localhost/donut-shop')
}

app.set('view engine', 'ejs')
app.use(layout)

// serve static files
app.use(express.static(__dirname + '/public'))

var frontendRoutes = require('./routes/donuts')
var ajaxRoutes = require('./routes/donuts_api')

app.use('/', frontendRoutes) // only render ejs files
app.use('/api/donuts', ajaxRoutes) // only handle ajax request

app.listen(process.env.PORT || 3000)
console.log('Server started')
