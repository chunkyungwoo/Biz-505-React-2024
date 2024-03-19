"use client";
// import Image from "next/image";
import styles from "@/css/page.module.css";
import StudentList from "./comps/StudentList";
import { useEffect, useState } from "react";
// import 한 selectAll 함수를 st_selectAll 이라는 이름으로 사용하겠다
import { selectAll as st_selectAll } from "@/app/api/student";
import StudentDetail from "./comps/StudentDtail";
import ScoreList from "./comps/ScoreList";
import { findByStNum } from "./api/score";
import { findeByPk as st_findByPk } from "@/app/api/student";

export default function Home() {
  const [studentList, setStudentList] = useState([]);
  const [scoreList, setScoreList] = useState([]);
  const [detailList, setDetailList] = useState([]);
  const [stNum, setStNum] = useState("");

  useEffect(() => {
    const detailFetch = async () => {
      const result = await st_findByPk(stNum);
      setDetailList([...result]);
    };
    detailFetch();
  }, [stNum]);

  useEffect(() => {
    const stdFetch = async () => {
      const result = await st_selectAll();
      if (result) setStudentList([...result]);
    };
    stdFetch();
  }, []);

  useEffect(() => {
    const scoreFetch = async () => {
      setScoreList([]);
      // ?? 는 stNum 값이 null 이면 화면에 "S0001" 를 표기하라
      const result = await findByStNum(stNum ?? "S0001");
      setScoreList([...result]);
    };
    scoreFetch();
  }, [stNum]);

  return (
    <main className={styles.main}>
      <section className={styles.list}>
        <StudentList studentList={studentList} setStNum={setStNum} />
      </section>
      <section className={styles.detail}>
        <StudentDetail detailList={detailList}>
          <ScoreList scoreList={scoreList} />
        </StudentDetail>
      </section>
    </main>
  );
}
