import "../css/TodoInput.css";

const TodoInput = ({ todoItem, setTodoItem, todoInsert }) => {
  // 특정 tag 형 컴포넌트에 id 를 부여하기 위한 도구

  const onInsertHandler = () => {
    todoInsert();
    setTodoItem("");
  };
  const onChangeHandler = (e) => {
    const text = e.target.value;
    setTodoItem(text);
  };
  return (
    <div className="todoInput">
      <input placeholder="TODO" value={todoItem} onChange={onChangeHandler} />
      <button disabled={todoItem.length < 2} onClick={onInsertHandler}>
        추가
      </button>
    </div>
  );
};
export default TodoInput;
