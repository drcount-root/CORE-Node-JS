// module
const fs = require("fs");
//
// Synchronous way of reading a file from file system
// readFileSync() takes 2 arguments - 1. path to the file
//                                    2. character encoding
//
const textIn = fs.readFileSync("../FakeFileSystem/input.txt", "utf-8");
console.log("\n", textIn);
//
//
//
//
//
// Synchronous way of writing inside a file of file system
// writeFileSync() takes 2 arguments - 1. path to the file
//                                     2. what to write
//
const textOut = `\nThis is what we know about avocado:\n${textIn}`;
fs.writeFileSync("../FakeFileSystem/output.txt", textOut);
// To verify
console.log(
  "\n",
  fs.readFileSync("../FakeFileSystem/output.txt", "utf-8"),
  "\n"
);
