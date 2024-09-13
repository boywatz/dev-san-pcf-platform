export const useFile = () => {
  const downloadHandler = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };
  return { downloadHandler };
};
