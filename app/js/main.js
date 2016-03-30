requirejs.config({
    paths: {
        jquery: 'lib/jquery',
        backbone: 'lib/backbone',
        lodash: 'lib/lodash',
        text: 'lib/text'
    },

    shim: {
        'backbone': {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },

        app: {
            deps: ['backbone']
        }
    },

    map: {
        '*': {
            'underscore': 'lodash'
        }
    }

});

require([
    'app'
], function(Backbone) {
    console.log($('body'));
    console.log(_.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 }));
    console.log(Backbone);
});
