import styles from "../css/MemoMain.css";
import MemoInput from "./MemoInput";
import "../css/Memo.css";
import MemoMainLeft from "./MemoMainLeft";
import MemoMainRight from "./MemoMainRight";
import MemoList from "./MemoList";
import MemoDate from "./MemoDate";
import { useState } from "react";

const MemoMain = () => {
  const [memoItem, setMemoItem] = useState("");
  const [memoList, setMemoList] = useState(() => {
    return localStorage.getItem("memoList") ? JSON.parse(localStorage.getItem("memoList")) : [];
  });
  const memoComplete = (seq) => {
    const result = memoList.map((item) => {
      if (item.seq === seq) {
        return { ...item, complete: !item.complete };
      }
      return item;
    });
  };
  const memoDelete = (seq) => {
    const result = memoList.filter((item) => {
      return item.seq !== seq;
    });
    setMemoList([...result]);
  };

  return (
    <div className={styles.main}>
      <div className={styles.aside}>
        <MemoMainLeft>
          <MemoDate />
          <MemoList memoList={memoList} memoComplete={memoComplete} memoDelete={memoDelete} />
        </MemoMainLeft>
      </div>
      <div className={styles.aside}>
        <MemoMainRight>
          <MemoInput />
        </MemoMainRight>
      </div>
    </div>
  );
};
export default MemoMain;
