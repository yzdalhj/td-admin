<template>
  <div>
    <div>{{ drag ? '拖拽中' : '拖拽停止' }}</div>
    <!--使用draggable组件-->
    <draggable
      v-model="myArray"
      chosenClass="chosen"
      forceFallback="true"
      group="people"
      animation="1000"
      @start="onStart"
      @end="onEnd"
    >
      <t-card :bordered="false">
        <t-form
          ref="form"
          :data="data"
          :label-align="formData.labelAlign"
          :label-width="formData.labelWidth"
          v-on="$listeners"
        >
          <transition-group class="form-basic-container">
            <div v-for="item in formData.item" class="form-basic-item" :key="item.id">
              <div class="form-basic-container-title" v-if="item.title">{{ item.title }}</div>
              <t-row class="row-gap" :gutter="[16, 16]">
                <t-col v-for="field in item.content" :span="field.span || 6" :key="field.name">
                  <form-item
                    :key="field.name"
                    :value="data[field.name]"
                    :label="field.label"
                    v-bind="field"
                    :custom-slots="customSlots"
                    @clear="handleClear"
                    @change="handleChange(field.name, $event)"
                    @updateLabelValue="handleLabelValue"
                    @updateLabelPathValue="handleLabelPathValue"
                    @updateValuePath="handleValuePath"
                    @getSelectValue="getSelectValue"
                  />
                </t-col>
              </t-row>
            </div>
          </transition-group>
        </t-form>
      </t-card>
    </draggable>
  </div>
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
import draggable from 'vuedraggable';

export default {
  name: 'component-canvas',
  components: {
    draggable,
  },
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
      myArray: [],
    };
  },
  watch: {
    items: {
      handler(value) {
        this.myArray = value;
      },
      deep: true,
    },
  },
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
