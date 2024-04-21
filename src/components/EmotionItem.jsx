import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emotion-image";

// emotion 컴포넌트
// Id Name 받아서 렌더링
// isSeleCted props 받아서 조건부 클래스
const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div onClick={onClick} className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ""}`}>
      <img className="emotion_img" src={getEmotionImage(emotionId)} />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
