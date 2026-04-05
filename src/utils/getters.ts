export const getCurrentUsername = (): string | null => {
    const username = window.location.pathname.split('/')[1];
    return username || null;
};