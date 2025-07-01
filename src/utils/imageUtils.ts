export class ImageUtils {
  static preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }

  static async preloadImages(srcs: string[]): Promise<void[]> {
    return Promise.all(srcs.map(src => this.preloadImage(src)));
  }

  static generateSrcSet(baseSrc: string, sizes: number[]): string {
    return sizes
      .map(size => `${baseSrc}?w=${size} ${size}w`)
      .join(', ');
  }

  static optimizeImageLoading() {
    // Add intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }
}
