# 📜 这是什么？

🎉 亲爱的掘友 ⛏️：

掘金面向从初级，中级，高级到资深各个级别的程序员的技术成长问题，招揽业界顶级的大佬撰写小册、专栏和沸点为广大掘友提供职业和生活上的帮助。

在编码时，你只需要一个快捷键，就可以快速在 vscode 中打开掘金沸点。

有了它，上班摸鱼再也不怕被老板发现了。

当然，开发它的初衷绝对不是为了上班偷懒。毕竟摸鱼一时爽，一直摸鱼...😉

# 💡 功能亮点

- 可以边写代码边刷沸点，正大光明地摸鱼。
- 可以隐藏沸点图片。
- 提供极简模式，高效摸鱼。

# 🗺️ 如何使用？

默认快捷键 `ctrl + j + j`。如果快捷键不能正常打开掘金沸点，可以自行修改快捷键，或者采用如下方式：

windows 使用 `ctrl + shift + p` / macOS 使用 `command + shift + p` 唤出插件搜索框，搜索 juejin。

# 📠 联系我

@掘友：如果您有新想法，[github 源码地址在这里](https://github.com/luzhenqian/vscode-juejin)，您完全可以自己动手实现任何想要的功能。

您也可以通过发邮件给 `15753140326@163.com` 与我联系，期待您的意见和建议。祝您摸鱼愉快。

<!-- ![example](./src/dist/images/juejin.gif) -->

# 🔍 QA

## 🧐 为什么不能发评论？

评论需要登录，我暂时还不想把这个插件做成 vscode 上的掘金客户端。如果这个需求很强烈的话，我可能会考虑做。但是掘金的接口文档又不开放，开发很费力。再说，如果很多掘友都有这个需求，那么也应该由官方来开发。或者官方给我钱，我来开发也可以。😃

根据一段时间的观察，我发现很多掘友和我一样，每天都刷沸点、看评论。但就是自己不发、不赞、不评论。我想，现在这个插件可能更适合这种人使用吧。

<div style="border-bottom: 1px solid black; margin: 1em 0;"></div>

## 🧐 为什么不能看文章？

理由有两部分。一部分是我认为在工作时间在网上查阅文章是一件很正常的事情，另一部分和为什么不能发评论一样。

用 vscode 看文章的好处是可以边看 Demo 边写代码，这样可能比用浏览器方便一些。特别是在大家的屏幕都很宽的情况下，vscode 右侧几乎都是空白的，非常浪费空间。

但如果加了这个功能，那么和在同一块屏幕上一半放 vscode 一半放浏览器有什么区别呢？可能只是体验好一些吧。但我还是找不到必须要做这个功能的理由。

<div style="border-bottom: 1px solid black; margin: 1em 0;"></div>

## 🧐 为什么在 vscode 扩展商店搜索不到？

这个问题我不应该在这里回答，既然你都搜不到了，也很可能看不到这个答案。不过也许你是从 github 看到的。

出现这个问题的原因八成是网络问题，请尝试在 [vscode 扩展商店官网中安装](https://marketplace.visualstudio.com/items?itemName=luzhenqian.juejin)，如果你无法打开这个网页，那么几乎确定就是你的网络有问题。

<div style="border-bottom: 1px solid black; margin: 1em 0;"></div>

## 🧐 我们提的新需求，你会做吗？

这个可能是大家比较关注的问题。

刚开始写这个插件只是为了我自己用，使用一段时间后，觉得还不错。出于开源精神，好东西不能自己独享，所以拿出来奉献给广大掘友，最近在社区也收到很多掘友提出的新需求。我们都是做开发的，都明白需求是永无止境的。我一个人精力有限，没办法满足所有人的需求，请见谅。我只能去做我认为合理且有必要做的功能。

<div style="border-bottom: 1px solid black; margin: 1em 0;"></div>

# 🐛 已知但尚未修复的 BUG

1. 切换到下一页时滚动条仍然在原位置，正常情况下应该滚动到页面顶部。

<!-- ## 待修复 BUG -->

<!-- TODO: 2. 各个区域颜色可配置 -->
<!-- TODO: 3. 评论区图片不显示 -->
<!-- TODO: 5. *美化操作区 -->
<!-- TODO: 6. 切换下一页后滚动条没有回到顶部 -->
<!-- TODO: 9. 在下方消息栏或右上角设置快速打开/关闭按钮 -->

# 🌌 支持版本

支持 vscode 1.43.0+ 版本，低版本的同学请自行升级。

# 🏷️ 版本历史记录

0.1.3 2020 年 3 月 20 日

1. 添加评论区回复的目标用户名高亮效果。

2. 沸点的评论为 0 条时不显示展开评论。

3. 修复沸点和评论内容不换行的 BUG。

4. 添加极简模式，可以隐藏头像。

5. 添加顶部文字定制功能。

6. 添加评论区域颜色定制功能。（暂时的解决方案，随时会用更加优雅的方式替换）

7. 添加默认快捷键 ctrl + j + j。

<div style="border-bottom: 1px solid black; margin: 1em 0;"></div>

0.1.2 2020 年 3 月 19 日

v0.1.1 版本发布时出现失误，导致代码未能正确更新，BUG 未能正常修复，重新发布。

<div style="border-bottom: 1px solid black; margin: 1em 0;"></div>

0.1.1 2020 年 3 月 19 日

修复评论显示问题。

<div style="border-bottom: 1px solid black; margin: 1em 0;"></div>

0.1.0 2020 年 3 月 18 日

初始版本，基础功能。

<div style="border-bottom: 1px solid black; margin: 1em 0;"></div>
