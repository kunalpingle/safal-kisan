// Module dependencies
const contentful = require('contentful');
const CONFIG = require('../config');
// credentials
const spaceId = CONFIG.contentful.spaceId;
const accessToken = CONFIG.contentful.accessToken;

// initialise the contentful 
const client = contentful.createClient({
    space: spaceId,
    accessToken: accessToken
});

module.exports = {
    getHomeEntry: () => {
        return client.getEntries({ 'content_type': 'home' });
    },
    getFeaturedProducts: () => {
        return client.getEntries({
            'content_type': 'product',
            'fields.isFeatured': true,
            'limit': 4
        });
    },
    getNewProducts: () => {
        return client.getEntries({
            'content_type': 'product',
            'order': '-sys.createdAt',
            'limit': 4
        });
    },
    getSingleProduct: (productName) => {
        return client.getEntries({
            'content_type': 'product',
            'fields.url': productName,
            'order': '-sys.createdAt'
        })
    },
    getCategoryProducts: (category) => {
        return client.getEntries({
                'content_type': 'product',
                'fields.category1.sys.contentType.sys.id': 'category',
                'fields.category1.fields.slug[match]': category,
                'include': 1
            })
            .catch(err => {
                console.log("Error ===>", err)
                return err;
            })
    }
}