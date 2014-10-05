/**
 * Processes the conflict/cooperation files for a city to create 6 files.
 * @author ian
 */

var async = require('async');
var _ = require('lodash');
var fs = require('fs');

var cities = {
  'san francisco': '213'
};

function processCity(city, cb) {
  async.each(['conflict', 'cooperation'], function(name, next) {
    processCityFile(city, name, next);
  }, cb);
}

function processCityFile(city, file, cb) {
  fs.readFile(file + '.json', 'utf8', function(err, data) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }

    data = JSON.parse(data);
    var cityId = cities[city];
    console.log('= Parsing ' + file + ' for city ' + city + ' (id ' + cityId + ')');

    // First degree connections
    var degree1 = _.filter(data, function(tuple) {
      return tuple[0] === cityId || tuple[1] === cityId; // Ensure 1st degree city
    });

    // First degree cities
    var citiesDegree1 = _.reduce(degree1, function(res, tuple) {
      res.push(tuple[0] === cityId ? tuple[1] : tuple[0]); // Get 1st degree connected cities
      return res;
    }, []);
    console.log('== First degree: ' + degree1.length + ' connections');

    // Second degree connections
    var degree2 = _.filter(data, function(tuple) {
      return (citiesDegree1.indexOf(tuple[0]) !== -1 || citiesDegree1.indexOf(tuple[1]) !== -1) // Ensure 2nd degree city
        && degree1.indexOf(tuple) === -1; // Ensure not 1st degree
    });

    // Second degree cities
    var citiesDegree2 = _.reduce(degree2, function(res, tuple) {
      if (tuple[0] === cityId || tuple[1] === cityId) {
        return res;
      }
      if (citiesDegree1.indexOf(tuple[0]) !== -1) {
        res.push(tuple[1]);
      } else {
        res.push(tuple[0]);
      }
      return res;
    }, []);
    console.log('== Second degree: ' + degree2.length + ' connections' + ' (' + citiesDegree2.length + ' cities)');

    // Third degree connections
    var degree3 = _.filter(data, function(tuple) {
      return (citiesDegree2.indexOf(tuple[0]) !== -1 || citiesDegree2.indexOf(tuple[1]) !== -1) // Ensure 3rd degree city
        && degree2.indexOf(tuple) === -1 && degree1.indexOf(tuple) === -1; // Ensure not 1st/2nd degree
    });
    console.log('== Third degree: ' + degree3.length + ' connections');


  });
}

async.each(['san francisco'], function(city, cb) {
  processCity(city, cb);
}, function(cb) {
  console.log('Done');
});
