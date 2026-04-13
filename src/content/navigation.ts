export const LOCATION_CHANGE_EVENT = "locationchange";

let isNavigationPatched = false;

const dispatchLocationChange = () => {
    window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
};

const patchHistoryMethod = (methodName: "pushState" | "replaceState") => {
    const originalMethod = history[methodName] as History["pushState"] & { __igPfpViewerWrapped?: boolean };

    if (originalMethod.__igPfpViewerWrapped) {
        return;
    }

    const wrappedMethod = function patchedHistoryMethod(
        this: History,
        ...args: Parameters<History["pushState"]>
    ) {
        const result = originalMethod.apply(this, args);
        dispatchLocationChange();
        return result;
    };

    wrappedMethod.__igPfpViewerWrapped = true;
    history[methodName] = wrappedMethod as History["pushState"];
};

export const installLocationChangeHandling = () => {
    if (isNavigationPatched) {
        return;
    }

    isNavigationPatched = true;
    patchHistoryMethod("pushState");
    patchHistoryMethod("replaceState");
    window.addEventListener("popstate", dispatchLocationChange);
};
