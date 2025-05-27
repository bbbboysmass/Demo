const url = 'your-pdf-file.pdf';  // Change this to your PDF path
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');

let pdfDoc = null;
let pageNum = 1;

pdfjsLib.getDocument(url).promise.then((doc) => {
  pdfDoc = doc;
  renderPage(pageNum);
});

function renderPage(num) {
  pdfDoc.getPage(num).then((page) => {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport: viewport,
    };
    page.render(renderCtx);
  });
}

// Swipe control
const hammer = new Hammer(canvas);
hammer.on('swipeleft', () => {
  if (pageNum < pdfDoc.numPages) {
    pageNum++;
    renderPage(pageNum);
  }
});
hammer.on('swiperight', () => {
  if (pageNum > 1) {
    pageNum--;
    renderPage(pageNum);
  }
});
