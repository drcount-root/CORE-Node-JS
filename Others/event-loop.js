const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 2; // To set the thread pool size using Libuv

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));
// As these are not in a I/O cycle, so it's not running inside of the event-loop, as they are not running inside of any callback function. That's why these outputs are not in particular order.

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");

  console.log("----------------------------------------------");
  // upper codes are not into event loop & codes under, are inside event-loop

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  // Why does setImmediate actually appear before the setTimeout?

  // => The event loop actually waits for stuff to happen in the poll phase, where I/O callbacks are handled. So when the queue of callbacks is empty, we have no I/O callbacks, all we have is these timers, then the event loop will wait in this phase until there is an expired timer. But, if we scheduled a callback using setImmediate(), then that callback will actually get executed right away after the polling phase, and even before expired timers, if there is one.

  // And in this case, the timer expires right away, so after zero seconds, but again, the event loop actually waits, so it pauses in the polling phase. And so that setImmediate() callback is actually executed first.

  process.nextTick(() => console.log("Process.nextTick()"));
  // Why was this callback function of process.nextTick() is the first one of all of them to be executed?

  // => nextTick() is part of the microtasks queue, which get executed after each phase, so not just after one entire tick.So the callback function of nextTick() actually run before the phase where the callback function of setImmediate() run.

  // setImmediate() actually gets executed once per tick, while nextTick() gets executed immediately.

  // When in Node JS, one iteration of the event loop is completed. This is known as a tick.

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "ms time taken\t Password Encrypted!");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "ms time taken\t Password Encrypted!");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "ms time taken\t Password Encrypted!");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "ms time taken\t Password Encrypted!");
  });

  // As the default size of thread-pool is 4, so these 4 threads doing the work at the same time, and so that's why these four password encryptions take approximately the same time.

  // If we set thread pool size to 1 explicitly, then they will execute one after another. Ex. 1673 ms, 3137 ms, 4621 ms, 6068 ms.

  // If we set thread pool size to 2 explicitly, then execution time of first 2 will be very similar and the execution time of other 2 will be very similar. Ex. 1599 ms, 1601 ms, 3104 ms, 3116 ms.
});

console.log("Hello from the top-level code"); // Top-level code executed first
