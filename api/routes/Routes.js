'use strict';
module.exports = function(app) {

  var controller = require('../controllers/EthereumController');

  app.route('/balance')
    .post(controller.get_balance);

  app.route('/wallet_balance')
    .get(controller.get_hw_balance);

  app.route('/send')
    .post(controller.send);

  app.route('/transaction')
    .post(controller.get_transaction);

  app.route('/transaction_receipt')
    .post(controller.get_transaction_receipt);

};
