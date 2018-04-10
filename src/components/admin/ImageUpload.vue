<template>
  <el-row>
    <el-col :span="24">
      <el-upload ref="upload" :action="imgUrl" :file-list="imgList" list-type="picture-card" :on-success="setImg" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :with-credentials="true">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import url from '../../../config/url'
export default {
  data () {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      imgUrl: url + '/admin/upload'
    }
  },
  props: ['setVal', 'imgVal'],
  computed: {
    imgList: function () {
      // this.imgList = []
      return this.imgVal
    }
  },
  methods: {
    // 删除图片时回调
    handleRemove (file, fileList) {
      for (let i = 0; i < this.imgList; i++) {
        if (this.imgList[i].url === file.url) {
          this.imgList.splice(i)
        }
      }
      this.setVal('')
    },
    // 新增图片是回调
    setImg (response, file, fileList) {
      console.log(this.imgList)
      // 清空图片列表
      this.imgList.length = 0
      console.log('清空数组')
      console.log(this.imgList)
      this.imgList.push({name: file.name, url: response.data[0]})
      // 调用父组件，设置父组件中的图片地址
      this.setVal(response.data[0])
    },
    handlePictureCardPreview (file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
