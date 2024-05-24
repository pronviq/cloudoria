export default function (size: number): { size: number; unit: string } {
  let unit = "Б";
  let num = size;
  if (num >= 102.4) {
    unit = "КБ";
    num = num / 1024;
  }
  if (num >= 102.4) {
    unit = "МБ";
    num = num / 1024;
  }
  num = num * 10;
  num = Math.round(num);
  num = num / 10;
  return { size: num, unit };
}
