require(["serializer"], function(serializer) {
    describe('Serializer', function() {
        var __localStorage = null;

        beforeEach(function() {
            __localStorage = window.localStorage;
            window.localStorage = {};
        });

        afterEach(function() {
            window.localStorage = __localStorage;
        });

        it('works for simple objects', function() {
            var obj = {a: 1, b: 2, c: {d: 3, e: 4}};
            serializer.save("name1", obj);
            expect(window.localStorage.name1).not.toBeUndefined();
            var restored = serializer.load("name1");
            expect(restored).toEqual(obj);
        });

        it('works for objects with circular dependencies', function() {
            var a = {x: 1};
            var b = {a: a, y: 2};
            a.b = b;
            var data = {a: a, b: b};
            function f() {
                serializer.save("name", data);
            }
            expect(f).not.toThrow();
            var restored = serializer.load("name");
            console.info(restored);
            expect(restored).toEqual(data);
        });
    });
});
