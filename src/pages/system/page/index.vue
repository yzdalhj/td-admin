<template>
  <t-card :bordered="false">
    <div class="table-tree-container">
      <div class="list-tree-wrapper">
        <div class="list-tree-operator">
          <t-input v-model="filterText" @input="onInput" placeholder="请输入关键词">
            <search-icon slot="suffix-icon" size="20px" />
          </t-input>
          <t-tree :data="items" hover expand-on-click-node :filter="filterByText" />
        </div>
        <div class="list-tree-content">
          <t-row justify="space-between">
            <div class="left-operation-container">
              <t-button @click="createPage"> 新建页面 </t-button>
            </div>
            <t-input v-model="searchValue" class="search-input" placeholder="请输入你需要搜索的内容" clearable>
              <template #suffix-icon>
                <search-icon size="20px" />
              </template>
            </t-input>
          </t-row>
          <div class="table-container">
            <base-table :columns="columns" height="70vh" api="/api/system/page/findPage">
              <template #op="slotProps">
                <a class="t-button-link" @click="handleClickDetail()">详情</a>
                <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
              </template>
            </base-table>
          </div>
        </div>
      </div>
    </div>
    <t-dialog
      v-bind="dialogConfig"
      :visible.sync="confirmVisible"
      @confirm="onConfirmDelete"
      :onCancel="() => (confirmVisible = false)"
    >
    </t-dialog>
  </t-card>
</template>
<script>
import { SearchIcon } from 'tdesign-icons-vue';
import model from './model';

export default {
  name: 'ListTree',
  components: {
    SearchIcon,
  },
  data() {
    return {
      data: [],
      filterText: '',
      filterByText: null,
      items: model.pageList.treeList,
      columns: model.pageList.columns,
      confirmVisible: false,
      searchValue: '',
      acType: '',
    };
  },
  computed: {
    dialogConfig() {
      const config = {};
      config.header = this.acType === 'info' ? '页面详情' : '新增页面';
      return config;
    },
  },
  methods: {
    onInput() {
      this.filterByText = (node) => {
        const rs = node.label.indexOf(this.filterText) >= 0;
        return rs;
      };
    },
    rehandleClickOp({ text, row }) {
      console.log(text, row);
    },
    createPage() {
      this.acType = 'add';
      this.confirmVisible = true;
    },
    onConfirmDelete() {},
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-default);

  .t-tree {
    margin-top: 24px;
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
}

.list-tree-operator {
  width: 200px;
  float: left;
  padding: 30px 32px;
}

.list-tree-content {
  border-left: 1px solid var(--td-component-border);
  overflow: auto;
}

.left-operation-container {
  padding: 0 0 0 10px;
  margin-bottom: 8px;

  .selected-count {
    display: inline-block;
    margin-left: var(--td-comp-margin-s);
    color: var(--td-text-color-secondary);
  }
}

.search-input {
  width: 360px;
}
</style>
