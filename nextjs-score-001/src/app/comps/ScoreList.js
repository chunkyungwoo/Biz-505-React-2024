import css from "@/css/score.list.module.css";
const ScoreList = ({ scoreList }) => {
  let scoreTotal = 0;
  const viewList = scoreList.map((item, index) => {
    scoreTotal += item.s_score;
    return (
      <li key={index} className={css.item}>
        <strong>{item.s_subject}</strong>
        <span>{item.s_score}</span>
      </li>
    );
  });
  return (
    <>
      <h1>성적리스트</h1>
      <ul className={css.body}>
        {viewList}
        <li className={`${css.item} ${css.strong}`}>
          <strong>합계</strong>
          <span>{scoreTotal}</span>
        </li>
        <li className={`${css.item} ${css.strong}`}>
          <strong>평균</strong>
          <span>{Math.round(scoreTotal / scoreList.length, 0)}</span>
        </li>
      </ul>
    </>
  );
};

export default ScoreList;
