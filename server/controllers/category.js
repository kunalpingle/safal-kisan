const models = require('../models');
const path = require('path');
const _ = require('lodash');
const categoryProductTemplatePath = path.join(__dirname, '../../', 'client', 'products.html');
let _entry;
module.exports = {
    getAllCategoryProducts: (req, res) => {
        const params = req.params.id;
        return models.getHomeEntry()
            .then(homeResp => {
                if (!_.isUndefined(homeResp) && !_.isUndefined(homeResp.items) && !_.isEmpty(homeResp.items)) {
                    _entry = homeResp.items[0].fields || {};
                    return models.getCategoryProducts(params);
                } else {
                    return;
                }
            })
            .then(productObject => {
                if (!_.isUndefined(productObject) && !_.isUndefined(productObject.items) && !_.isEmpty(productObject.items)) {
                    res.render(categoryProductTemplatePath, { entry: _entry, products: productObject.items });
                } else {
                    res.send("Sorry, Data not exists");
                }
            })
            .catch(err => {
                res.json(err);
            });
    }
}