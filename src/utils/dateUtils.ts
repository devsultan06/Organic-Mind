// utils/dateUtils.ts
export const formatDate = (date: Date): string => {
    const currentDate = new Date(date);
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    return formattedDate;
};
