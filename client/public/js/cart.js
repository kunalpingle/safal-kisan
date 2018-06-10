var app = angular.module('myApp', []);

var calculateTotalPrice = function(items) {
    let total = 0;
    for (let i = 0, _i = items.length; i < _i; i++) {
        if (items[i].price) {
            total = total + items[i].price;
        }
    }
    return total;
}

// here we define our unique filter
app.filter('unique', function() {
    // we will return a function which will take in a collection
    // and a keyname
    return function(collection, keyname) {
        // we define our output and keys array;
        var output = [],
            keys = [];

        // we utilize angular's foreach function
        // this takes in our original collection and an iterator function
        angular.forEach(collection, function(item) {
            // we check to see whether our object exists
            var key = item[keyname];
            // if it's not already part of our keys array
            if (keys.indexOf(key) === -1) {
                // add it to our keys array
                keys.push(key);
                // push this item to our final output array
                output.push(item);
            }
        });
        // return our array which should be devoid of
        // any duplicates
        return output;
    };
});

app.controller('CartController', function($scope) {
    $scope.items = [];
    $scope.count = 0;
    $scope.totalPrice = 0;
    $scope.btnFlag = false;
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if (localStorage.getItem('cartItems')) {
            let items = JSON.parse(localStorage.getItem('cartItems'));
            if (items.length) {
                $scope.count = items.length;
                $scope.items = items;
                $scope.totalPrice = calculateTotalPrice(items);
                $scope.$watch('product_id', function() {
                    for (let i = 0, _i = items.length; i < _i; i++) {
                        if (items[i].id && $scope.product_id && items[i].id == $scope.product_id) {
                            $scope.btnFlag = true
                        }
                    }
                });

            }
        }
    } else {
        // Sorry! No Web Storage support..
        alert("Sorry! No Web Storage support..");
    }

    //add items to cart
    $scope.addItems = function() {
        $scope.count = $scope.count + 1;
        let quantity = $scope.quantity || 1
        let obj = {
            title: $scope.product_title,
            id: $scope.product_id,
            image_url: $scope.product_image_url,
            quantity: quantity,
            price: quantity * $scope.product_price
        };
        $scope.items.push(obj); // push items to arrays
        localStorage.setItem('cartItems', JSON.stringify($scope.items)) //set data to localstorage
            // flag to how "add to cart" button
        $scope.btnFlag = true;
    }

    $scope.removeItem = function(id, index) {
        let _ob = [];
        let items = JSON.parse(localStorage.getItem('cartItems'));
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                $scope.totalPrice = $scope.totalPrice - items[i].price;
            } else {
                _ob.push(items[i])
            }
        }

        document.location.reload();

        localStorage.setItem('cartItems', JSON.stringify(_ob))
    }

    $scope.getItems = function() {
        return angular.copy(JSON.parse(localStorage.getItem('cartItems')));
    }

});

angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp']);
});