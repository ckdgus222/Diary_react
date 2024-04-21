import { getEmotionImage } from "../util/get-emotion-image";
import "./DiaryItem.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, createDate, content, emotionId }) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      {/* DiaryItem 리스트 컨테이너 */}
      <div onClick={() => nav(`/diary/${id}`)} className={`img_section img_section_${emotionId}`}>
        {/* emotionId 에 맞게 동적 클래스네임 */}
        <img src={getEmotionImage(emotionId)} /> {/* getEmotionImage 함수를 통해서 이미지 렌더링*/}
      </div>
      <div onClick={() => nav(`/diary/${id}`)} className="info_section">
        <div className="created_date">{new Date(createDate).toLocaleDateString()}</div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button onClick={() => nav(`/edit/${id}`)} text="수정하기" />
      </div>
    </div>
  );
};

export default DiaryItem;
