import "./App.css";
import { Routes, Route } from "react-router-dom"; // 라우트 컴포넌트
import { useReducer, useRef, createContext, useMemo, useEffect, useState } from "react";
import Home from "./Pages/Home"; // 페이지 컴포넌트
import Diary from "./Pages/Diary"; // 페이지 컴포넌트
import New from "./Pages/New"; // 페이지 컴포넌트
import Edit from "./Pages/Edit"; // 페이지 컴포넌트
import Notfound from "./Pages/Notfound";

// img 반환 함수
import { getEmotionImage } from "./util/get-emotion-image";

// useReducer 데이터 함수
function reducer(state, action) {
  // 로컬스토리지에 값을 저장할 변수
  let nextState;
  // 현재 상태 state , dispatch 에서 요청한 값 action
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// 라우터 설정
// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedDate = localStorage.getItem("diary");
    if (!storedDate) {
      return;
    }
    const parsedData = JSON.parse(storedDate);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;
    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // 새로운 일기 추가
  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  // 현재 수정하려는 id값 까지 추가
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content,
      },
    });
  };
  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        {/* context로 데이터 공급 */}
        <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>
          <Routes>
            {/* Routes 라우트 전체 컴포넌트 감싸기 */}
            {/*path : 경로 ,element:렌더링 할 컴포넌트 */}
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            {/* 위에 있는 페이지 경로가 없으면 * 렌더링 */}
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
