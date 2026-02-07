export let HTML: import("nonchalance/ce").HTML;
export let SVG: import("nonchalance/ce").SVG;
export let elements: {
    define: (name: string, constructor: CustomElementConstructor) => void;
    get: (name: string) => CustomElementConstructor | null;
    whenDefined: (name: string) => Promise<CustomElementConstructor>;
};
