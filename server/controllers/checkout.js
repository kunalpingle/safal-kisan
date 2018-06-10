const models = require('../models');
const path = require('path');
const _ = require('lodash');
const checkoutTemplatePath = path.join(__dirname, '../../', 'client', 'checkout.html');
let _entry;
module.exports = {
    getData: (req, res) => {
        return models.getHomeEntry()
            .then(homeResp => {
                if (!_.isUndefined(homeResp) && !_.isUndefined(homeResp.items) && !_.isEmpty(homeResp.items)) {
                    _entry = homeResp.items[0].fields || {};
                }
                res.render(checkoutTemplatePath, { entry: _entry });
            })
            .catch(err => {
                res.json(err);
            });
    }
}