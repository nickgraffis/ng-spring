/**
* Solves this issue: https://github.com/motiondivision/motionone/issues/55 
*/
import path from 'path';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// find the node_modules
const nodeModules = path.join(__dirname, '../node_modules');
// find the @motionone/vue package
const vuePackage = path.join(nodeModules, '@motionone/vue');
// find the package.json of @motionone/vue
const vuePackageJson = path.join(vuePackage, 'package.json');
// read the package.json of @motionone/vue
const vuePackageJsonContent = fs.readFileSync(vuePackageJson, 'utf8');
// parse the package.json of @motionone/vue
const vuePackageJsonParsed = JSON.parse(vuePackageJsonContent);
// replace "main" with "dist/motion-vue.ssr.js"
vuePackageJsonParsed.main = 'dist/motion-vue.ssr.js';
// write the package.json of @motionone/vue
fs.writeFileSync(vuePackageJson, JSON.stringify(vuePackageJsonParsed, null, 2));
// exit 
process.exit(0);