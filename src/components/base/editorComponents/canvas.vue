<template>
    <t-card :bordered="false">
      <t-form
        ref="form"
        :data="formData.data"
        :label-align="formData.labelAlign"
        :label-width="formData.labelWidth"
        v-on="$listeners"
      >
        <div v-for="item in formData.item" class="form-basic-item" :key="item.id">
          <div class="form-basic-container-title" v-if="item.title">{{ item.title }}</div>
          <t-row class="row-gap" :gutter="[16, 16]">
            <t-col v-for="field in item.content" :span="field.span || 6" :key="field.name">
              <form-item
                :key="field.name"
                :value="formData.data[field.name]"
                :label="field.label"
                v-bind="field"
                :custom-slots="customSlots"
              />
            </t-col>
          </t-row>
        </div>
      </t-form>
    </t-card>
</template>
<style scoped>
/*被拖拽对象的样式*/
.item {
  padding: 6px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
}
/*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}
</style>
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
    };
  },
  computed: {
    customSlots() {
      return this.$scopedSlots;
    },
  },
  watch: {},
  methods: {
    onStart() {
      this.drag = true;
    },
    onEnd() {
      this.drag = false;
    },
  },
};
</script>

<!-- <template>
    <div>

    </div>
</template>

<script>
export default{
  name : "component-canvas"
}
</script> -->
