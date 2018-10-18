/*
* @Author: kasper
* @Date:   2017-03-19 01:44:37
* @Last Modified by:   kasper
* @Last Modified time: 2018-01-03 20:18:49
*/
const indexAction = require('./index');
const viewAction = require('./view');
const deleteAction = require('./delete');
const addAction = require('./add');
const updateAction = require('./update');

function underScoreName(string) {
  return string
    .replace(/\.?([A-Z]+)/g, (x,y) => ("_" + y.toLowerCase()))
    .replace(/^_/, "");
}

module.exports = function(router, modelName, options) {
  options = {
    index: {},
    add: {},
    view: {},
    update: {},
    delete: {},
    ...options
  }
  const lwrCseName = underScoreName(modelName);

  router.get(`/${lwrCseName}`, indexAction(modelName, options.index));
  router.post(`/${lwrCseName}`, addAction(modelName, options.add));
  router.get(`/${lwrCseName}/:id`, viewAction(modelName, options.view));
  router.put(`/${lwrCseName}/:id`, updateAction(modelName, options.update));
  router.delete(`/${lwrCseName}/:id`, deleteAction(modelName, options.delete));
}