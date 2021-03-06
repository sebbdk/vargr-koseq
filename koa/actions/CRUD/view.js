/*
* @Author: sebb
* @Date:   2017-03-16 22:25:34
* @Last Modified by:   kasper
* @Last Modified time: 2017-11-24 20:15:13
*/

module.exports = function(ModelName) {
  return async function (ctx) {
    const Model = ctx.orm()[ModelName];
    const results = await Model.findOne({
      where: {
        id: ctx.params.id
      },
      include: [{ all: true, include: [{all:true}] }]
    });

    ctx.body = { results };
  }
};