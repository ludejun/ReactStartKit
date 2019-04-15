module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-filename-extension": 0,
    "react/destructuring-assignment": 0,
    "react/button-has-type": 0,
    // 组件的属性类型也不检测
    "react/prop-types": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 1,
    "consistent-return": 1,
    // 对象包裹不检测
    "object-curly-spacing": 0,
    // 文件最后留一个空行
    "eol-last": 0,
    // "comma-dangle": ["error", "never"],
    // 允许class中的内部方法使用_ ，其他情况默认不允许
    "no-underscore-dangle": ["error", { "allowAfterThis": true, "enforceInMethodNames": false }],
    "max-len": ["error", 100],
    // "jsx-a11y/anchor-has-content": [ 2, { "components": [ "Anchor" ], }],
  }
};
