/* eslint-disable import/prefer-default-export */
export function formItems(items: any): Array<any> {
  const titleItems = [];
  const result = [];
  items.forEach((element: { title: string | number }) => {
    if (!titleItems[element.title]) {
      titleItems.push(element.title);
      result.push({
        title: element.title,
        content: [],
      });
    }
    result.forEach((item) => {
      if (item.title === element.title) {
        item.content.push(element);
      }
    });
  });
  return result;
}

export function KeysObject(items: any , key: string | number) {
  const result = {}
  items.forEach((item: any) =>{
    result[item[key]] = ''
  })
  return result;
}
