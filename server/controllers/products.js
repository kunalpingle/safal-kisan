const models = require('../models');
const path = require('path');
const _ = require('lodash');
const singleProductTemplatePath = path.join(__dirname, '../../', 'client', 'single.html');
let _entry;
module.exports = {
    getSingleProduct: (req, res) => {
        const params = req.params.id;
        return models.getHomeEntry()
            .then(homeResp => {
                if (!_.isUndefined(homeResp) && !_.isUndefined(homeResp.items) && !_.isEmpty(homeResp.items)) {
                    _entry = homeResp.items[0].fields || {};
                    return models.getSingleProduct(params)
                } else {
                    return;
                }
            })
            .then(productObject => {
                if (!_.isUndefined(productObject) && !_.isUndefined(productObject.items) && !_.isEmpty(productObject.items)) {
                    res.render(singleProductTemplatePath, { entry: _entry, product: productObject.items[0] });
                } else {
                    res.send("Sorry, Data not exists");
                }
            });
    }
}