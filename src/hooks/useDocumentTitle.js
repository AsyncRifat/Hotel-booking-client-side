import { useEffect } from 'react';

const useDocumentTitle = (title, prevTitleRestore = true) => {
  useEffect(() => {
    const previousTitle = document.title;

    if (title) {
      document.title = title;
    }

    return () => {
      if (prevTitleRestore) {
        document.title = previousTitle;
      }
    };
  }, [title, prevTitleRestore]);
};

export default useDocumentTitle;
