const MemoInput = ({ memoInsert }) => {
  return (
    <>
      <input type="text" placeholder="메모제목" />
      <input type="text" placeholder="메모내용" />
      <input type="file" />
      <input type="button" value="저장" />
      <input type="hidden" value="삭제" />
    </>
  );
};
export default MemoInput;
