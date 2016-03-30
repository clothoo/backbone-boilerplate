define([
    'app/js/collections/exampleCollection'
], function(ExampleCollection) {
    describe('an exampleCollection', function() {
        var server;
        beforeEach(function() {
            server = sinon.fakeServerWithClock.create();
            server.respondWith('/allExamples', [200, { 'Content-Type': 'application/json' }, '[{}, {}, {}]']);
        });

        afterEach(function() {
            server.restore();
        });

        it('should have a working fetch', function() {
            var examples = new ExampleCollection;
            examples.fetch();
            server.respond();

            expect(examples).to.have.length(3);
        });
    });
});
