export function formatCount(
    number: number,
    type: "exact" | "compact" = "exact"
) {
    if (number === undefined || number === null) return "0";

    if (type === "compact" && number >= 10000) {
        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
        }).format(number);
    }

    return number.toLocaleString('en-US');
};