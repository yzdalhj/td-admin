<template>
  <div>
    <div class="table-container">
      <t-table
        :columns="columns"
        :data="data"
        :rowKey="rowKey"
        :verticalAlign="verticalAlign"
        :hover="hover"
        :height="height"
        :pagination="pagination"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
        @select-change="rehandleSelectChange"
        :headerAffixedTop="true"
        :headerAffixProps="{ offsetTop: offsetTop, container: getContainer }"
      >
        <template v-for="item in columns" v-slot:[item.colKey]="{ row }">
          <slot v-if="!item.slots">{{ row[item.colKey] }}</slot>
          <slot v-else :name="item.colKey" :row="row"></slot>
        </template>
      </t-table>
    </div>
  </div>
</template>
<script lang="ts">
import { prefix } from '@/config/global';

export default {
  name: 'BaseTable',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    height : {
      type: [String,Number],
      default: "66vh",
    },
    searchForm : {
      type: Object,
      default: () => {},
    },
    api : {
      type: String,
      default: "",
    }

  },
  data() {
    return {
      prefix,
      dataLoading: false,
      data: [],
      selectedRowKeys: [1, 2],
      rowKey: 'index',
      tableLayout: 'auto',
      verticalAlign: 'top',
      hover: true,
      rowClassName: (rowKey: string) => `${rowKey}-class`,
      // 与pagination对齐
      pagination: {
        defaultPageSize: this.pageSize,
        total: 0,
        defaultCurrent: 1,
      },
      deleteIdx: -1,
    };
  },
  computed: {
    offsetTop() {
      return this.$store.state.setting.isUseTabsRouter ? 48 : 0;
    },
  },
  mounted() {
    this.getTableData();
  },

  methods: {
    getTableData() {
      this.dataLoading = true;
      this.$request
        .post(this.api , this.searchForm)
        .then((res) => {
          if (res.code === 1) {
            const { list = [] , total } = res.data;
            this.data = list;
            this.pagination = {
              ...this.pagination,
              total,
            };
          }
        })
        .catch((e: Error) => {
          console.log(e);
        })
        .finally(() => {
          this.dataLoading = false;
        });
    },
    getContainer() {
      return document.querySelector('.tdesign-starter-layout');
    },
    rehandlePageChange(curr, pageInfo) {
      console.log('分页变化', curr, pageInfo);
    },
    rehandleSelectChange(selectedRowKeys: number[]) {
      this.selectedRowKeys = selectedRowKeys;
    },
    rehandleChange(changeParams, triggerAndData) {
      console.log('统一Change', changeParams, triggerAndData);
    },
    resetIdx() {
      this.deleteIdx = -1;
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables';

.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
}

.left-operation-container {
  padding: 0 0 6px 0;
  margin-bottom: 16px;

  .selected-count {
    display: inline-block;
    margin-left: var(--td-comp-margin-s);
    color: var(--td-text-color-secondary);
  }
}

.search-input {
  width: 360px;
}

.t-button + .t-button {
  margin-left: var(--td-comp-margin-s);
}
</style>
