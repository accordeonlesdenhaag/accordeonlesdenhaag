
/*
 * GET home page.
 */
 
var titlePrefix = {nl: "Accordeonles Den Haag - ", en: "Accordion lessons The Hague - "},
    hostname = "http://vps847.directvps.nl/";

function genericAction(view, title, beforeRender){
  this.action = function(req, res){
    var options = beforeRender ? beforeRender() : {};
    if(!options.title) options.title = title || '';
    options.hostname = hostname;
    if(!options.altpath) res.render(options.view || view, options); 
  };
}

var dutchLookups = {
  index: new genericAction('indexNL', titlePrefix.nl + 'Home'),
  bosz: new genericAction('boszNL', titlePrefix.nl + 'Bosz de Kler' ),
  accordeon: new genericAction('accordeon', titlePrefix.nl + 'Over de accordeon'),
  volwassenen: new genericAction('volwassenen', titlePrefix.nl + 'Volwassenen'),
  kinderen: new genericAction('kinderen', titlePrefix.nl + 'Kinderen'),
  voorwaarden: new genericAction('voorwaarden', titlePrefix.nl + 'Voorwaarden'),
  tarieven: new genericAction('tarieven', titlePrefix.nl + 'Tarieven'),
  contact: new genericAction('contactNL', titlePrefix.nl + 'Contact')
};
var englishLookups = {
  index: new genericAction('indexEN' , titlePrefix.en + 'Home'),
  bosz: new genericAction('boszEN', titlePrefix.en + 'Bosz de Kler'),
  adults: new genericAction('adults', titlePrefix.en + 'Adults'),
  kids: new genericAction('kids', titlePrefix.en + 'Kids'),
  terms: new genericAction('terms', titlePrefix.en + 'Terms'),
  prices: new genericAction('prices', titlePrefix.en + 'Prices'),
  contact: new genericAction('contactEN', titlePrefix.en + 'Contact')
}

exports.nl = {};
exports.en = {};
for(var route in dutchLookups){
  exports.nl[route] = dutchLookups[route].action;
}
for(var route in englishLookups){
  exports.en[route] = englishLookups[route].action;
}

//exports.index = function(req, res){
//  res.render('index', { title: titlePrefix + 'Home' });
//};
//
//exports.bosz = function(req, res){
//  res.render('bosz', { title: titlePrefix + 'Bosz de Kler' });
//};