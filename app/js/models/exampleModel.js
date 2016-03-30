define([
    'backbone'
], function(Backbone) {
    var ExampleModel = Backbone.Model.extend({
        defaults: {
            isRead: false
        },
        toggle: function() {
            this.set('isRead', !this.get('isRead'));
        }
    });

    return ExampleModel;
});
