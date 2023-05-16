import { ServerIcon, RelativityIcon } from 'tdesign-icons-vue';
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/system',
    name: 'system',
    component: Layout,
    redirect: '/system/base',
    meta: { title: '系统', icon: ServerIcon },
    children: [
      {
        path: 'base',
        name: 'page',
        component: () => import('@/pages/system/page/index.vue'),
        meta: { title: '页面管理', icon: RelativityIcon },
      },
      {
        path: 'dictionary',
        name: 'Dictionary',
        component: () => import('@/pages/system/page/index.vue'),
        meta: { title: '字典管理', icon: RelativityIcon },
      },
      {
        path: 'api',
        name: 'Api',
        component: () => import('@/pages/system/api/index.vue'),
        meta: { title: '接口管理', icon: RelativityIcon },
      },
    ],
  },
];
