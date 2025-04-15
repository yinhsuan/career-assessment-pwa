import { Workbox } from 'workbox-window';

export function registerServiceWorker(): void {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    const wb = new Workbox('/service-worker.js');
    
    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        if (confirm('應用有新版本可用，請刷新頁面更新。')) {
          window.location.reload();
        }
      }
    });
    
    wb.register();
  }
}