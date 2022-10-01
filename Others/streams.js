// We need to read a large text file from the file system and then send it to the client.

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  //
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //
  //   Cons - Node will actually have to load the entire file into memory, as only after that's ready, it can then send data. That will be problem when the file will be big and tons of requests hitting the server. Can cause the app crash.
  //
  //
  //
  //
  // Solution 2 with Streams
  //
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });
  //
  //  Cons - Readable file is much much faster than actually sending the result with the response writable stream over the network. This will overwhelm the response stream. Which can't handle all this incoming data so fast. This problem is called BACKPRESSURE.
  // BACKPRESSURE happens when the response can't send the data nearly as fast as it is receiving it from the file.
  //
  //
  //
  //
  // FIX OF BACKPRESSURE & The Solution 3, best one
  //
  //   Using pipe operator. the pipe operator is available on all readable streams, and it allows us to pipe the output of a readable stream right into the input of a writable stream. And that will then fix the problem of backpressure because it will automatically handle the speed of the data coming in, and the speed of the data going out.
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // Syntax:  readable-source.pipe-method(writable-destination)
});

server.listen("8000", "127.0.0.1", () => {
  console.log("Listening...");
});
