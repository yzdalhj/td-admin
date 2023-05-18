export default {
  pageList: {
    treeList: [
      {
        label: '深圳总部',
        value: 0,
        children: [
          {
            label: '总办',
            value: '0-0',
          },
          {
            label: '市场部',
            value: '0-1',
            children: [
              {
                label: '采购1组',
                value: '0-1-0',
              },
              {
                label: '采购2组',
                value: '0-1-1',
              },
            ],
          },
          {
            label: '技术部',
            value: '0-2',
          },
        ],
      },
      {
        label: '北京总部',
        value: 1,
        children: [
          {
            label: '总办',
            value: '1-0',
          },
          {
            label: '市场部',
            value: '1-1',
            children: [
              {
                label: '采购1组',
                value: '1-1-0',
              },
              {
                label: '采购2组',
                value: '1-1-1',
              },
            ],
          },
        ],
      },
      {
        label: '上海总部',
        value: 2,
        children: [
          {
            label: '市场部',
            value: '2-0',
          },
          {
            label: '财务部',
            value: '2-1',
            children: [
              {
                label: '财务1组',
                value: '2-1-0',
              },
              {
                label: '财务2组',
                value: '2-1-1',
              },
            ],
          },
        ],
      },
      {
        label: '湖南',
        value: 3,
      },
      {
        label: '湖北',
        value: 4,
      },
    ],
    columns: [
      { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
      {
        title: '页面名称',
        width: 250,
        ellipsis: true,
        colKey: 'name',
      },
      { title: '页面状态', colKey: 'status', cell: { col: 'status' } },
      {
        title: '页面类型',
        ellipsis: true,
        colKey: 'type',
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
  },
  typeForm: {
    data: {
      cname: '',
      type: '',
    },
    labelAlign: 'left',
    labelWidth: 80,
    item: [
      {
        // title: '123',
        content: [
          {
            span: 12,
            label: '页面名称',
            name: 'cname',
            component: 't-input',
            rules: [{ required: true, message: '请输入名称' }],
          },
          {
            span: 12,
            label: '页面类型',
            name: 'type',
            component: 't-select',
            options: [
              { label: '数据列表', value: '1' },
              { label: '数据表单', value: '2' },
              { label: '详情页', value: '3' },
            ],
            rules: [{ required: true}],
          },
        ],
      },
    ],
  },
};
