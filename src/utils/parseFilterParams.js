const ParseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return undefined;
  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);
  if (isContactType(contactType)) return contactType;
};
const ParseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'boolean') {
    return isFavourite;
  }
  if (typeof isFavourite === 'string') {
    // Перетворюємо рядок 'true' або 'false' на відповідне булеве значення
    return isFavourite.toLowerCase() === 'true';
  }
  // Повертаємо undefined, якщо значення не підходить
  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = ParseContactType(contactType);
  const parsedIsFavourite = ParseIsFavourite(isFavourite);
  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
