// «Xem thêm»: nạp danh sách media từ media.json bằng fetch (cần mở site qua máy chủ)
(function () {
  const btn = document.getElementById('more'), grid = document.getElementById('grid');
  const msg = document.getElementById('more-msg');
  if (!btn || !grid) return;
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    msg.textContent = 'Đang tải…';
    try {
      const res = await fetch('media.json');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const items = await res.json();
      for (const it of items) {
        const li = document.createElement('li'), fig = document.createElement('figure');
        const img = new Image(), cap = document.createElement('figcaption'), b = document.createElement('strong');
        img.src = it.img; img.alt = it.alt; img.width = 480; img.height = 270; img.loading = 'lazy';
        b.textContent = it.title;
        cap.append(b, ' – ' + it.desc);
        fig.append(img, cap); li.append(fig); grid.append(li);
      }
      msg.textContent = 'Đã tải thêm ' + items.length + ' mục.';
      btn.hidden = true;
    } catch (e) {
      msg.textContent = 'Không tải được danh sách (' + e.message + '). Hãy mở site qua máy chủ, ví dụ Live Server, rồi thử lại.';
      btn.disabled = false;
    }
  });
})();
