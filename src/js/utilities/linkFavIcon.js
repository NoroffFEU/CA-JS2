export function addFavicon() {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png'; 
    link.href = '/images/favicon.png';
    document.head.appendChild(link);
}