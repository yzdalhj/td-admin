import Vue from 'vue';

const components = import.meta.globEager('./base/*.*');
const componentsKey = [];
// eslint-disable-next-line no-restricted-syntax, guard-for-in
for (const key in components) {
  componentsKey.push(key);
}
const resolveComponentName = (component, componentFile = '') => {
  let componentName = (component.default || component).name;
  if (!componentName && componentFile) {
    const fileName = componentFile.replace(/^.*\/([^/]+)\.ts/, '$1');
    if (fileName !== 'index') {
      componentName = fileName;
    } else {
      componentName = componentFile.replace(/^(.*\/)?([^/]+)\/index\.ts$/, '$2');
    }
  }
  return componentName || '';
};

componentsKey.forEach((fileName) => {
 
  const componentConfig:any = components[fileName];
  const componentName = resolveComponentName(componentConfig, fileName);
 
  Vue.component(componentName, componentConfig.default || componentConfig);
});
