import { useEffect, useState } from "react";
import style from "./App.module.less";

function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const arr = [9, 3, 1, 2, 5, 7, 3, 4, 2, 6, -3, -4, 2, 3.4, 45];
    function bubbleSort(arr, n) {
      if (n <= 1) {
        return;
      }
      for (let i = 0; i < n; ++i) {
        let flag = false;
        for (let j = 0; j < n - 1 - i; ++j) {
          if (arr[j] > arr[j + 1]) {
            const tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
            flag = true;
          }
        }
        if (!flag) {
          break;
        }
      }
      console.log("bubbleSort结果", arr);
    }
    console.time("bubbleSort");
    bubbleSort(arr, arr.length);
    console.timeEnd("bubbleSort");
    function insertionSort(arr, n) {
      if (n <= 1) {
        return;
      }
      for (let i = 1; i < n; ++i) {
        const value = arr[i];
        const j = i - 1;
        for (; j >= 0; --j) {
          if (arr[j] > value) {
            arr[j + 1] = arr[j]; // 数据移动
          } else {
            break;
          }
        }
        arr[j + 1] = value; // 插入数
      }
      console.log("insertionSort结果", arr);
    }
    console.time("insertionSort");
    insertionSort(arr, arr.length);
    console.timeEnd("insertionSort");
  }, []);

  return (
    <div className="App">
      算法
      <footer className={style.footer}> &copy; {time}</footer>
    </div>
  );
}

export default App;
