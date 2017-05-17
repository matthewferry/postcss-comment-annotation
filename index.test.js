const postcss = require('postcss');
const plugin = require('./');

const css = `
/*
@define Link

@boolean

@description
Pink anchors
are super hip
*/
a { color: blue; }
/* #define Empty comment block #boolean*/
/* @define Empty comment block @boolean*/
`;

const opts = {
    prefix: '#'
};

it('should not modify any output CSS', () => {
    return postcss([ plugin ]).process(css)
        .then(result => {
            expect(result.css).toEqual(css);
        });
});

it('should return array of objects for each annotated comment block', () => {
    return postcss([ plugin ]).process(css)
        .then(result => {
            expect(result.commentAnnotations).toHaveLength(2);
        });
});

it('should create annotation property for default prefixed keys', () => {
    return postcss([ plugin ]).process(css)
        .then(result => {
            expect(result.commentAnnotations[0]).toHaveProperty('define');
        });
});

it('should use option prefix to create annotation property', () => {
    return postcss([plugin(opts)]).process(css)
        .then(result => {
            expect(result.commentAnnotations[0]).toHaveProperty('define');
        });
});

it('should create a value for single line annotations', () => {
    return postcss([plugin]).process(css)
        .then(result => {
            expect(result.commentAnnotations[0])
                .toHaveProperty('define', 'Link');
        });
});

it('should create a value for multi line annotations', () => {
    return postcss([plugin]).process(css)
        .then(result => {
            expect(result.commentAnnotations[0])
                .toHaveProperty('description', 'Pink anchors\nare super hip');
        });
});

it('should take key without value as boolean', () => {
    return postcss([plugin]).process(css)
        .then(result => {
            expect(result.commentAnnotations[0])
              .toHaveProperty('boolean', true);
        });
});
