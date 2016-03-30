define([
    'backbone',
    '../models/exampleModel'
], function(Backbone, ExampleModel) {
    var ExampleCollection = Backbone.Collection.extend({
        model: ExampleModel,
        url: "/allExamples"
    });

    return ExampleCollection;
});
