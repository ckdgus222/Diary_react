import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import useTitle from "../hooks/useTitle";
// Home 페이지 역할 컴포넌트

const getMonthlyData = (pivotDate, data) => {
  // 현재 시간과 데이터를 매개변수로 받아온다
  // 현재 시간에 년도와 월을 받아오고 월에 시작점 을 설정
  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
  // 현재 시간에 년도와 월을 받아온 다음 월에 끝 을 설정
  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();
  // filter 함수로 data에 있는 createDate 를 필터링 하고 새로운 배열로 반환
  return data.filter((item) => beginTime <= item.createDate && item.createDate <= endTime);
};




const Home = () => {
  const data = useContext(DiaryStateContext); // context API 로 받아온 리스트 데이터
  const [pivotDate, setPivotDate] = useState(new Date()); // 현재 날짜 상태
  useTitle('감정 일기장')
  

  const monthlyData = getMonthlyData(pivotDate, data); // 현재 날짜와 데이터를 넘겨준다음 함수를 실행후 변수에 저장

  const onIncreaseMonth = () => {
    // 현재 월을 앞으로
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    // 현재 월을 뒤로
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
