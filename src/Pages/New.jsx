import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import useTitle from "../hooks/useTitle";

// New 페이지 컴포넌트

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();
  useTitle("운동 일지");

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true });
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
    <div className="new_container" style={styles}>
      <Header title={"운동 일지"} leftChild={<Button onClick={() => nav("/")} text={"< 뒤로 가기"} />} />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
