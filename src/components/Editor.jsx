import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants"
import { getStringedDate } from "../util/getStringedDate";






const Editor = ({ initData, onSubmit }) => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    // 날짜, 아이디 , 컨텐츠 상태값 각 컴포넌트
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

   // 
  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createDate)),
      });
    }
  }, [initData]);

  const DateChange = (e) => {
    let name = e.target.name; // input, textarea 에 name 값
    let value = e.target.value; // input , textarea 에 value 값

    if (name === "createdDate") {
      // createdDate input name 이면
      value = new Date(value); // 이벤트에 받아온 value 값을 new Date 객체로 변환
    }

    setInput({
      ...input, // 기존값
      [name]: value, // input textarea 값을 새로운 input 상태변수로 추가
    });
  };

  // App 컴포넌트에 있는 데이터에 추가 // 부모 컴포넌트인 new 컴포넌트에서 받아온 onSummit 함수에 input 상태 추가
  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input name="createdDate" onChange={DateChange} value={getStringedDate(input.createdDate)} type="date" />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {/* isSelected props로 감정 배경 클릭  */}
          {/* 컴포넌트에 수동 이벤트 객체 전달 */}
          {emotionList.map((item, i) => (
            <EmotionItem
              onClick={() =>
                DateChange({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={i}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea onChange={DateChange} name="content" value={input.content} placeholder="오늘은 어땠나요?"></textarea>
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button onClick={onClickSubmitButton} text={"작성완료"} type={"POSITIVE"} />
      </section>
    </div>
  );
};

export default Editor;
