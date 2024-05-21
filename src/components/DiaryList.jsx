import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import "./DiaryList.css";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate(); // 페이지 이동 함수

  const [sortType, setSortType] = useState("latest"); // select 태그에 상태 값

  const onChangeSortType = (e) => {
    // select 태그에 value 속성 변경
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    // select 태그 value 속성값에 따른 data 리스트 렌더링 정렬
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        return Number(a.createDate) - Number(b.createDate);
      } else {
        return Number(b.createDate) - Number(a.createDate);
      }
    });
  };

  const sortedData = getSortedDate(); // 정렬된 getSortedDate 실행후 변수에 담는다

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option> {/* state에 값을 저장할때 편리하게 작업하기위해 값은 영어로 */}
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button onClick={() => nav("/new")} text={"운동 일지 작성"} type={"POSITIVE"} /> {/* 버튼 컴포넌트 */}
      </div>
      <div className="list_wrapper">
        {/* 반복할 list 컴포넌트  */}
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
