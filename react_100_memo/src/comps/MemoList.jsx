import MemoItem from "./MemoItem";

const MemoList = ({ memoList, memoComplete, memoDelete }) => {
  const viewList = memoList.map((item) => <MemoItem item={item} key={item.seq} memoComplete={memoComplete} memoDelete={memoDelete} />);
  return <>{viewList}</>;
};
export default MemoList;
