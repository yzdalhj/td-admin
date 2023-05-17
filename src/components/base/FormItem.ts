
import _ from 'lodash'

export default {
  name: 'FormItem',
  functional: true,
  render(h, context) {
    const { props, listeners } = context;
    const { component, label, name, rules, scopedSlots, customSlots, className, id } = props;
    let { itemWidth, width, labelWidth } = props;
    if (!itemWidth) {
      itemWidth = '100%';
    }
    if (!labelWidth) {
      labelWidth = '100%';
    }
    if (!width) {
      width = '100%';
    }
    const vnode = h(component, {
      class: `${component}-style`,
      id,
      ...{
        props : _.omit(props,['label','rules']),
        on: listeners,
        attrs: _.omit(props,['label','rules']),
        style: {
          width,
        },
      },
    });
    if (scopedSlots && scopedSlots.customRender) {
      return h('t-form-item', {
        class: className,
        id,
        ...{
          props: {
            label,
            // prop: name,
            rules,
            labelWidth: !label || label.length === 0 ? '0px' : labelWidth,
          },
          style: {
            width: itemWidth,
          },
          scopedSlots: {
            default() {
              return customSlots[scopedSlots.customRender](label, props);
            },
          },
        },
      });
    }
    return h('t-form-item', {
      class: className,
      id,
      ...{
        props: {
          label,
          name,
          rules,
          ...props,
        },
        style: {
          width: itemWidth,
        },
        // scopedSlots: {
        //   default() {
        //     return vnode;
        //   },
        // },
      },
    },[vnode]); // this.%slots.default
  },
};
