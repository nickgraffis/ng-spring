# Documentation
Full docs can be found at [nickgraffis.github.io/ng-spring](nickgraffis.github.io/ng-spring)

# Installation

```bash
yarn add ng-spring
```

Or use `npm` or `pnpm`.

:::tip No NgModule imports are required.
You don't need to add any modules, this is a pure fucntions that can be imported and used directly.
::: 

# Usage
Useage is extreamly simple, just replace `keyframes` from `@angular/animations` with the default export from `ng-spring`. 

## Basic 

```ts{8-11}
import springKeyframes from 'ng-spring'

@Component({
  selector: 'app-hello',
  animations: [
    trigger('openClose', [ 
      transition('open => closed', [
        animate('500ms', springKeyframes({
          from: {opacity: 0, transform: 'translateY(-100px)'},
          to: {opacity: 1, transform: 'translateY(0)'}
        }))
      ]),
    ])
  ]
})
export class HelloComponent {
  @HostBinding('@openClose')
  public animate = true
}
```

It works the same in more advanced use cases:

```ts{10-13}
import springKeyframes from 'ng-spring'

@Component({
  selector: 'app-hello',
  animations: [
    trigger('helloAnimation', [
      transition(':enter', [
        query('.hero', [
          stagger(30, [
            animate('500ms', springKeyframes({
              from: {opacity: 0, transform: 'translateY(-100px)'},
              to: {opacity: 1, transform: 'translateY(0)'}
            }))
          ])
        ])
      ])
    ])
  ]
})
export class HelloComponent {
  @HostBinding('@helloAnimation')
  public animate = true
}
```

## Options

The first option of `springKeyframes` is an object with two properties, `from` and `to`. The `from` property is an object with the properties that you want to animate from, and the `to` property is an object with the properties that you want to animate to.

The second option of `springKeyframes` is the options object.

```ts
interface Options {
  stiffness: number
  damping: number
  precision: number
  unit: string
}
```

### Stiffness
**Default: 100**

The attraction force of a spring. Higher values create faster, sharper movement.

### Damping
**Default: 10**

The opposing force of a spring. Higher values reduce the bounciness of the spring.

### Precision
**Default: 0.001**

The precision of values that are being animated.

### Unit
**Default: 'px'**

The unit of measurement for the css properties.