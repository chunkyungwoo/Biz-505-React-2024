const MemoItem = ({ item, memoComplete, memoDelete }) => {
  const onCompleteClick = (seq) => {
    memoComplete(seq);
  };
  const onDeleteClick = (seq) => {
    if (window.form("메모를 삭제할까요?")) {
      memoDelete(seq);
    }
  };
  return (
    <div className="memoItem">
      <div className="delete" onClick={() => onDeleteClick(item.seq)}>
        &items;
      </div>
      <div className={item.complete ? "content ok" : "content"} onClick={() => onCompleteClick(item.seq)}>
        {item.memo}
      </div>
      <div className="complete" onClick={() => onCompleteClick(item.seq)}>
        &#x2713;
      </div>
    </div>
  );
};

export default MemoItem;
