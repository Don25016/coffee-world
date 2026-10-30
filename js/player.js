// Trình phát tùy biến: nút phát/tạm dừng + thanh tiến độ (≤ 60 dòng)
(function () {
  const v = document.getElementById('v'), btn = document.getElementById('pp');
  const bar = document.getElementById('bar'), time = document.getElementById('time');
  const ctl = document.getElementById('ctl'), msg = document.getElementById('msg');
  if (!v || !btn) return;
  v.removeAttribute('controls');   // có JS thì dùng điều khiển tùy biến
  ctl.hidden = false;
  const fmt = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  function label(playing) {
    btn.textContent = playing ? 'Tạm dừng' : 'Phát';
    btn.setAttribute('aria-label', playing ? 'Tạm dừng video' : 'Phát video');
  }
  btn.addEventListener('click', () => {
    if (v.paused) {
      v.play().catch(e => { msg.textContent = 'Không phát được video: ' + e.message; });
    } else {
      v.pause();
    }
  });
  v.addEventListener('play', () => label(true));
  v.addEventListener('pause', () => label(false));
  v.addEventListener('ended', () => label(false));
  v.addEventListener('timeupdate', () => {
    if (!v.duration) return;
    bar.value = (v.currentTime / v.duration) * 100;
    time.textContent = fmt(v.currentTime) + ' / ' + fmt(v.duration);
  });
  bar.addEventListener('input', () => {
    if (v.duration) v.currentTime = (bar.value / 100) * v.duration;
  });
  v.addEventListener('error', () => {   // lỗi của thẻ <source> nổi lên ở pha capture
    msg.textContent = 'Không tải được video. Kiểm tra tệp trong thư mục video/.';
  }, true);
})();
