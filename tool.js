import { promises as fs } from 'fs';
import { lookupCollection } from "@iconify/json";
import { getIconData } from "@iconify/utils";

const args = process.argv.slice(2);
const icon = args[0];

// 图标库名
const iconSet = icon.split(':')[0];
// 图标名
const iconName = icon.split(':')[1];

 (async () => {
  const collectionJson = await lookupCollection(iconSet);
  const iconJson = getIconData(collectionJson, iconName);

  const iconData = {};
  iconData[icon] = iconJson;
  const exported = JSON.stringify(iconData, null, '\t') + '\n';

  await fs.access('output').catch(()=>{
    createDir();
  })
  createJsonFile(exported);
  
})()

async function createDir() {
  await fs.mkdir('output');
  console.log('dir success!')
}

async function createJsonFile(exported) {
  await fs.writeFile(`output/${iconSet}-${iconName}.json`, exported, 'utf8');
  console.log('file success!')
}
