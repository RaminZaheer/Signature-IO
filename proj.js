document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("whiteboard");
  const context = canvas.getContext("2d");
  const saveButton = document.getElementById("save");
  const discardButton = document.getElementById("clr");
  const textColorPicker = document.getElementById("textColorPicker");

  let isDrawing = false;

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mousemove", draw);

  saveButton.addEventListener("click", saveImageLocally);
  discardButton.addEventListener("click", clearCanvas);
  textColorPicker.addEventListener("input", changeTextColor); // Change to 'input' event

  function startDrawing(e) {
      isDrawing = true;
      draw(e);
  }

  function stopDrawing() {
      isDrawing = false;
      context.beginPath();
  }

  function draw(e) {
      if (!isDrawing) return;

      context.lineWidth = 2;
      context.lineCap = "round";
      context.strokeStyle = textColorPicker.value;

      context.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
  }

  function saveImageLocally() {
      const dataURL = canvas.toDataURL('image/png');

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'whiteboard_image.png';

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click on the link
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);

      // Clear the canvas after a short delay (adjust as needed)
      setTimeout(() => {
          clearCanvas();
      }, 100);
  }

  function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function changeTextColor() {
      // You may not need this function if the color change is directly applied in the draw function
  }
});
