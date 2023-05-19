<template>
    <t-layout class="form-editor">
      <!-- <t-header>Header</t-header> -->
        <t-layout>
          <t-aside class="left">
            <component-list></component-list>
          </t-aside>
          <t-content @drop="drop($event,'item')" class="content">
            <component-canvas></component-canvas>
          </t-content>
        </t-layout>
    </t-layout>
</template>

<script lang="ts">
import componentList from './editorComponents/list.vue';
import componentCanvas from './editorComponents/canvas.vue';

export default {
  name: 'form-editor',
  components: { componentList,componentCanvas },
  mounted() {
  },
  methods : {
    // 允许放下拖拽
    allowDrop(ev) {
      ev.preventDefault();
    },
    // 放下事件
    drop(ev, item) {
      console.log("放下", item);
      console.log(ev);
      ev.preventDefault();
      const treeNode = ev.target;
      if (treeNode) {
        treeNode.appendChild(this.dom);
      }
    },
  }
};
</script>

<style scoped lang="less">
.form-editor{
    width: 100%;
    height: 100%;
    .left{
        width: 19%;
        height: 100%;
        overflow: auto;
    }
}


</style>

