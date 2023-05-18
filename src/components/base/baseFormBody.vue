<template>
  <t-card :bordered="false">
    <t-form
      ref="form"
      :data="data"
      :label-align="formData.labelAlign"
      :label-width="formData.labelWidth"
      v-on="$listeners"
    >
      <div class="form-basic-container">
        <div v-for="(item, index) in formData.item" class="form-basic-item" :key="index">
          <div class="form-basic-container-title" v-if="item.title">{{ item.title }}</div>
          <t-row class="row-gap" :gutter="[16, 16]">
            <t-col v-for="field in item.content" :span="field.span || 6" :key="field.name">
              <form-item
                :key="field.name"
                :value="data[field.name]"
                :label="field.label"
                v-bind="field"
                :custom-slots="customSlots"
                @clear="handleClear"
                @change="handleChange(field.name, $event)"
                @updateLabelValue="handleLabelValue"
                @updateLabelPathValue="handleLabelPathValue"
                @updateValuePath="handleValuePath"
                @getSelectValue="getSelectValue"
              />
            </t-col>
          </t-row>
        </div>
      </div>
    </t-form>
  </t-card>
</template>

<script>
import _ from "lodash"

export default {
  name: 'base-form-body',
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data : {}
    };
  },
  computed: {
    customSlots() {
      return this.$scopedSlots;
    },
  },
  mounted(){
    this.data = _.cloneDeep(this.formData.data) 
  },
  methods: {
    async validate() {
      const data = await this.$refs.form.validate();
      if( typeof(data) === "boolean" && data){
        return this.data
      }
    },
    handleChange(key, value) {
      this.$nextTick(() => {
        this.data[key] = value;
      });
    },
    handleClear(key, value) {
      this.data[key] = value;
    },
    handleLabelValue(key, value) {
      this.data[key] = value;
    },
    handleLabelPathValue(key, value) {
      this.data[`_${key}Path`] = value;
    },
    handleValuePath(key, value) {
      this.data[`_${key}ValuePath`] = value;
    },
    getRef() {
      return this.$refs.form;
    },
    getSelectValue(key, value) {
      this.$emit('getSelectValue', key, value);
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/assets/base/baseFormBody';
</style>
