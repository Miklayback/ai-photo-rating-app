const photoInput = document.querySelector("#photoInput");
const dropZone = document.querySelector("#dropZone");
const preview = document.querySelector("#photoPreview");
const previewFrame = document.querySelector("#previewFrame");
const previewEmpty = document.querySelector("#previewEmpty");
const rateButton = document.querySelector("#rateButton");
const uploadStatus = document.querySelector("#uploadStatus");
const scoreValue = document.querySelector("#scoreValue");
const scoreCaption = document.querySelector("#scoreCaption");
const lightingFeedback = document.querySelector("#lightingFeedback");
const compositionFeedback = document.querySelector("#compositionFeedback");
const editingSuggestions = document.querySelector("#editingSuggestions");

let selectedFile = null;
let previewUrl = null;

const feedbackOptions = [
  {
    score: 88,
    caption: "Strong image with a clean first impression.",
    lighting: "The subject is well exposed. A small lift in shadow detail would make the face feel more open.",
    composition: "The framing feels balanced, with enough negative space to keep attention on the subject.",
    editing: "Add a touch of warmth, reduce highlights slightly, and crop closer for profile use."
  },
  {
    score: 76,
    caption: "Solid photo with a few quick wins.",
    lighting: "The light direction is useful, but the image would benefit from softer contrast.",
    composition: "The main subject is clear. Tightening the crop would remove visual distractions near the edges.",
    editing: "Increase clarity modestly, lower saturation by a few points, and straighten the horizon if needed."
  },
  {
    score: 92,
    caption: "Polished and ready to share.",
    lighting: "The exposure feels intentional, with bright detail preserved and a natural highlight rolloff.",
    composition: "The subject placement has good visual weight and the background supports the image.",
    editing: "Keep edits subtle. A slight vignette and selective sharpening would be enough."
  }
];

function setSelectedFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    return;
  }

  selectedFile = file;

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  previewUrl = URL.createObjectURL(file);
  preview.src = previewUrl;
  previewFrame.classList.add("has-image");
  previewEmpty.hidden = true;
  rateButton.disabled = false;
  uploadStatus.textContent = file.name;
  uploadStatus.title = file.name;
  resetFeedback();
}

function resetFeedback() {
  scoreValue.textContent = "--";
  scoreCaption.textContent = "Ready for a mocked AI rating.";
  lightingFeedback.textContent = "Click the rating button to generate feedback.";
  compositionFeedback.textContent = "Click the rating button to generate feedback.";
  editingSuggestions.textContent = "Click the rating button to generate feedback.";
}

function ratePhoto() {
  if (!selectedFile) {
    return;
  }

  const option = feedbackOptions[selectedFile.name.length % feedbackOptions.length];
  scoreValue.textContent = option.score;
  scoreCaption.textContent = option.caption;
  lightingFeedback.textContent = option.lighting;
  compositionFeedback.textContent = option.composition;
  editingSuggestions.textContent = option.editing;
}

photoInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  setSelectedFile(file);
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("is-dragging");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("is-dragging");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("is-dragging");
  const [file] = event.dataTransfer.files;
  setSelectedFile(file);
});

rateButton.addEventListener("click", ratePhoto);
