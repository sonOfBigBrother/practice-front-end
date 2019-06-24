 export const getCursorPosition = (e) => {
     let caretOffset = 0;
     const doc = e.ownerDocument || e.document;
     const win = doc.defaultView || doc.parentWindow;
     const sel = win.getSelection();
     if (sel.rangeCount > 0) {
         const range = win.getSelection().getRangeAt(0);
         const preCaretRange = range.cloneRange();
         preCaretRange.selectNodeContents(e);
         preCaretRange.setEnd(range.endContainer, range.endOffset);
         caretOffset = preCaretRange.toString().length;
     }
     return caretOffset;
 }

 export const setCursorPosition = (e, cursorPosition) => {
     const range = document.createRange();
     range.setStart(e.firstChild, cursorPosition);
     range.setEnd(e.firstChild, cursorPosition);
     const sel = window.getSelection();
     sel.removeAllRanges();
     sel.addRange(range);
 }