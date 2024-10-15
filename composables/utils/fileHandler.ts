export const fileHandler = () => {
  const downloadHandler = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    a.download = filename + `_${year}${month}${day}_${hours}${minutes}${seconds}`;
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };
  return { downloadHandler };
};
