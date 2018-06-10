const models = require('../models');
const path = require('path');
const _ = require('lodash');
const homeTemplatePath = path.join(__dirname, '../../', 'client', 'index.html');
module.exports = {
    getData: (req, res) => {
        let _entry = {},
            featuredProducts = [],
            newProducts = [];
        return models.getHomeEntry()
            .then(homeResp => {
                if (!_.isUndefined(homeResp) && !_.isUndefined(homeResp.items) && !_.isEmpty(homeResp.items)) {
                    _entry = homeResp.items[0].fields || {}
                    return models.getFeaturedProducts();
                } else {
                    return;
                }
            })
            .then(featuredProductsResp => {
                if (!_.isUndefined(featuredProductsResp) && !_.isUndefined(featuredProductsResp.items) && !_.isEmpty(featuredProductsResp.items)) {
                    featuredProducts = featuredProductsResp.items;
                    return models.getNewProducts();
                } else {
                    return;
                }
            })
            .then((newProductsResp) => {
                if (!_.isUndefined(newProductsResp) && !_.isUndefined(newProductsResp.items) && !_.isEmpty(newProductsResp.items)) {
                    newProducts = newProductsResp.items;
                    res.render(homeTemplatePath, {
                        entry: _entry,
                        featuredProducts: featuredProducts,
                        newProducts: newProducts
                    })
                } else {
                    res.json({ error_message: "Sorry! Data not exist in Contentful" });
                }
            })
            .catch(err => {
                console.log("Error ----------->", err);
                res.json({ error_message: err });
            });
    }
}