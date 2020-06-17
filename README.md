# 可拖拽调整左右宽度的react容器组件

### INSTALL

``` bash
$ npm install resize-wrap --save-dev
```

### USE

```
import ResizeWrap from 'resize-wrap';

export default () => (
    <ResizeWrap
        leftPart={<div>left component</div>}
        rightPart={<div>right component</div>}
    />
)
```

### API

| 属性 | 类型 | 默认值 |
| ------ | ------ | ------ |
| leftPart | ReactNode | &#60;div&#62;&#60;/div&#62; |
| rightPart | ReactNode | &#60;div&#62;&#60;/div&#62; |
| leftMinWidth | number | 0 |
| rightMinWidth | number | 0 |
| height | number | 600 |
| width | number | 800 |
