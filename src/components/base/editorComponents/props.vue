<template>
  <div>
    <t-tabs v-model="tabIndex">
      <t-tab-panel :value="1" label="页面数据">
        <p style="margin: 20px">选项卡1内容区</p>
      </t-tab-panel>
      <t-tab-panel :value="2" label="基础数据">
        <t-form class="base-form" v-model="component">
          <t-form-item class="base-form-item" v-for="item in baseCompents" :key="item.name" v-bind="item">
            <t-input v-model="component[item.name]" />
          </t-form-item>
          <t-form-item></t-form-item>
        </t-form>
      </t-tab-panel>
      <t-tab-panel :value="3" label="详细数据">
        <t-form class="base-form">
          <t-form-item
            class="base-form-item"
            v-for="item in moreProps.attr"
            :key="item.name"
            :label="item.name"
            :name="item.name"
          >
            <t-input v-model="item.value" />
          </t-form-item>
        </t-form>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script>
import { baseCompents } from './model/compents';

export default {
  name: 'component-props',
  props: {
    select: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tabIndex: 1,
      component: {},
      baseCompents,
    };
  },
  computed: {
    moreProps() {
      const result = {
        attr: [],
        function: [],
      };
      const componentName = this.component.component;
      if (componentName) {
        const el = this.$createElement(componentName).componentOptions.Ctor.options;
        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const key in el.props) {
          if (typeof el.props[key].type === 'function') {
            result.function.push({
              name: key,
              value: el.props[key].default || '',
              name_CN : ""
            });
          } else {
            result.attr.push({
              name: key,
              value: el.props[key].default || '',
              name_CN : ''
            });
          }
        }
      }
      console.log(result);
      return result;
    },
  },
  watch: {
    select: {
      handler(_newVal) {
        this.tabIndex = 2;
        this.component = _newVal;
      },
      deep: true,
    },
    component: {
      handler(_newVal) {
        this.$emit('changeProps', _newVal);
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.base-form {
  max-height: 55vh;
  overflow: auto;
  margin-top: 15px;
  .base-form-item {
    margin-bottom: 0.5rem;
  }
}
</style>
