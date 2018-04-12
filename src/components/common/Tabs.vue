<template>
  <el-row>
    <el-col :span="2" class="tabs-aline">
      <!-- <i :class="menusTag" @click="setMenusCollapse"></i> -->
    </el-col>
    <el-col :span="21">
      <el-tabs :value="activeTabsName" type="card" closable @tab-click="tabClick" @tab-remove="removeTab" class="common-tabs">
        <el-tab-pane
          v-for="item in tableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          class="tabsSelected">
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="1" class="tabs-aline"></el-col>
  </el-row>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      tableTabs: 'getTabs',
      activeTabsName: 'getActiveIndex',
      isCollapse: 'getMenusCollapse'
    }),
    menusTag: function () {
      if (this.isCollapse) {
        return 'el-icon-caret-right'
      } else {
        return 'el-icon-caret-left'
      }
    }
  },
  methods: {
    ...mapActions([
      'addTabs',
      'deleteTabs',
      'setActiveIndex'
    ]),
    aaa () {
      console.log(123)
    },
    // 点击选项卡后的索引设置
    tabClick (target) {
      this.setActiveIndex(target.name)
      for (let i = 0, len = this.tableTabs.length; i < len; i++) {
        if (this.tableTabs[i].name === target.name) {
          this.$router.push({path: this.tableTabs[i].url})
        }
      }
    },
    removeTab (targetName) {
      if (targetName === '0') {
        this.$message({
          message: '首页禁止删除',
          type: 'warning'
        })
        return
      }
      // 如果只剩下一个元素了，那么禁止删除
      if (this.tableTabs.length === 1) {
        return
      }
      // 查询删除的标签在数组中的索引
      let deleteIndex = ''
      for (let i = 0, len = this.tableTabs.length; i < len; i++) {
        if (this.tableTabs[i].name === targetName) {
          deleteIndex = i
        }
      }
      if (targetName === this.activeTabsName) {
        // 如果删除的标签为正选中的标签，不是最后一个元素那么选中标签的索引退一位，是最后一个元素那么选中的标签进一位
        if (deleteIndex < (this.tableTabs.length - 1)) {
          this.setActiveIndex(this.tableTabs[Number(deleteIndex) + 1].name)
          this.$router.push({path: this.tableTabs[Number(deleteIndex) + 1].url})
        } else {
          this.setActiveIndex(this.tableTabs[Number(deleteIndex) - 1].name)
          this.$router.push({path: this.tableTabs[Number(deleteIndex) - 1].url})
        }
      }
      // 删除标签
      this.deleteTabs(deleteIndex)
    }
  }
}
</script>
<style>
.common-tabs{
  margin-top: 9px;
}
.tabs-aline{
  border-bottom: 1px solid #e4e7ed;
  height: 50px;
}
.el-tabs__item.is-active{
  background-color: #f1f1f1;
  border-bottom: solid 1px #f1f1f1 !important;
}

</style>
