const postcss = require('postcss');
const fs = require('fs');
const plugin = require('./');
const css = fs.readFileSync('index.test.css', 'utf-8');
const opts = {
    prefix: '#'
};

it('should not modify any output CSS', () => {
    return postcss([plugin]).process(css)
        .then(result => {
            expect(result.css).toEqual(css);
        });
});

it('should only push comments that have annotations', () => {
    return postcss([plugin]).process(css)
        .then(result => {
            expect(result.commentAnnotations).toHaveLength(1);
        });
});

it('should create property for default prefixed keys', () => {
    return postcss([plugin]).process(css)
        .then(result => {
            expect(result.commentAnnotations[0]).toHaveProperty('foo');
        });
});

it('should use option prefix to create properties', () => {
    return postcss([plugin(opts)]).process(css)
        .then(result => {
            expect(result.commentAnnotations[0]).toHaveProperty('foo');
        });
});

it('should create a value for single line annotations', () => {
    return postcss([plugin]).process(css)
        .then(result => {
            expect(result.commentAnnotations[0]).toHaveProperty('foo', 'Bar');
        });
});

it('should create a value for multi line annotations', () => {
    return postcss([plugin]).process(css)
        .then(result => {
            expect(result.commentAnnotations[0])
                .toHaveProperty('qux', 'Foo bar\nbaz qux');
        });
});

it('should take key without value as boolean', () => {
    return postcss([plugin]).process(css)
        .then(result => {
            expect(result.commentAnnotations[0]).toHaveProperty('baz', true);
        });
});
