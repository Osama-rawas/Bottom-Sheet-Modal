const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const sheetContaint = bottomSheet.querySelector(".containt");
const dragIcon = bottomSheet.querySelector(".drag-icon");

let isDragging = false;
let startY;
let startHeigt;
function showBottomSheet() {
  bottomSheet.classList.add("show");
  document.body.style.overflowY = "hidden";
  updateSheetHeight(50);
}
function hideBottomSheet() {
  bottomSheet.classList.remove("show");
  document.body.style.overflowY = "auto";
}
function updateSheetHeight(height) {
  sheetContaint.style.height = `${height}vh`;
  bottomSheet.classList.toggle("fullscreen", height === 100);
}
function dragStart(e) {
  isDragging = true;
  startY = e.pageY || e.touches?.[0].pageY;
  startHeigt = parseInt(sheetContaint.style.height);
  bottomSheet.classList.add("dragging");
}

function dragging(e) {
  if (!isDragging) return;
  const delta = startY - (e.pageY || e.touches?.[0].pageY);
  const newHeight = startHeigt + (delta / window.innerHeight) * 100;
  sheetContaint.style.height = `${e.pageY}vh`;
  updateSheetHeight(newHeight);
}

function dragStop() {
  isDragging = false;
  bottomSheet.classList.remove("dragging");
  const sheetHeight = parseInt(sheetContaint.style.height);
  if (sheetHeight < 25) hideBottomSheet();
  if (sheetHeight > 75) updateSheetHeight(100);
}
showModalBtn.addEventListener("click", showBottomSheet);
sheetOverlay.addEventListener("click", hideBottomSheet);
document.addEventListener("mousemove", dragging);
dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
document.addEventListener("touchmove", dragging);
dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchend", dragStop);
