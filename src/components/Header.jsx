import "./Header.css";


const Header = ({ title, leftChild, rightChild }) => {
  return (
    <header className="Header">
      <div className="header_left">{leftChild}</div> {/* 왼쪽 버튼 */}
      <div className="header_center">{title}</div> {/* 날짜 */}
      <div className="header_right">{rightChild}</div> {/* 오른쪽 버튼 */}
    </header>
  );
};

export default Header;
