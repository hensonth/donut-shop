var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var body Parser = require('body-parser')
var dotenv = require('dotenv')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/donut-shop')
console.log('the environment is on' + process.env.NODE_ENV);

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */

dotenv.load({path: '.env.' + process.env.NODE_ENV})

mongoose.connect(process.env.MONGO_URI)


// if(process.env.NODE_ENV === 'production') {
// // heroku mongo connection
//   mongoose.connect('mongodb://hensonth:abcabc123@ds061076.mlab.com:61076/wdi6-henson/')
//   console.log('connected')
// } else {
//   //local host mongo connection
//   mongoose.connect('mongodb://localhost/donut-shop')
// }

app.set('view engine', 'ejs')
app.use(layout)

app.use(bodyParser.json()) // to parse ajax json req
app.use(bodyParser.urlencoded({
  extended: true
})) // to parse form submitted data

// serve static files
app.use(express.static(__dirname + '/public'))

var frontendRoutes = require('./routes/donuts')
var ajaxRoutes = require('./routes/donuts_api')

app.use('/', frontendRoutes) // only render ejs files
app.use('/api/donuts', ajaxRoutes) // only handle ajax request

app.use('/users', usersRoutes)
app.use('/api/users', usersAPIRoutes)

app.listen(process.env.PORT || 3000)
console.log('Server started')
