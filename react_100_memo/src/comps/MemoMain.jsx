import styles from "../css/MemoMain.module.css";
import MemoInput from "./MemoInput";
import "../css/Memo.css";
import MemoMainLeft from "./MemoMainLeft";
import MemoMainRight from "./MemoMainRight";
import MemoList from "./MemoList";
import MemoDate from "./MemoDate";
import { useState } from "react";
import moment from "moment";

const MemoMain = () => {
  const [memo, setMemo] = useState({
    m_seq: 0,
    m_author: "ckw2434@naver.com",
    m_date: moment().format("YYYY-MM-DD"),
    m_time: moment().format("HH:mm:ss"),
    m_subject: "",
    m_image: "",
  });
  const memoInsert = (seq) => {
    const newMemoList = [...memoList, { ...memo, m_date: moment().format("YYYY-MM-DD"), m_time: moment().format("HH:mm:ss") }];
    setMemoList([...newMemoList]);
  };

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
          <MemoList memo={memo} memoList={memoList} memoComplete={memoComplete} memoDelete={memoDelete} />
        </MemoMainLeft>
      </div>
      <div className={styles.aside}>
        <MemoMainRight>
          <MemoInput memo={memo} setMemo={setMemo} memoInsert={memoInsert} />
        </MemoMainRight>
      </div>
    </div>
  );
};
export default MemoMain;
