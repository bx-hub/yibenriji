const content = document.getElementById('content');
const backBtn = document.getElementById('backBtn');
const dateText = document.getElementById('dateText');
const imgBtn = document.getElementById('imgBtn');
const imgInput = document.getElementById('imgInput');

const params = new URLSearchParams(location.search);
const id = params.get('id') || Date.now().toString();

dateText.innerText = new Date().toLocaleString();

backBtn.onclick = async () => {
  await save();
  location.href = 'index.html';
};

async function save() {
  const html = content.innerHTML;
  const summary = content.innerText.slice(0, 60);
  await saveDiary({
    id,
    createdAt: Number(id),
    updatedAt: Date.now(),
    contentHTML: html,
    summary
  });
}

(async () => {
  const old = await getDiary(id);
  if (old) content.innerHTML = old.contentHTML;
})();

imgBtn.onclick = () => imgInput.click();

imgInput.onchange = e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    document.execCommand('insertImage', false, reader.result);
  };
  reader.readAsDataURL(file);
};
