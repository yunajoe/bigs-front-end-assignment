import { useBoardStore } from "@/feature/board/board-store";
import { writePost } from "@/pages/post/api";
import { WritePostParams } from "@/shared/types/board";
import {
  checkCategoryValidation,
  checkContentValidation,
  checkTitleValidation,
} from "@/shared/utils/board-validation";
import { ChangeEvent, useState } from "react";
import styles from "./write.module.scss";

function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [validTitle, setValidTitle] = useState(false);
  const [validContent, setValidContent] = useState(false);
  const [validCategory, setValidCategory] = useState(false);

  const { closeWriteModal } = useBoardStore.getState();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValidTitle = checkTitleValidation(value);
    setValidTitle(isValidTitle);
    setTitle(value);
  };

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const isValidContent = checkContentValidation(value);
    setValidContent(isValidContent);
    setContent(value);
  };

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const isValidCategory = checkCategoryValidation(value);
    setValidCategory(isValidCategory);
    setCategory(value);
  };

  const handleWritePost = async (data: WritePostParams) => {
    if (!validTitle || !validContent || !validCategory) {
      alert("필수 항목은 모두 입력해야 합니다.");
      return;
    }
    try {
      const { status } = await writePost(data);
      if (status >= 200) {
        alert("글등록이 완료 되었습니다.");
        closeWriteModal();
      }
    } catch (error: any) {
      alert(error?.message);
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>새 글 작성</h2>
      <div className={styles.inputContainer}>
        <label>
          카테고리<em>*</em>
        </label>
        <select onChange={handleCategory}>
          <option value="">카테고리를 선택하세요</option>
          <option value="NOTICE">공지</option>
          <option value="FREE">자유</option>
          <option value="QNA">Q&A</option>
          <option value="ETC">기타</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label>
          제목 <em>*</em>
        </label>
        <input value={title} onChange={handleTitle} />
      </div>
      <div className={styles.inputContainer}>
        <label>
          내용 <em>*</em>
        </label>
        <textarea value={content} onChange={handleContent} />
      </div>
      <div className={styles.inputContainer}>
        <label>파일 첨부 (선택)</label>
        <div className={styles.fileContent}>
          <div className={styles.fileIcon}>📎</div>
          <div>클릭하거나 파일을 드래그하세요</div>
          <p>최대 10MB</p>
          <input type="file" className={styles.fileInput} />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.cancel} onClick={closeWriteModal}>
          취소
        </button>
        <button
          className={styles.confirm}
          onClick={() =>
            handleWritePost({
              title,
              content,
              category,
            })
          }
        >
          작성 완료
        </button>
      </div>
    </div>
  );
}

export default WritePost;
