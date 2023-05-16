<template>
  <t-card :bordered="false">
    <div class="list-common-table">
        <base-search-form :formId="formId"></base-search-form>
        <div class="table-container">
          <t-row justify="space-between">
            <div class="left-operation-container">
              <t-button> 新建页面 </t-button>
            </div>
          </t-row>
          <div class="table-container">
            <base-table :columns="columns" height="100%" :api="api">
              <template #op="slotProps">
                <a class="t-button-link" @click="handleClickDetail()">详情</a>
                <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
              </template>
            </base-table>
          </div>
        </div>
    </div>
  </t-card>
</template>
<script>

export default {
  name: 'ListTree',
  data() {
    return {
      data: [],
      columns: [
        { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
        {
          title: '合同名称',
          align: 'left',
          width: 250,
          ellipsis: true,
          colKey: 'name',
          fixed: 'left',
        },
        { title: '合同状态', colKey: 'status', cell: { col: 'status' } },
        {
          title: '合同编号',
          width: 200,
          ellipsis: true,
          colKey: 'no',
        },
        {
          title: '合同类型',
          ellipsis: true,
          colKey: 'contractType',
        },
        {
          title: '合同收付类型',
          ellipsis: true,
          colKey: 'paymentType',
        },
        {
          title: '合同金额 (元)',
          width: 200,
          ellipsis: true,
          colKey: 'amount',
        },
        {
          align: 'left',
          fixed: 'right',
          width: 200,
          slots: true,
          colKey: 'op',
          title: '操作',
        },
      ],
      formId : this.$route.meta.formId,
      api : ""
    };
  },
  async mounted(){
    const { data } = await this.$request.get(`/api/system/page/detail?id=${this.formId}`);
    console.log(data)
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
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: 30px 32px;
  border-radius: var(--td-radius-default);
}

.left-operation-container {
  padding: 0 0 0 10px;
  margin-bottom: 8px;

}

.search-input {
  width: 360px;
}
</style>
