const timeline = document.getElementById('timeline');
const addBtn = document.getElementById('addBtn');

addBtn.onclick = () => {
  location.href = 'editor.html';
};

async function render() {
  const list = await getAllDiaries();
  list.sort((a, b) => b.createdAt - a.createdAt);

  timeline.innerHTML = '';
  list.forEach(d => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div class="summary">${d.summary || ''}</div>`;
    card.onclick = () => {
      location.href = `editor.html?id=${d.id}`;
    };
    timeline.appendChild(card);
  });
}

render();
