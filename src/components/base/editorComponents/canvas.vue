<template>
  <t-card :bordered="false" :title="formData.name">
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
              tag="div"
              :key="field.uuid"
            >
            <div @click="clickItem(field)">
              <div v-if="active == field.uuid" class="action-btns">
                <t-button @click="copyItem(field)" size="small" theme="success"><icon name="file-copy" /></t-button>
                <t-button @click="removeItem(field)" size="small" theme="danger"><icon name="delete" /></t-button>
              </div>
              <form-item
                :key="field.name"
                :value="formData.data[field.name]"
                :label="field.label"
                v-bind="field"
                :custom-slots="customSlots"
              />
            </div>
            </t-col>
          </draggable>
        </div>
      </draggable>
    </t-form>

    <template #actions>
        <t-button size="small" style="margin-left: 10px;">预览</t-button>
        <t-button size="small" style="margin-left: 10px;">数据</t-button>
      </template>
  </t-card>
</template>

<script>
import draggable from 'vuedraggable';
import { Icon } from 'tdesign-icons-vue';
import { uuid } from '@/utils/convet';

import _ from 'lodash'

export default {
  name: 'component-canvas',
  components: { draggable , Icon  },
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
    clickItem(item) {
      this.active = item.uuid;
      this.$emit('Selected', item);
    },
    removeItem(item){
      this.formData.item.forEach((element) => {
        if (element.title === item.title) {
          const index = element.content.findIndex(item1 => item1.uuid === item.uuid);
          element.content.splice(index, 1);
        }
      });
    },
    copyItem(item){
      const citem = _.cloneDeep(item)
      this.formData.item.forEach((element) => {
        if (element.title === item.title) {
          citem.id = "";
          citem.uuid = uuid();
          element.content.push(citem);
        }
      });
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
    showLog(e){
      console.log(e);
    }
  },
};
</script>

<style lang="less" scoped>
@import '@/assets/base/baseFormBody.less';

.row-col-item:hover,
.item-active {
  border: 1px #288fe2 solid;
}

.action-btns{
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9999;
  button{
    border-radius: 0;
  }
}
</style>
