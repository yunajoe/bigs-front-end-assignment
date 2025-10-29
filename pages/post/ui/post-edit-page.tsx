"use client";
import { useBoardStore } from "@/feature/board/board-store";
import {
  checkCategoryValidation,
  checkContentValidation,
  checkTitleValidation,
} from "@/shared/utils/board-validation";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { updatePost } from "../api";
import styles from "./postEdit.module.scss";
function PostEditPage() {
  const data = useBoardStore((state) => state.editingPost);

  const [title, setTitle] = useState(data?.title ?? "");
  const [content, setContent] = useState(data?.content ?? "");
  const [category, setCategory] = useState(data?.boardCategory ?? "");

  //TODO: 추후에 null 타입으로 변경하기
  const [file, setFile] = useState<File | undefined>(undefined);

  const [validTitle, setValidTitle] = useState(false);
  const [validContent, setValidContent] = useState(false);
  const [validCategory, setValidCategory] = useState(false);

  const clearEditingPost = useBoardStore.getState;
  const router = useRouter();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setValidTitle(checkTitleValidation(value));
  };

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setValidContent(checkContentValidation(value));
  };

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.trim();
    setCategory(value);
    setValidCategory(checkCategoryValidation(value));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleEditPage = async () => {
    if (!data) return;
    if (!validTitle || !validContent || !validCategory) {
      alert("필수 항목은 모두 입력해야 합니다.");
      return;
    }

    const updatedData = {
      title,
      content,
      category,
      file,
    };
    try {
      const { status } = await updatePost(data.id, updatedData);
      if (status >= 200) {
        alert("글수정이 완료 되었습니다.");
        router.push(`/post/${data.id}`);
      }
    } catch (error: any) {
      alert(error?.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>글 수정</h2>

      <div className={styles.inputContainer}>
        <label>
          카테고리<em>*</em>
        </label>
        <select value={category} onChange={handleCategory}>
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
          <input
            type="file"
            className={styles.fileInput}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.cancel}
          onClick={() => {
            clearEditingPost();
            router.back();
          }}
        >
          취소
        </button>
        <button className={styles.confirm} onClick={handleEditPage}>
          수정 완료
        </button>
      </div>
    </div>
  );
}

export default PostEditPage;
