<template>
  <t-layout class="form-editor">
    <!-- <t-header>Header</t-header> -->
    <t-layout>
      <t-aside class="left">
        <component-list></component-list>
      </t-aside>
      <t-content @drop="drop($event, 'item')" class="content">
        <component-canvas :formData="formData"></component-canvas>
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script lang="ts">
import componentList from './editorComponents/list.vue';
import componentCanvas from './editorComponents/canvas.vue';
import { formItems ,KeysObject } from "@/utils/convet"

export default {
  name: 'form-editor',
  components: { componentList, componentCanvas },
  props: {
    formId: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      formData : {}
    };
  },
  async mounted() {
    if (this.formId) {
      const { data } = await this.$request.get(`/api/system/page/detail?id=${ this.formId}`);
      this.formData = {
        data : KeysObject(data.items.map(({name})=>({name})), 'name'),
        item : formItems(data.items)
      }
      console.log(this.formData);
      
    }
  },
  methods: {
    // 允许放下拖拽
    allowDrop(ev: { preventDefault: () => void; }) {
      ev.preventDefault();
    },
    // 放下事件
    drop(ev: { preventDefault: () => void; target: any; }, item: string) {
      console.log('放下', item);
      ev.preventDefault();
      const treeNode = ev.target;
      if (treeNode) {
        treeNode.appendChild(this.dom);
      }
    },
  },
};
</script>

<style scoped lang="less">
.form-editor {
  width: 100%;
  height: 100%;
  .left {
    width: 19%;
    height: 100%;
    overflow: auto;
  }
}
</style>
