<template>
  <t-card :bordered="false">
    <t-form
      ref="form"
      :data="formData.data"
      :label-align="formData.labelAlign"
      :label-width="formData.labelWidth"
      v-on="$listeners"
    >
      <div class="form-basic-container">
        <div v-for="item in formData.item" class="form-basic-item" :key="item.id">
          <div class="form-basic-container-title" v-if="item.title">{{ item.title }}</div>
          <t-row class="row-gap" :gutter="[16, 16]">
            <t-col
              v-for="field in item.content"
              :class="['row-col-item', { 'item-active' : active == field.name  }]"
              :span="field.span-0 || 6"
              :key="field.name"
            >
              <form-item
                @click="clickItem(field)"
                :key="field.name"
                :value="formData.data[field.name]"
                :label="field.label"
                v-bind="field"
                :custom-slots="customSlots"
              />
            </t-col>
          </t-row>
        </div>
      </div>
    </t-form>
  </t-card>
</template>

<script>
export default {
  name: 'component-canvas',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      drag: false,
      active : ""
    };
  },
  computed: {
    customSlots() {
      return this.$scopedSlots;
    },
  },
  watch: {},
  methods: {
    mousedown() {
      console.log('mousedown');
    },
    mousemove() {
      console.log('mousemove');
    },
    clickItem(item){
      this.active = item.name
      this.$emit("Selected",item)
    }
  },
};
</script>

<style lang="less" scoped>
@import '@/assets/base/baseFormBody.less';

.row-col-item:hover,
.item-active {
  padding: 10px;
  border: 1px #288fe2 solid;
}
</style>
