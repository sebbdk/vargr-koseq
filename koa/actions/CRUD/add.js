/*
* @Author: sebb
* @Date:   2017-03-16 22:25:34
* @Last Modified by:   kasper
* @Last Modified time: 2018-01-03 21:22:27
*/

module.exports =function(ModelName) {
  return async function (ctx) {
    const Model = ctx.orm()[ModelName];
    const results = await Model.create(ctx.request.fields, {
      include: [{ all: true }]
    })
    ctx.body = results;
  }
};