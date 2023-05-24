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
                <!-- <a class="t-button-link" @click="optionActions('detail',slotProps)">详情</a> -->
                <a class="t-button-link" @click="optionActions('update', slotProps)">编辑</a>
                <a class="t-button-link" @click="optionActions('delete', slotProps)">删除</a>
              </template>
            </base-table>
          </div>
        </div>
      </div>
      <t-dialog v-bind="dialogConfig" :visible.sync="confirmVisible" @confirm="onConfirm">
        <component
          :is="dialogConfig.component"
          v-if="confirmVisible"
          ref="form"
          :formId="formId"
          :formData="formData"
        ></component>
      </t-dialog>
    </div>
  </t-card>
</template>
<script>
import { SearchIcon } from 'tdesign-icons-vue';
import model from './model';

import _ from 'lodash'

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
      formType: '',
      dialog: {},
      formId: '',
    };
  },
  computed: {
    dialogConfig() {
      const config = { ...this.dialog };
      config.header = this.acType === 'info' ? '页面详情' : '新增页面';
      return config;
    },
    formData() {
      let form = {};
      switch (this.formType) {
      case '1':
        form = model.typeForm;
        break;
      case '2':
        form = model.typeForm;
        break;
      case '3':
        form = model.typeForm;
        break;
      default:
        form = model.typeForm;
        break;
      }
      return form;
    },
  },
  methods: {
    onInput() {
      this.filterByText = (node) => {
        const rs = node.label.indexOf(this.filterText) >= 0;
        return rs;
      };
    },
    createPage() {
      this.acType = 'add';
      this.dialog = {
        component: 'base-form-body',
      };
      this.formType = '';
      this.confirmVisible = true;
    },
    async onConfirm() {
      if (this.acType === 'add') {
        const data = await this.$refs.form.validate();
        if (!data) return false;
        this.acType = 'edit';
        this.formType = data.type;
        this.confirmVisible = false;
        setTimeout(() => {
          this.dialog = {
            width: '100%',
            class: 'dialog-full-screen',
            component: 'form-editor',
            showInAttachedElement: true,
          };
          this.confirmVisible = true;
        }, 1000);
      } else {
        const formDatas = this.$refs.form.formData;
        const formItems = [];
        formDatas.item.forEach(element => {
          element.content.forEach(item => {
            formItems.push(item)
          })
        });
        const requestBody = {
          form : _.omit(formDatas,['data','item']),
          item : formItems,
        };
        const { data } = await this.$request.post('/api/system/page/updateFormData',requestBody);
        if(data === "提交成功"){
          this.$message.success("提交成功!");
        }else{
          this.$message.error(data);
        }
      }
    },
    optionActions(type, row) {
      this[type](row);
    },
    update({ row }) {
      this.acType = 'info';
      this.dialog = {
        width: '100%',
        class: 'dialog-full-screen',
        component: 'form-editor',
        showInAttachedElement: true,
      };
      this.formId = row.id;
      this.formType = row.formType;
      this.formData.data = row;
      this.confirmVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.table-tree-container {
  position: relative;
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
