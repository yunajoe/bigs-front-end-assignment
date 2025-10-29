const checkTitleValidation = (title: string) => {
  return title.length >= 1 && title.length <= 20;
};

const checkContentValidation = (content: string) => {
  return content.length >= 1 && content.length <= 200;
};

const checkCategoryValidation = (category: string) => {
  return (
    category === "NOTICE" ||
    category === "FREE" ||
    category === "QNA" ||
    category === "ETC"
  );
};

export {
  checkCategoryValidation,
  checkContentValidation,
  checkTitleValidation,
};
