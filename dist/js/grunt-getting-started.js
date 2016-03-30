define([], function() {
    var App = function() {};

    App.prototype = {};

    return App;
});
;requirejs.config({
    paths: {
        jquery: 'js/lib/jquery',
        backbone: 'js/lib/backbone',
        underscore: 'js/lib/underscore',
        text: 'js/lib/text'
    },

    shim: {
        underscore: {
            exports: '_'
        }
    }

});

require([
    'app'
], function(App) {
    window.enos = new App();
});
