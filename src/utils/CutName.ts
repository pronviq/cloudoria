export default function (name: string, maxLength: number): string {
  const length = name.length;
  if (length <= maxLength) return name;

  const newName =
    name.slice(0, maxLength / 2 + 1) + " ... " + name.slice(length - maxLength / 2, length + 1);

  // ("abc[defgh]ijk");
  // let newName = ;
  return newName;
}
