export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  console.log(date);
  
    return `${day}/${month}/${year}`;
  }
  

  export const formatMathJaxContent = (text) => {
    if (!text) return "";
  
    return text
      .replace(/\\includegraphics\[.*?\]{.*?}/g, "") // Remove image placeholders
      .replace(/\\begin{center}.*?\\end{center}/gs, "") // Remove centered content
      .replace(/\$(.*?)\$/g, (match, p1) => `\\( ${p1.replace(/\\/g, "\\")} \\)`) // Convert inline math
      .replace(/\\\\/g, " ") // Replace double backslashes with space
      .trim();
  };
