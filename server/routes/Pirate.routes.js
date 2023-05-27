const pirateController = require('../controllers/Pirate.controller');



module.exports = function(app){
  app.get('/api/pirates', pirateController.getAllPirates);
  app.post('/api/pirates', pirateController.createPirate);
  app.get('/api/pirates/:id', pirateController.getPirate);
  app.patch('/api/pirates/:id', pirateController.updatePirate);
  app.delete('/api/pirates/:id', pirateController.deletePirate);
  app.post('/api/register', pirateController.register);
  app.post('/api/login', pirateController.login);

};