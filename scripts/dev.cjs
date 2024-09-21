const { spawn } = require("node:child_process");
const { argv } = process;

let child;
let isInterrupted = false; // 标志变量，用于避免重复处理 SIGINT 信号

function runVite() {
  const mode = argv[3];
  if (!["dev", "prod"].includes(mode)) {
    throw new Error("Invalid mode");
  }

  const command = "vite";
  const args = ["--mode", mode];

  child = spawn(command, args);

  if (!child) {
    return;
  }

  child.stdout.on("data", (data) => {
    const colorCode = "\x1b[35m"; // 洋红色
    const resetCode = "\x1b[0m";
    console.log(`${colorCode}${data}${resetCode}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr data: ${data}`);
  });

  child.on("exit", (code, signal) => {
    console.log(`子进程退出，退出码: ${code}, 信号: ${signal}`);
  });
}

runVite();

function gracefulShutdown() {
  if (!child) {
    return;
  }
  child.kill("SIGTERM");
  console.log("已发送 SIGTERM 信号给子进程");

  const timeoutId = setTimeout(() => {
    if (child.killed) {
      console.log("子进程已在超时前优雅退出");
      clearTimeout(timeoutId);
      return;
    }
    console.error("子进程未在规定时间内优雅退出，强制终止...");
    child.kill("SIGKILL");
    clearTimeout(timeoutId);
  }, 3000); // 超时时间为 3 秒
}

process.on("SIGINT", () => {
  if (isInterrupted) {
    return;
  }
  isInterrupted = true;
  console.log("接收到 SIGINT 信号，尝试关闭子进程...");
  gracefulShutdown();
});

process.on("uncaughtException", (err) => {
  if (isInterrupted) {
    return;
  }
  isInterrupted = true;
  console.error(`未捕获的异常: ${err}`);
  gracefulShutdown();
});

process.on("unhandledRejection", (reason) => {
  if (isInterrupted) {
    return;
  }
  isInterrupted = true;
  console.error(`未处理的拒绝: ${reason}`);
  gracefulShutdown();
});
