import css from "@/css/student.detail.module.css";
const StudentDetail = ({ children, detailList }) => {
  const viewDetail = detailList.map((item) => {
    return (
      <>
        <li>
          <strong>학번</strong>
          <span>{item.st_num}</span>
        </li>
        <li>
          <strong>이름</strong>
          <span>{item.st_num}</span>
        </li>
        <li>
          <strong>학과</strong>
          <span>{item.st_dept}</span>
        </li>
        <li>
          <strong>학년</strong>
          <span>{item.st_grade}</span>
        </li>
        <li>
          <strong>전화번호</strong>
          <span>{item.st_tel}</span>
        </li>
        <li>
          <strong>주소</strong>
          <span>{item.st_addr}</span>
        </li>
      </>
    );
  });
  return (
    <>
      <h1>학생정보 자세히 보기</h1>
      <ul className={css.body}>{viewDetail}</ul>
      {children}
    </>
  );
};

export default StudentDetail;
