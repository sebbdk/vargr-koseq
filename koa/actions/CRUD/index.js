/*
* @Author: sebb
* @Date:   2017-03-16 22:25:34
* @Last Modified by:   Kasper Sebb' brandt
* @Last Modified time: 2018-10-19 20:19:34
*/
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function(ModelName, config = {}) {
  return async function (ctx) {
    const Model = ctx.orm()[ModelName];
    const query = ctx.request.query;

    let order = [
      query.orderBy || undefined,
      query.order || 'ASC'
    ];

    let options = {
      ...config.query,
      where: config.query && config.query.where || [],
      limit: parseInt(query.limit, 10) || 20,
      order: [['created', 'DESC']],
      offset: parseInt(query.offset, 10) || 0,
    };

    if(order[0] !== undefined) {
      options.order = [order];
    }

    const where = Object.getOwnPropertyNames(Model.attributes).reduce((conditions, field) => {
      if(query[field] !== undefined) {
        if(!conditions) {
          conditions = [];
        }

        // The params can be sendt like name=%\dexter%, just make sure to escape like %\x, to prevent decoding errors.
        //conditions[Op.or][field] = query[field];
        const con = {
          [field]: { $like: query[field] }
        };
        conditions.push(con);
      }

      return conditions;
    }, []);

    options.where = [
      ...options.where,
      ...where
    ];

    const results = await Model.findAll(options);
    ctx.body = { results };
  }
};