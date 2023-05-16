<template>
  <t-form
    ref="form"
    :data="formData"
    :label-width="80"
    colon
    @reset="onReset"
    @submit="onSubmit"
    :style="{ marginBottom: '8px' }"
  >
    <t-row>
      <t-col :span="10">
        <t-row :gutter="[16, 24]">
          <t-col v-for="item in formItem" :key="item.id" :flex="item.flex">
            <t-form-item :label="item.label" :name="item.name">
              <component
              :is="item.component"
              v-bind="item.props"
              />
            </t-form-item>
          </t-col>
        </t-row>
      </t-col>
      <t-col :span="2" class="operation-container">
        <t-button theme="primary" type="submit" :style="{ marginLeft: '8px' }"> 查询 </t-button>
        <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
      </t-col>
    </t-row>
  </t-form>
</template>

<script>
export default {
  name: 'base-search-form',
  props: {
    formId : {
      type: [String,Number],
      default: "",
    },
    formData: {
      type: Object,
      default: () => {},
    },
    formItem : {
      type : Array,
      default : ()=>[]
    }
  },
  data() {
    return {
    };
  },
  mounted(){
    console.log(this.formId);
  },
  methods: {
    onReset(data) {
      console.log(data);
    },
    onSubmit(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.form-item-content {
  width: 100%;
}

.operation-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
