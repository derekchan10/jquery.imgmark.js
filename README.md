# jquery.imgmark.js

## jQuery 图片标注插件

**jquery.imgmarkjs 是一个让标签标注在图片上面的jQuery插件**

目前是1.0.0版本，支持鼠标移动标签、按下标签可更改样式、回调等操作。

### 文档

**1**.第一步引入本插件的js文件,需要和jQuery一起引用。

```html
<script src="./jquery-1.7.2.min.js"></script>
<script src="./jquery.imgmark.js"></script>
```

---


**2**.使用：

```javascript
<script type="text/javascript">
    $('.example-list li').imgmark({'container' : $('.img-box')});
</script>
```
其中`.example-list li` 为标注元素，`container`为包含了标注元素和图片的外层容器。

---

另外插件还支持以下扩展

```javascript
{
    'container' : self.parent(), // 容器
    'downFun' : '', // 鼠标点击标注事件
    'header' : 1, // 标注元素的子元素
    'callback' : '', // 回调函数
}
```

### 以上就是1.0.0版本的功能，后续会再添加。

