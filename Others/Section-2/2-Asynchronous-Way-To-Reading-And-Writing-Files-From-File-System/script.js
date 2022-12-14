// module
const fs = require("fs");
//
// Asynchronous way of reading a file from file system
// readFile() takes 3 arguments - 1. path to the file
//                                2. character encoding
//                                3. callback fnc
//
fs.readFile("../FakeFileSystem/input.txt", "utf-8", (err, data) => {
  if (err) return console.log("ERROR!");
  console.log("\n", data, "\n");
});
console.log("\nReading file ...");
//
//
//
//
//
// Asynchronous way of writing inside a file of file system
// writeFile() takes 4 arguments - 1. path to the file
//                                 2. what to write
//                                 3. character encoding
//                                 4. callback fnc
//
const toWrite = `👽 Yo Yo man 👽`;
fs.writeFile("../FakeFileSystem/output.txt", toWrite, "utf-8", (err) => {
  if (err) throw err;

  console.log("File written!");
  const d = fs.readFileSync("../FakeFileSystem/output.txt", "utf-8");
  console.log("\nFile content\n", d);
});

console.log("Writing file ...");
//
//
//
//
//
// Play non-blocking / asynchronous way with callback fnc

fs.readFile("../txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR");

  fs.readFile(`../txt/${data1}.txt`, "utf-8", (err, data2) => {
    if (err) return console.log("ERROR");
    console.log(data2);
    fs.readFile("../txt/append.txt", "utf-8", (err, data3) => {
      if (err) return console.log("ERROR");
      console.log(data3);

      fs.writeFile("../txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        if (err) return console.log("ERROR");
        console.log("File written!");
      });
    });
  });
});
console.log("Will read file!");
