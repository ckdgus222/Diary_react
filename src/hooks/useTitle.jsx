import { useEffect, useState } from "react";

const useTitle = (title) => {
  useEffect(() => {
    const $titleBanner = document.getElementsByTagName("title")[0];
    $titleBanner.innerText = title;
  }, [title]);
};

export default useTitle;
