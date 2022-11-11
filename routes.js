//SPDX-License-Identifier: Apache-2.0

var prescription = require('./controller.js');

module.exports = function(app){

  app.get('/get_prescription/:id', function(req, res){
    prescription.get_prescription(req, res);
  });
  app.get('/add_prescription/:prescription', function(req, res){
    prescription.add_prescription(req, res);
  });
  app.get('/get_all_prescription', function(req, res){
    prescription.get_all_prescription(req, res);
  });
  app.get('/change_appointmentnumber/:appointmentnumber', function(req, res){
    prescription.change_appointmentnumber(req, res);
  });
}
