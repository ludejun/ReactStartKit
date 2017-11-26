module.exports = {
  "env": {
    "browser": true
  },
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-filename-extension": 0,
    //无状态的组件目前不检测
    "react/prefer-stateless-function": 0,
    //组件的属性类型也不检测
    "react/prop-types": [2, {
      ignore: ['children']
    }],
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 1,
    "consistent-return": 1,
    //对象包裹不检测
    "object-curly-spacing": 0,
    //文件最后留一个空行
    "eol-last": 0,
    "comma-dangle": ["error", "never"]
  }
};