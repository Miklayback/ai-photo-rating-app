const photoInput = document.querySelector("#photoInput");
const dropZone = document.querySelector("#dropZone");
const preview = document.querySelector("#photoPreview");
const previewFrame = document.querySelector("#previewFrame");
const previewEmpty = document.querySelector("#previewEmpty");
const rateButton = document.querySelector("#rateButton");
const uploadStatus = document.querySelector("#uploadStatus");
const scoreValue = document.querySelector("#scoreValue");
const scoreCaption = document.querySelector("#scoreCaption");
const exposureFeedback = document.querySelector("#exposureFeedback");
const compositionFeedback = document.querySelector("#compositionFeedback");
const lightShadowFeedback = document.querySelector("#lightShadowFeedback");
const humanityFeedback = document.querySelector("#humanityFeedback");
const summaryFeedback = document.querySelector("#summaryFeedback");

let selectedFile = null;
let previewUrl = null;

const feedbackOptions = [
  {
    score: 96,
    rank: "夯爆了",
    caption: "第一眼很抓人，整体完成度非常高。",
    exposure: "曝光控制很稳，主体亮度明确，高光没有明显炸掉，暗部也保留了层次。",
    composition: "画面重心清楚，主体位置舒服，留白没有浪费，视觉动线能自然落到重点上。",
    lightShadow: "光影关系有戏剧性，明暗过渡自然，照片有立体感和氛围。",
    humanity: "人物或场景情绪成立，有故事感，不只是好看，而是能让人多看两眼。",
    summary: "夯爆了。可以直接拿去发，后期只需要很克制地微调色温和锐度。"
  },
  {
    score: 89,
    rank: "顶级",
    caption: "整体很强，稍微修一下就能更利落。",
    exposure: "曝光基本准确，主体清晰，只是局部亮面可以再压一点，避免视线被带走。",
    composition: "构图有章法，主体和背景关系清楚。边缘杂物如果裁掉，画面会更集中。",
    lightShadow: "光线方向不错，阴影提供了层次，但对比可以再柔一点。",
    humanity: "题材表达明确，现场感不错，但情绪爆点还可以再往前推一点。",
    summary: "顶级。已经是能发的水平，建议微调裁切、压高光，再加一点局部对比。"
  },
  {
    score: 78,
    rank: "人上人",
    caption: "基础不错，有明确优点，但还有提升空间。",
    exposure: "主体能看清，曝光没有大问题，不过暗部略闷，整体通透感还可以加强。",
    composition: "主体位置合理，但画面元素稍多，重点不够一锤定音。",
    lightShadow: "光影有层次，但不够干净，亮部和暗部之间的关系还可以更明确。",
    humanity: "题材有生活气息，能看出现场感，但故事性还没有完全打出来。",
    summary: "人上人。比普通照片强，建议重新裁一下，提暗部，降低无关区域的存在感。"
  },
  {
    score: 61,
    rank: "npc",
    caption: "能看，但记忆点比较弱。",
    exposure: "曝光偏平，主体和背景亮度差不明显，画面缺少重点。",
    composition: "构图比较常规，主体位置有点随手，边缘干扰物会分散注意力。",
    lightShadow: "光影存在感弱，照片看起来偏记录，氛围没有被拉起来。",
    humanity: "题材信息有了，但情绪和关系不够明确，观众很难马上进入画面。",
    summary: "npc。不是废片，但需要更明确的主体、更狠的裁切和更有方向的光线。"
  },
  {
    score: 42,
    rank: "拉完了",
    caption: "目前问题比较集中，需要重新拍或大幅调整。",
    exposure: "曝光不稳定，主体要么偏暗，要么被背景亮部抢走，第一眼不够清楚。",
    composition: "画面重点散，主体、背景和边缘元素互相抢戏，缺少明确秩序。",
    lightShadow: "光线比较乱，阴影没有形成层次，反而让画面显得脏或平。",
    humanity: "题材表达不清楚，看不出你想让观众关注什么情绪或故事。",
    summary: "拉完了。建议换角度、找更干净的背景，先把主体和光线关系拍清楚。"
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
  scoreCaption.textContent = "准备进行模拟 AI 评分。";
  exposureFeedback.textContent = "点击评分按钮后生成反馈。";
  compositionFeedback.textContent = "点击评分按钮后生成反馈。";
  lightShadowFeedback.textContent = "点击评分按钮后生成反馈。";
  humanityFeedback.textContent = "点击评分按钮后生成反馈。";
  summaryFeedback.textContent = "点击评分按钮后生成汇总。";
}

function ratePhoto() {
  if (!selectedFile) {
    return;
  }

  const option = feedbackOptions[selectedFile.name.length % feedbackOptions.length];
  scoreValue.textContent = option.score;
  scoreCaption.textContent = `${option.rank}：${option.caption}`;
  exposureFeedback.textContent = option.exposure;
  compositionFeedback.textContent = option.composition;
  lightShadowFeedback.textContent = option.lightShadow;
  humanityFeedback.textContent = option.humanity;
  summaryFeedback.textContent = option.summary;
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
