![Build status](https://action-badges.now.sh/matthewferry/postcss-comment-annotation?action=Test)

# PostCSS Comment Annotation 

[PostCSS] plugin for annotating comments, inspired by and based on
[morishitter](https://github.com/morishitter)'s [CSS Annotation](https://github.com/morishitter/css-annotation).

[PostCSS]: https://github.com/postcss/postcss

## Install
`npm install postcss-comment-annotation`

## Example
Annotate your CSS with key/value pairs. Keys without a defined value
results in a value of `true`.
```css
/*
@define Foo

@description
Foo is a base component
*/
.foo { }

/*
@define Bar
@parent Foo
@modifier

@description
Bar modifies Foo
*/
.foo-bar { }
```

Outputs an array to `result.commentAnnotations`.
```js
[
  {
    "define": "Foo",
    "description": "Foo is a base component"
  }, {
    "define": "Bar",
    "parent": "Foo",
    "modifier": true,
    "description": "Bar modifies Foo"
  }
]
```

## Usage

```js
postcss([
  require('postcss-comment-annotation')({
    prefix: '@'
  })
])
```

## Options

### prefix

Takes `string`.
Define the prefix to signify keys in your annotations.
Default value: `@`.

## [Changelog](./CHANGELOG.md)
