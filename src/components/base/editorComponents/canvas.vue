<template>
  <t-card :bordered="false">
    <t-form
      ref="form"
      :data="formData.data"
      :label-align="formData.labelAlign"
      :label-width="formData.labelWidth"
      v-on="$listeners"
    >
      <draggable class="form-basic-container" tag="div" :list="formData.item" :group="{ title: 'g1' }">
        <div v-for="item in formData.item" class="form-basic-item" :key="item.id">
          <div class="form-basic-container-title" v-if="item.title">{{ item.title }}</div>
          <draggable
            tag="t-row"
            class="row-gap"
            :component-data="rowComponentData()"
            :list="item.content"
            :group="{ name: 'g2' }"
            @change="dropItem($event, item)"
          >
            <t-col
              v-for="field in item.content"
              :class="['row-col-item', { 'item-active': active == field.uuid }]"
              :span="field.span - 0 || 6"
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
          </draggable>
        </div>
      </draggable>
    </t-form>
  </t-card>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'component-canvas',
  components: { draggable },
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
      active: '',
    };
  },
  computed: {
    customSlots() {
      return this.$scopedSlots;
    },
  },
  watch: {
    formData: {
      handler(newVal) {
        this.$emit('formData:update', newVal);
      },
      deep: true,
    },
  },
  methods: {
    mousedown() {
      console.log('mousedown');
    },
    mousemove() {
      console.log('mousemove');
    },
    clickItem(item) {
      this.active = item.uuid;
      this.$emit('Selected', item);
    },
    rowComponentData() {
      return {
        attrs: {
          gutter: [16, 16],
        },
      };
    },
    dropItem(ev, activeItem) {
      ev.added.element.title = activeItem.title;
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/assets/base/baseFormBody.less';

.row-col-item:hover,
.item-active {
  border: 1px #288fe2 solid;
}
</style>
