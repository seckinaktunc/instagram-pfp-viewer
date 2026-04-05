import { createRoot } from "react-dom/client";
import ProfileOverlay from "../components/ProfileOverlay";

export default function initialize() {
    const injectReactOverlay = () => {
        const profileImage = document.querySelector('header img[alt*="profile picture" i]') as HTMLImageElement;
        if (!profileImage) return;

        const parentContainer = profileImage.parentElement;
        if (!parentContainer) return;

        if (parentContainer.querySelector('.ig-full-res-extension')) return;

        if (window.getComputedStyle(parentContainer).position === 'static') {
            parentContainer.style.position = 'relative';
        }

        const injectionPoint = document.createElement('div');
        injectionPoint.className = 'ig-full-res-extension';
        parentContainer.appendChild(injectionPoint);

        const root = createRoot(injectionPoint);
        root.render(<ProfileOverlay />);
    };

    const startObserver = () => {
        const observer = new MutationObserver(() => {
            const path = window.location.pathname;
            if (path !== '/' && path.split('/').length <= 3) {
                const excludedPaths = ['explore', 'reels', 'direct', 'stories'];
                const currentPath = path.split('/')[1];

                if (!excludedPaths.includes(currentPath)) {
                    injectReactOverlay();
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    startObserver();
}