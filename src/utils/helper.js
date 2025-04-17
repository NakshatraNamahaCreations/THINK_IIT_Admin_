export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  

  export const formatMathJaxContent = (text) => {
    if (!text) return "";
  
    return text
      .replace(/\\includegraphics\[.*?\]{.*?}/g, "")
      .replace(/\\begin{center}.*?\\end{center}/gs, "") 
      .replace(/\$(.*?)\$/g, (match, p1) => `\\( ${p1.replace(/\\/g, "\\")} \\)`) 
      .replace(/\\\\/g, " ") 
      .trim();
  };
