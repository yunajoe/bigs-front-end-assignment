import { useBoardStore } from "@/feature/board/board-store";
import { writePost } from "@/pages/home/api";
import { WritePostParams } from "@/shared/types/board";
import { customError } from "@/shared/utils/axios-validation";
import styles from "./write.module.scss";

function WritePost() {
  const { closeWriteModal } = useBoardStore.getState();

  const handleWritePost = async (data: WritePostParams) => {
    try {
      await writePost(data);
    } catch (error: any) {
      const errorResult = customError(error.type, error);
      alert(errorResult?.message);
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>새 글 작성</h2>
      <div className={styles.inputContainer}>
        <label>
          카테고리<em>*</em>
        </label>
        <select>
          <option value="">카테고리를 선택하세요</option>
          <option value="">공지</option>
          <option value="">일반</option>
          <option value="">질문</option>
          <option value="">자유</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label>
          제목 <em>*</em>
        </label>
        <input />
      </div>
      <div className={styles.inputContainer}>
        <label>
          내용 <em>*</em>
        </label>
        <textarea />
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
              title: "test",
              content: "test",
              category: "하이",
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
