const path = require("path");
const fs = require("fs");

const converter = (fileUri) => {
  const template = fs.readFileSync(fileUri);
  const htmlRrsCode = template.toString();
  const htmlResCodeConversion = htmlRrsCode
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\${/g, "\\${");
  return htmlResCodeConversion;
};

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
    console.log("生成代码中...");
  });
  writeStream.write(`export default \`${htmlStr}\`;
`);
  writeStream.end();
};

const htmlSrcPath = './src/html/src';// html 源代码路径
const htmlTargetPath = './src/html/target';// html 生成后ts路径

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
