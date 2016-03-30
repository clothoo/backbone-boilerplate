define([
    'app/js/models/exampleModel'
], function(ExampleModel) {
    describe('An exampleModel', function() {
        it('should contain defaults', function() {
            var example = new ExampleModel;

            expect(example.get('isRead')).to.not.be.ok;
        });

        it('should allow toggling', function() {
            var example = new ExampleModel();

            example.toggle();
            expect(example.get('isRead')).to.be.true;
        });
    });
});
