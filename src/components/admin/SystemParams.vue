<template lang="html">
  <el-row>
    <!-- 面包屑 -->
    <el-col :span="24">
      <bread-crumb></bread-crumb>
    </el-col>
    <!-- 标签切换 -->
    <el-col :span="24" class="systemParams-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- 开票信息配置 -->
        <el-tab-pane label="转账配置" name="first">
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-form label-width="100px">
                <el-input type="hidden" v-model="bankForm.id" placeholder=""></el-input>
                <el-form-item label="网点：">
                  <el-select v-model="bankForm.orgId" placeholder="请选择">
                    <el-option
                      v-for="item in orgList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="户名：">
                  <el-input v-model="bankForm.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="账号：">
                  <el-input v-model="bankForm.countNumber" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="开户行：">
                  <el-input v-model="bankForm.bank" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="bankFormSubmit">提交</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 轮播配置 -->
        <el-tab-pane label="轮播配置" name="second">
          <el-row>
            <el-col :span="24">
              <p>注：首页轮播图片尺寸为1000像素*400像素，其他尺寸会造成海报显示不全问题</p>
            </el-col>
            <el-col :span="24">
                <el-form ref="ruleForm" label-width="200px">
                  <el-row type="flex" align="middle">
                    <el-col :span="12">
                      <el-form-item label="轮播图片一：">
                        <ImageUpload :setVal="setBanner1" :imgVal="ruleForm.bannerArr1"></ImageUpload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="轮播图片一链接：">
                        <el-input v-model="ruleForm.bannerLink1" placeholder="请输入链接"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" align="middle">
                    <el-col :span="12">
                      <el-form-item label="轮播图片二：">
                        <ImageUpload :setVal="setBanner2" :imgVal="ruleForm.bannerArr2"></ImageUpload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="轮播图片二链接：">
                        <el-input v-model="ruleForm.bannerLink2" placeholder="请输入链接"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" align="middle">
                    <el-col :span="12">
                      <el-form-item label="轮播图片三：">
                        <ImageUpload :setVal="setBanner3" :imgVal="ruleForm.bannerArr3"></ImageUpload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="轮播图片三链接：">
                        <el-input v-model="ruleForm.bannerLink3" placeholder="请输入链接"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" align="middle">
                    <el-col :span="12">
                      <el-form-item label="轮播图片四：">
                        <ImageUpload :setVal="setBanner4" :imgVal="ruleForm.bannerArr4"></ImageUpload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="轮播图片四链接：">
                        <el-input v-model="ruleForm.bannerLink4" placeholder="请输入链接"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item class="system-banner">
                    <el-button type="primary" @click="formSubmit">提交</el-button>
                    <el-button type="primary">重置</el-button>
                  </el-form-item>
                </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import breadCrumb from './BreadCrumb'
import ImageUpload from './ImageUpload'
export default {
  components: {
    breadCrumb,
    ImageUpload
  },
  data () {
    return {
      activeName: 'first',
      bankForm: { // 转账信息
        id: '',
        orgId: '',
        name: '',
        countNumber: '',
        bank: ''
      },
      orgList: [], // 网点列表
      bankList: [], // 转账信息列表
      ruleForm: { // 轮播表单
        banner1: '',
        banner2: '',
        banner3: '',
        banner4: '',
        bannerLink1: '',
        bannerLink2: '',
        bannerLink3: '',
        bannerLink4: '',
        bannerArr1: [],
        bannerArr2: [],
        bannerArr3: [],
        bannerArr4: []
      }
    }
  },
  created () {
    this.getInfo()
    // 获取银行转账信息
    this.bankGet()
  },
  watch: {
    'bankForm.orgId': function (newValue, oldValue) {
      for (let i = 0, n = this.bankList.length; i < n; i++) {
        if (String(this.bankList[i].orgId) === String(newValue)) {
          for (let x in this.bankForm) {
            if (x !== 'orgId') {
              this.bankForm[x] = ''
              this.bankForm[x] = this.bankList[i][x]
            }
          }
        } else {
          // 如果下拉选中的网点还没有转账信息
          for (let x in this.bankForm) {
            if (x !== 'orgId') {
              this.bankForm[x] = ''
            }
          }
        }
      }
    }
  },
  methods: {
    // tag标签点击事件
    handleClick (tab, event) {
    },
    // 转账信息提交事件
    bankFormSubmit () {
    },
    // 转账信息获取
    bankGet () {
    },
    // 表单提交事件
    formSubmit () {
    },
    // 获取轮播图片信息
    getInfo () {
    },
    // 设置轮播图片1
    setBanner1 (url) {
      this.ruleForm.banner1 = url
    },
    // 设置轮播图片2
    setBanner2 (url) {
      this.ruleForm.banner2 = url
    },
    // 设置轮播图片3
    setBanner3 (url) {
      this.ruleForm.banner3 = url
    },
    // 设置轮播图片4
    setBanner4 (url) {
      this.ruleForm.banner4 = url
    }
  }
}
</script>

<style lang="css">
  .system-banner {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 20px
  }
  .systemParams-tab{
    margin-top: 20px;
  }
</style>
