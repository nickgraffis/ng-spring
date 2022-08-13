import type { AnimationStyleMetadata } from "@angular/animations"

export default function (tokens: "*" | { [key: string]: string | number; } | ("*" | { [key: string]: string | number; })[]): AnimationStyleMetadata  {
  return {
    type: 6, //https://angular.io/api/animations/AnimationMetadata#type
    styles: tokens,
    offset: null
  }
}