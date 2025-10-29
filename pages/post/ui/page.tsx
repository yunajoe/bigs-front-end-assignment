"use client";

import BoardListItem from "@/feature/components/item/board-list-item";
import { useParams } from "next/navigation";

function PostPage() {
  const params = useParams();

  if (!params) return <p>해당 POST를 찾을 수 없습니다.</p>;

  return <BoardListItem id={params.id}></BoardListItem>;
}

export default PostPage;
