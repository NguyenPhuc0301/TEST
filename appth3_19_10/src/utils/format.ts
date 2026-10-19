export const DAY_NAMES = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
};

export const daysLeft = (iso: string) =>
  Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);

export const dueText = (iso: string) => {
  const n = daysLeft(iso);
  if (n < 0) return `Quá hạn ${-n} ngày`;
  if (n === 0) return 'Hết hạn hôm nay';
  return `Còn ${n} ngày`;
};
