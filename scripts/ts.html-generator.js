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

const htmlCreate = () => {
  const htmlStr = converter("./src/juejin-pins.html");
  const writeStream = fs.createWriteStream("./src/html.ts", {
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
htmlCreate();
