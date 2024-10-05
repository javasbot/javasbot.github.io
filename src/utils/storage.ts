const projectName = 'gaoblog'
const env = import.meta.env.MODE

const prefix = `${projectName}-${env}-`;

export const setItem = (key: any, value: any) => {
  sessionStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
};

export const getItem = (key: any) => {
  const item = sessionStorage.getItem(`${prefix}${key}`);
  return item ? JSON.parse(item) : null;
};

export const removeItem = (key: any) => {
  sessionStorage.removeItem(`${prefix}${key}`);
};

export const clear = () => {
  sessionStorage.clear();
};
