// input 상태변수에 들어간 createdDate 를 변환
export const getStringedDate = (targetDate) => {
   // 날짜 -> YYYY-MM-DD 반환
   let year = targetDate.getFullYear();
   let month = targetDate.getMonth() + 1;
   let date = targetDate.getDate();
 
   // 10이하 월 일을 9면 09 이렇게 표시 해주기 위해서 조건문 사용
   if (month < 10) {
     month = `0${month}`;
   }
   if (date < 10) {
     date = `0${date}`;
   }
   // 화면에 렌더링 표시
   return `${year}-${month}-${date}`;
 };