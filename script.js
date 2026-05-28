const pulseButton = document.getElementById('pulseButton');
pulseButton?.addEventListener('click', () => {
  pulseButton.classList.add('pulse');
  setTimeout(() => pulseButton.classList.remove('pulse'), 600);
});

const sidebarNav = document.querySelector('.sidebar-nav');
if (sidebarNav) {
  let isPointerDown = false;
  let isDragging = false;
  let startY = 0;
  let startScroll = 0;
  const DRAG_THRESHOLD = 6; // pixels

  sidebarNav.addEventListener('pointerdown', (event) => {
    isPointerDown = true;
    isDragging = false;
    startY = event.clientY;
    startScroll = sidebarNav.scrollTop;
  });

  sidebarNav.addEventListener('pointermove', (event) => {
    if (!isPointerDown) return;
    const deltaY = event.clientY - startY;
    if (!isDragging && Math.abs(deltaY) > DRAG_THRESHOLD) {
      isDragging = true;
      sidebarNav.classList.add('dragging');
      try { sidebarNav.setPointerCapture(event.pointerId); } catch (e) {}
    }
    if (isDragging) {
      sidebarNav.scrollTop = startScroll - deltaY;
    }
  });

  const stopDrag = (event) => {
    isPointerDown = false;
    if (isDragging) {
      isDragging = false;
      sidebarNav.classList.remove('dragging');
      try { sidebarNav.releasePointerCapture(event?.pointerId); } catch (e) {}
    }
  };

  sidebarNav.addEventListener('pointerup', stopDrag);
  sidebarNav.addEventListener('pointerleave', stopDrag);
  sidebarNav.addEventListener('lostpointercapture', stopDrag);
}
