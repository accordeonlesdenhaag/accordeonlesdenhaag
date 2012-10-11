
/**
 * Module dependencies.
 */

var express = require('express'),
    routes =  require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path')
;
var app = express();

var oneYear = 31557600000,
    clientCacheLimit = 0;//oneYear;

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'public'), { maxAge: clientCacheLimit } ));
  app.use(require('less-middleware')( { src: __dirname + '/public' } ));
  app.use(express.errorHandler());
  
  app.use(express.favicon(__dirname + ' /static/images/favicon.ico '));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  
  app.use(express.cookieParser('sweet sensemilla'));
  app.use(express.session());
  app.use(app.router);
  //app.use(function(){ console.log(arguments); });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function() {});


app.get('/', routes.nl.index);
app.get('/nl/', routes.nl.index);
app.get('/en/', routes.en.index);

for(var i in routes.nl){
  app.get('/nl/' + i, routes.nl[i]);
}
for(var i in routes.en){
  app.get('/en/' + i, routes.en[i]);
}
//app.get('/bosz', routes.bosz);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
