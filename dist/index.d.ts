import type { AnimationKeyframesSequenceMetadata } from '@angular/animations';
export declare function spring({ from, to }: Props, options?: Partial<Options>): import("@angular/animations").AnimationStyleMetadata[];
export interface Props {
    from: Partial<Css>;
    to: Partial<Css>;
}
interface Css {
    x: number;
    y: number;
    scale: number;
    opacity: number;
    rotate: number;
}
interface Options {
    stiffness: number;
    damping: number;
    precision: number;
    unit: string;
}
export default function ({ from, to }: Props, options?: Partial<Options>): AnimationKeyframesSequenceMetadata;
export {};
