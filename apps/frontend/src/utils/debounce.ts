export default function debounce<F extends (...args: unknown[]) => unknown>(
    func: F,
    delay: number,
) {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<F>) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => func(...args), delay);
    };
}
