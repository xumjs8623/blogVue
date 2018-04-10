<template>
  <div>
    <div :id="'editorTrigger'"></div>
  </div>
</template>
<script>
import E from 'wangeditor'
import url from '../../../config/url'
export default {
  mounted: function () {
    // 创建编辑器
    var _this = this
    var editor = new E('#editorTrigger')
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      // 'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video' // 插入视频
      // 'code',  // 插入代码
      // 'undo' // 撤销
      // 'redo'  // 重复
    ]
    editor.customConfig.uploadImgServer = url + '/admin/upload'
    editor.customConfig.uploadFileName = 'file'
    editor.customConfig.withCredentials = true
    editor.customConfig.onchange = function (html) {
      _this.getVal(html)
    }
    editor.create()
    console.log(this.info)
    editor.txt.html(this.info)
    this.editor = editor
  },
  watch: {
    reset: function () {
      // this.info = ''
      this.editor.txt.html(this.info)
    }
  },
  props: ['info', 'getVal', 'reset']
}
</script>
