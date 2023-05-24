import docs from './tdComponents';

import requset from '@/utils/request';

// npm install --save js-md5

export const prefix = 'tdesign-starter';
export const TOKEN_NAME = 'tdesign-starter';

export const translate = async (text: string) => {
  // 0EcFYIPI_9F0TVjbxCBL
  const data = await requset.post('', {
    q: text,
    appid: '20191223000369011',
    form: 'en',
    to: 'ch',
    // sign: MD5(`20191223000369011${text}14356602880EcFYIPI_9F0TVjbxCBL`),
    salt: '1435660288',
   
  });
  return data;
};

export const UIoptions = [
  {
    label: 'tdesign-vue',
    value: 'td',
    components: docs,
  },
  {
    label: '自定义组件',
    value: 'base',
  },
];
