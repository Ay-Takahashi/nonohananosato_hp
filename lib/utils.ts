/**
 * GitHub Pages用の画像パスを生成
 */
export const getImagePath = (path: string): string => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}`;
};

/**
 * メニューアイテムの画像パスを変換
 */
export const transformMenuImages = <T extends { image?: string }>(items: T[]): T[] => {
  return items.map(item => ({
    ...item,
    ...(item.image && { image: getImagePath(item.image) })
  }));
};

/**
 * カテゴリー付きメニューの画像パスを変換
 */
export const transformMenuCategories = <T extends { menuItems: Array<{ image?: string }> }>(categories: T[]): T[] => {
  return categories.map(category => ({
    ...category,
    menuItems: transformMenuImages(category.menuItems)
  }));
};

/**
 * コースメニューデータの画像パスを変換
 */
export const transformCourseMenuImages = <T extends { image?: string }>(menus: T[]): T[] => {
  return menus.map(menu => ({
    ...menu,
    ...(menu.image && { image: getImagePath(menu.image) })
  }));
};
