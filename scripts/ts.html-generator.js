const path = require("path");
const fs = require("fs");

/**
 * 受 vscode webview 的限制，必须将 html、css、js 全部整合成一个字符串
 * 但为了开发时调试方便，会将 html 作为单独的文件开发。所以需要在生成时将 html 文件转换为 ts 字符串。
 */

// 转换，主要是模板语法的转译
const converter = (fileUri) => {
  const template = fs.readFileSync(fileUri);
  const htmlRrsCode = template.toString();
  const htmlResCodeConversion = htmlRrsCode
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\${/g, "\\${");
  return htmlResCodeConversion;
};

/**
 * 将 html 字符串 编译成 ts 字符串。
 * @param {string} targetPath 
 * @param {string} htmlStr 
 */
const htmlTsGenerator = (targetPath, htmlStr) => {
  const writeStream = fs.createWriteStream(targetPath, {
    encoding: "utf-8"
  });
  writeStream.on("error", (err) => {
    console.log("生成代码失败:", err);
  });
  writeStream.on("finish", () => {
    console.log("生成代码完成");
  });
  writeStream.on("open", () => {
    console.log(targetPath, "生成代码中...");
  });
  writeStream.write(`export default \`${htmlStr}\`;
`);
  writeStream.end();
};

const htmlSrcPath = './src/html/src';// html 源代码路径
const htmlTargetPath = './src/html/target';// html 生成后 ts 文件路径

// 生成 ts 文件的入口函数，主要是遍历 src 目录下所有 html 文件。
const generator = () => {
  const htmlFileNameList = fs.readdirSync(htmlSrcPath);
  htmlFileNameList.forEach(htmlFileName => {
    const htmlStr = converter(path.resolve(htmlSrcPath, htmlFileName));
    if (!fs.existsSync(htmlTargetPath)) {
      fs.mkdirSync(htmlTargetPath);
    }
    htmlTsGenerator(path.resolve(htmlTargetPath, htmlFileName.replace('.html', '.ts')), htmlStr);
  });
};

generator();
