document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    },
    { threshold: 0.5 }
  ); // Відео відтворюється, якщо видно 50% його висоти

  videos.forEach(video => observer.observe(video));
});
