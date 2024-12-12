// 导出图标集合
import { promises as fs } from 'fs';
import { lookupCollection } from "@iconify/json";
import { getIconData } from "@iconify/utils";
import { blankIconSet } from "@iconify/tools";
import { icons } from "./icons.js";



const getIconSet = async (setName) => {
  return await lookupCollection(setName);
};

(async () => {
  const result = icons.map(async (ic) => {
    const setName = ic.split(':')[0];
    const collectionJson = await getIconSet(setName);

    const iconName = ic.split(':')[1];
    const iconJson = getIconData(collectionJson, iconName);
    //console.log(iconJson);

    return {
      name: ic,
      content: iconJson
    };
  })

  const iconList = await Promise.all(result);
  //console.log(iconList);

  const iconSet = new blankIconSet('custom');
  iconList.forEach(item => {
    iconSet.setIcon(item.name, item.content);
  })

  const data = iconSet.export();
  const exported = JSON.stringify(data, null, '\t');
  
  await fs.writeFile(`output/icon-collection.json`, exported, 'utf8');
  console.log('--导出成功--');
})()

const generateCode = (() => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 62 个字符
  const usedCodes = new Set();

  return () => {
    let code;
    do {
      code = Array.from({ length: 6 }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
    } while (usedCodes.has(code)); // 如果已存在，重新生成
    usedCodes.add(code); // 记录已生成的编码
    return code;
  };
})();
