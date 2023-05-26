<template>
  <t-layout class="form-editor">
    <!-- <t-header>Header</t-header> -->
    <t-layout>
      <t-aside class="left">
        <component-list></component-list>
      </t-aside>
      <t-content class="content">
        <component-canvas ref="canvas" :formData.sync="formData" @Selected="selectedComponent"></component-canvas>
      </t-content>
      <t-aside class="right">
        <component-props
          :formData.sync="formData"
          :select="selectComponent"
          @changeProps="changeProps"
        ></component-props>
      </t-aside>
    </t-layout>
  </t-layout>
</template>

<script lang="ts">
import componentList from './editorComponents/list.vue';
import componentProps from './editorComponents/props.vue';
import componentCanvas from './editorComponents/canvas.vue';
import { formItems, KeysObject } from '@/utils/convet';

import _ from 'lodash'

export default {
  name: 'form-editor',
  components: { componentList, componentCanvas, componentProps },
  provide(){
    return {
      formId : this.formId
    }
  },
  props: {
    formId: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      formData: {},
      selectComponent: {},
    };
  },
  async mounted() {
    if (this.formId) {
      const { data } = await this.$request.get(`/api/system/page/detail?id=${this.formId}`);
      this.formData = {
        ..._.omit(data,['items']),
        data: KeysObject(
          data.items.map(({ name }) => ({ name })),
          'name',
        ),
        item: formItems(data.items),
      };
    }
    this.init();
  },

  methods: {
    init() {
      this.selectComponent = {};
    },
    selectedComponent(item: any) {
      this.selectComponent = item;
    },
    changeProps(item: any) {
      this.formData.item.forEach((element: { title: any; content: any[]; }) => {
        if (element.title === item.title) {
          element.content.forEach((element1: { uuid: any; }) => {
            if (element1.uuid === item.uuid) {
              element1 = item;
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.form-editor {
  width: 100%;
  height: 100%;
  .left,
  .right {
    width: 19%;
    height: 100%;
    overflow: auto;
  }
}
</style>
