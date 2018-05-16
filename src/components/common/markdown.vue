<template lang="html">
  <el-row>
    <el-col :span="24">
      <mavon-editor :value="initValue" class="markdown-height" @change="contentChange" placeholder="" :ishljs="true" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    getValue: {
      type: Function,
      required: true
    },
    initValue: {
      type: String
    }
  },
  methods: {
    contentChange (value, render) {
      // value markdwon 语法的原始值
      // render 解析完的html值
      this.getValue(value)
    },
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      axios({
        url: 'server url',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
        * $vm 指为mavonEditor实例，可以通过如下两种方式获取
        * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
        * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
        */
        // $vm.$img2Url(pos, url)
      })
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    }
  }
}
</script>
<style lang="css" scope>
.markdown-height{
  height: 450px;
}
</style>
