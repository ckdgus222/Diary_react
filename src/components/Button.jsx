
import "./Button.css"; // Button 컴포넌트 css

const Button = ({ text, type, onClick }) => {
  // 부모 컴포넌트에 props 로 각각 다른 button 에 스타일 과 내용 함수 작성
  return (
    <button onClick={onClick} className={`Button Button_${type}`}> {/* 들어오는 type 에 따라 버튼 색상 변경 */}
      {text}
    </button>
  );
};

export default Button;
