/*
* @Author: sebb
* @Date:   2017-03-16 22:25:34
* @Last Modified by:   kasper
* @Last Modified time: 2018-01-03 20:50:53
*/

module.exports = function(ModelName) {
  return async function (ctx) {
    const Model = ctx.orm()[ModelName];
    let results = await Model.update(ctx.request.fields,{
      where: {
        id: ctx.params.id
      }
    });

    ctx.body = { };

    if(results[0] !== 0) {
      const result = await Model.findOne({
        where: {
          id: ctx.params.id
        }
      });

      ctx.body = result;
    }
  }
};