// const http = require("http");
// const url = require("url");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   const pathName = req.url;

//   if (pathName === "/" || pathName === "/overview") {
//     res.end("This is the OVERVIEW");
//   } else if (pathName === "/product") {
//     res.end("This is the PRODUCT");
//   } else if (pathName === "/api") {
//     fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
//       if (err) return console.log("ERROR!");

//       const productData = JSON.parse(data);
//       console.log(productData);
//       res.writeHead(200, { "Content-type": "application/json" });
//       res.end(data);
//     });
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>Page not found!</h1>");
//   }
// });

// const p = 8081;
// server.listen(p, "127.0.0.1", () => {
//   console.log(`Listening to requests on port ${p}`);
// });

const http = require("http");
const url = require("url");
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    console.log(dataObj);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

const p = 8081;
server.listen(p, "127.0.0.1", () => {
  console.log(`Listening to requests on port ${p}`);
});
