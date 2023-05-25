<template>
  <t-card :bordered="false">
    <div class="component-list">
      <t-select class="UI-select" v-model="UI" :options="UIoptions" placeholder="请选择组件集" />
      <t-menu class="components">
        <t-menu-group v-for="group in componentList" :key="group.title">
          {{ group.title }}
          <draggable
            v-model="group.children"
            chosenClass="chosen"
            forceFallback="true"
            :group="{ name : 'g2', pull: 'clone', put: false }"
            :clone="cloneComponent"
            animation="400"
          >
            <transition-group>
              <t-menu-item draggable v-for="item in group.children" :key="item.name" :value="'t-' + item.name"  >
                {{ item.title }}
              </t-menu-item>
            </transition-group>
          </draggable>
        </t-menu-group>
      </t-menu>
    </div>
  </t-card>
</template>

<script>
import { UIoptions } from '@/config/global';

import draggable from 'vuedraggable'
import _ from 'lodash'

export default {
  name: 'component-list',
  components : { draggable },
  inject : ['formId'],
  data() {
    return {
      UI: 't-',
      UIoptions,
    };
  },
  computed: {
    componentList() {
      return UIoptions.filter((item) => item.value === this.UI)[0].components;
    },
  },
  methods: {
    cloneComponent({ name , titleEn }){
      const result = {
        id : "",
        page_id : this.formId,
        span : 12,
        label : titleEn,
        component : this.UI + name,
        name : "",
        title : "",
        uuid : _.uniqueId()
      }
      console.log(result)
      return result;
    }
    
  },
};
</script>

<style scoped lang="less">
.component-list {
  width: 12vw;
  .components {
    max-height: 500px;
  }
}
</style>
