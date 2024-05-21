import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [currentDiary, setCurrentDiary] = useState();
  const nav = useNavigate();

  //렌더링 될때 useEffect 사용해서 nav 가 바로 실행안되게 생명주기 선택
  useEffect(() => {
    const diaryItem = data.find((item) => String(item.id) === String(id)); // mock 데이터에서 find 함수로 item id 와 유저가 클릭한 id 일치하는 요소 찾고 값 저장

    if (!diaryItem) {
      // 유저가 주소 파라미터 입력값에 아이템에 없는 값을 입력했을때 ! not 연산자로 false 가 들어오면 true 로 바꿔서 실행
      window.alert("존재하지 않는 운동 일지입니다.");
      nav("/", { replace: true }); // 페이지 다시 Home 으로 돌려주고 Navigate 함수 replace 값을 true 로 뒤로 페이지를 못가게 막고
    }

    setCurrentDiary(diaryItem); // 일치하는 요소를 currentDiary 상태 변수에 저장
  }, [id, data]);

  return currentDiary;
};

export default useDiary;
