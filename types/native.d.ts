export namespace elements {
    function define(name: string, constructor: CustomElementConstructor): void;
    function get(name: string): CustomElementConstructor | null;
    function whenDefined(name: string): Promise<CustomElementConstructor>;
}
export const HTML: import("nonchalance/ce").HTML;
export const SVG: import("nonchalance/ce").SVG;
