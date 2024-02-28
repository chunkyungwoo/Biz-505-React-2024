import styles from "@/css/notice.input.module.css";
// api/notice.js 에 선언된 createNotice 함수를 사용하겠다
import { createNotice } from "@/app/api/notice";

/**
 * 공지사항 작성하기
 * 작성자, 제목, 내용, 중요도
 * 저장버튼
 */
// notice/input/page.js
export default () => {
  const actionHandler = async (FormData) => {
    "use server";
    console.log(FormData);
    // action 에 의해서 전달된 formData 를 JSON type의 데이터로 변환하기
    const noticeData = {
      m_author: FormData.get("m_author"),
      m_falg: FormData.get("m_flag"),
      m_subject: FormData.get("m_subject"),
      m_content: FormData.get("m_content"),
    };
    await createNotice(noticeData);
  };

  return (
    <form
      action={actionHandler}
      method="POST"
      className={styles.form}
    >
      <div>
        <input placeholder="작성자" name="m_author"></input>
      </div>
      <div>
        <select name="m_flag">
          <option value="0">중요도 선택</option>
          <option value="1">중요 공지</option>
          <option value="2">일반공지</option>
          <option value="3">지난공지</option>
        </select>
      </div>
      <div>
        <input placeholder="중요도"></input>
      </div>
      <div>
        <input placeholder="제목" name="m_subject"></input>
      </div>
      <div>
        <textarea
          placeholder="내용"
          rows="10"
          name="m_content"
        ></textarea>
      </div>
      <div>
        <input type="submit" value="저장"></input>
      </div>
    </form>
  );
};
