<template>
  <t-card :bordered="false">
    <div class="component-list">
      <t-select class="UI-select" v-model="UI" :options="UIoptions" placeholder="请选择组件集" />
        <t-menu class="components">
          <t-menu-group v-for="group in componentList" :key="group.title">
            {{ group.title }}
            <t-menu-item  v-for="item in group.children" :key="item.name" :value="'t-'+item.name">
              {{ item.title }}
            </t-menu-item>
          </t-menu-group>
        </t-menu>
    </div>
  </t-card>
</template>

<script>
import { UIoptions } from '@/config/global';

export default {
  name: 'component-list',
  data() {
    return {
      UI: 'td',
      UIoptions,
    };
  },
  computed:{
    componentList(){
      return UIoptions.filter(item=> item.value === this.UI)[0].components
    }
  },
  methods: {
    drag(ev, id) {
      console.log('拖动', id);
      this.id = id;
      this.dom = ev.currentTarget.cloneNode(true);
      console.log(this.dom);
    },
  },
};
</script>

<style scoped lang="less">
.component-list {
  width: 12vw;
  .components{
    max-height: 500px;
  }
}
</style>
