export default `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>测试</title>
    <script src="./components.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <button onclick="dn()">dn</button>
    <button onclick="up()">up</button>
    <script>
      let page = CP.cachePage({ el: document.querySelector("#app") });
      page.pageDN("haha", "cc");
      function dn() {
        page.pageDN("ttt", "dd");
      }
      function up() {
        page.pageUP();
      }
    </script>
  </body>
</html>
`;