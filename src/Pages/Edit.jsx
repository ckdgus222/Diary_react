import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { DiaryStateContext, DiaryDispatchContext } from "../App";
import { useContext, useEffect, useState } from "react";
import useDiary from "../hooks/useDiary";
import useTitle from "../hooks/useTitle";

const Edit = () => {
  const params = useParams(); // 유저 주소 입력값
  const nav = useNavigate(); // 라우터 useNavigate 함수
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext); // App 컴포넌트에 삭제 업데이트 기능 함수 context 불러오기

  const curDiaryItem = useDiary(params.id);

  useTitle(`${params.id}번 운동 일지 수정`);

  if (!curDiaryItem) {
    return <div>데이터 로딩중...</div>;
  }

  // 일기 삭제 함수
  const onClickDelete = () => {
    let conf = window.confirm("일지를 정말 삭제할까요? 다시 복구되지 않습니다"); // confirm 메서드로 경고창 뛰우고
    if (conf) {
      // 확인 true 가 나오면
      onDelete(params.id); //App 컴포넌트 에서 context 로 불러온 onDelete 함수 실행
      nav("/", { replace: true }); // 페이지 이동훅 replace 값 true 지정
    }
  };

  // 일기 수정 함수
  const onSubmit = (input) => {
    if (window.confirm("운동 기록을 정말 수정할까요?")) {
      // confirm 함수로 확인을 눌렀을시 // true onUpdate 함수 실행
      onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content); // App 컴포넌트에서 불러온 업데이트 함수
    }
    nav("/", { replace: true }); // 페이지 이동
  };
  const styles = {
    backgroundColor: "#b2b2b2",
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    minHeight: "50%",
    height: "100%",
    boxShadow: "rgba(100, 100, 100, 0, 2) 0px 0px 29px 0px",
    padding: "0px 20px",
    borderRadius: "20px",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -40%)",
  };

  return (
    <div style={styles}>
      <Header
        title={"운동 일지 수정하기"}
        leftChild={<Button onClick={() => nav("/")} text={"< 뒤로 가기"} />}
        rightChild={<Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />}
      />
      <Editor onSubmit={onSubmit} initData={curDiaryItem} />
    </div>
  );
};

export default Edit;
