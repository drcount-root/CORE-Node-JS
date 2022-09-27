// module
const fs = require("fs");
//
// Asynchronous way of reading a file from file system
// readFile() takes 2 arguments - 1. path to the file
//                                2. character encoding
//                                3. callback fnc
//
fs.readFile("../FakeFileSystem/input.txt", "utf-8", (err, data) => {
  console.log("\n", data, "\n");
});
console.log("\nReading file ...");
//
//
//
//
//
// Asynchronous way of writing inside a file of file system
// writeFile() takes 2 arguments - 1. path to the file
//                                 2. what to write
//                                 3. callback fnc
//
const toWrite = `👽 Yo Yo man 👽`;
fs.writeFile("../FakeFileSystem/output.txt", toWrite, (err) => {
  if (err) throw err;

  console.log("File written!");
  console.log(
    "\nFile content\n",
    fs.readFileSync("../FakeFileSystem/output.txt", "utf-8")
  );
});

console.log("Writing file ...");
