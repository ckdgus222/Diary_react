// diary 페이지 컴포넌트
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/getStringedDate";
import useTitle from "../hooks/useTitle";

const Diary = () => {
  // diary/ 동적경로 값이 들어간 파라미터
  const params = useParams();
  const nav = useNavigate();
  useTitle(`${params.id}번 일기`)

  const curDiaryItem = useDiary(params.id);

  if (!curDiaryItem) {
    return <div>데이터 로딩중...!</div>;
  }

  const { createDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"<뒤로 가기"} />}
        rightChild={<Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />}
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
