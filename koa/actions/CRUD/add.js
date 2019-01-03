/*
* @Author: sebb
* @Date:   2017-03-16 22:25:34
* @Last Modified by:   Kasper Sebb' brandt
* @Last Modified time: 2018-10-20 19:29:04
*/

module.exports = function(ModelName) {
  return async function (ctx) {
    const Model = ctx.orm()[ModelName];

    const results = await Model.create(ctx.request.fields, {
      include: [{ all: true }]
    }).catch(function (err) {
      console.log(err);
      throw new Error(err);
    });

    ctx.body = results;
  }
};