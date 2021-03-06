'use strict';

var Router = require('routr'),
    querystring = require('querystring'),
    router,

// The single routing action can be used at both server/client side.
routingAction = function () {
    var url = this.getStore('page')._get('url'),
        path = url ? url.pathname : undefined,
        route = url ? router.getRoute(path) : undefined;

    if (!route) {
        return Promise.reject('no matched route for path: ' + path);
    }

    this.dispatch('UPDATE_ROUTING', {
        name: route.name,
        params: route.params
    });

    return this.executeAction(route.config.action);
},

getURL = function (name, param, query) {
    var qs = querystring.encode(query),
        path = router.makePath(name, param);

    if (!path) {
        throw new Error('Can not generate URL by route name: \'' + name + '\' !');
    }

    return path + (qs ? '?' + qs : '');
};

module.exports = function (config) {
    router = new Router(config);

    return {
        routing: routingAction,
        getURL: getURL,
        routeToURL: require('fluxex/extra/routeToURL')
    };
};

module.exports.mixin = {
    getURL: function (name, param, query) {
        return this._getContext().getURL(name, param, query);
    }
};
