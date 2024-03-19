import css from "@/css/student.list.module.css";
const StudentList = ({ studentList, setStNum }) => {
  const viewList = studentList.map((item) => (
    <li
      key={item.st_num}
      className={css.item}
      onClick={() => setStNum(`${item.st_num}`)}
    >
      <strong>{item.st_num}</strong>
      <strong>{item.st_name}</strong>
      <span>{item.st_dept}</span>
    </li>
  ));
  return (
    <>
      <h1>학생 리스트</h1>
      <li className={`${css.item} ${css.title}`}>
        <strong>학번</strong>
        <strong>이름</strong>
        <span>학과</span>
      </li>
      <ul>{viewList}</ul>
    </>
  );
};
export default StudentList;
