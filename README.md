# Preparación

- Extensiones recomendadas: [angular-essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials), [autoimport](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport), [angular-language-service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).

- Angular JS (v1) vs Angular (v2 to v18-19)

- [Angular CLI](https://angular.dev/tools/cli), [documentación de comandos](https://angular.dev/cli)

- [Single responsibility](https://en.wikipedia.org/wiki/Single-responsibility_principle) El principio de responsabilidad única establece que una clase o módulo debe tener una única razón para **cambiar**, es decir, debe estar enfocada en una sola responsabilidad. Por ejemplo, si un módulo maneja tanto la compilación como la impresión de un informe, esos son dos motivos diferentes para cambiar y deberían estar en clases separadas. Mantener una clase centrada en una sola tarea la hace más robusta, ya que los cambios en una parte no afectarán otras funcionalidades que no estén relacionadas.

# Reglas de estilo Angular

- Solo un componente o servicio por archivo
- Considera limitar los archivos a 400 lineas de código
- Sigue un patrón en los nombres como _feature.type.ts_
- Usa guiones para separar palabras en el nombre y puntos para su tipo.
- Nombres convencionales son .service.ts, .component.ts, .pipe.ts, .module.ts y .directive.ts

- Nombre de la clase

| Nombre clase                                  | Nombre archivo     |
| --------------------------------------------- | ------------------ |
| `@Component({...}) export class AppComponent` | `app.component.ts` |

# Fundamentales

## Directivas vs Componentes

Tenemos este componente.

```javascript
template: `<button class="my-btn" [class.isActive]=" ! saved || hasError" [disabled]="saved && ! hasError">{{buttonText }}</button>`;
```

Para trabajar con este componente de botón se necesita:

```
export class MyButtonComponent {
  @Input()
  saved: boolean;
  @Input()
  hasError: boolean;
  @Input()
  buttonText: string;
}
```

El botón solo puede mostrar texto, no un HTML (sin iconos, por ejemplo), para una directiva por ejemplo:

```javascript
@Directive({
  selector: '[isActive]'
})
export class ActiveDirective {
  @HostBinding('class.my-btn')
  private myBtn = true;

  @HostBinding('class.my-btn')
  private _isActive: boolean = true;

  @HostBinding('disabled')
  private disabled = false;

  @Input()
  set isActive(value: boolean) {
    this._isActive = value;
    this.disabled = !value;
  }
}
// y su uso
<button [isActive]="! saved || hasError">Test 2</button>
```

Esta implementación, funciona con cualquier HTML, puede mostrar todo no solo texto; esto hace el código más reusable.

## Pipes

Pipes ayudan a formatear datos como strings, dates, numbers, etc. Esto genera una clase con una función transform.

```
ng generate pipe [name]
ng g p [name]
```

Lo podemos configurar de la siguiente manera:

```javascript
transform(value: Person, displayPrefix: boolean = true): string {
  let prefix = "";
  if (displayPrefix)
    prefix = (value.gender =="Male") ? "Mr. " : "Mrs. "
  return `${prefix}${value.firstname} ${value.lastName}`
}
// Y se usa como

{{ person | personNamePipe }}
```

## Servicios

Una directiva o una pipe son creados cuando son usados por un componente o template y destruidos cuando el componente es destruido.
Un servicio no, este se crea por Angular cuando un componente lo necesita por primera vez, Luego esa instancia permanece como única y se comparte con todos los componentes que inyectan tal servicio.
Un servicio no se destruye, permanece en memoria tanto como la app este abierta.
En resumen:

- **¿Por cuánto un componente/servicio/directiva permanecen en memoria?** Componentes permanecen tanto como estén presentes en el DOM, los servicios permanecen tanto como la aplicación este abierta.

- **¿Cómo almaceno información antes de navegar a otra página/vista/componente?** Si solo lo guardas en un servicio.

- **¿Qué pasa si abro la app en otra pestaña?** Se crea una instancia diferente (componentes, servicios, etc). Son instancias separadas y no comparten datos o espacio de memoria.

Los servicios son el mejor lugar donde almacenar datos entre componentes. Se pueden usar [_BehaviorSubjects_](https://www.angulartraining.com/daily-newsletter/subject-behaviorsubject-and-replaysubject/) o [_Signals_](https://www.angulartraining.com/daily-newsletter/signals-why-and-when-do-we-need-them/) para almacenar los datos y obtener el último valor a cualquier suscriptor (componente, directiva, pipe, servicio, etc)

Aquí un ejemplo usando un Signal para almacenar un valor y exponerlo en modo lectura.

```javascript
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencySignal = signal<Currency>("USD");
  currency: Signal<Currency> = this.currencySignal.asReadOnly();

  setCurrency(curr: Currency) {
    this.currencySignal.set(curr);
  }

  getCurrency(): Currency {
    return this.currencySignal();
  }
}
```

## Subject, BehaviorSubject y ReplaySubject

- **BehaviorSubject** Este siempre tiene un valor por defecto (nunca está vacio), cuando se suscribe en este se obtiene inmediatamente el último valor emitido.
- **ReplaySubject** Es similar al superior solo que no tiene un valor por defecto y puede reproducir mas que su último valor, su parámetro constructor indica cuántos valores deben ser reproducidos para nuevos suscriptores.
- **Subject** No tiene ningúna de las capacidades anteriores, cuando un valor es suscrito, los suscriptores actuales lo obtienen pero los futuros no.

## Signals

Desde Angular 16, se marcó signals como developer preview. Su objetivo, Mejorar la detección de cambios removiendo el uso de [Zone.js](https://www.npmjs.com/package/zone.js?activeTab=readme). También el uso es más sencillo haciendo que RxJs sea menos critico que antes, lo que aplica para librerias de control de estado NgRx o NgXs.

Se usa Signals donde se tenga Observables o data bindings

## ngModules

Se exponen las características que se usan en el compilador de templates de manera global por eso se puede usar ngFor y ngIf, todo eso es parte de el CommonModule, que es importado automáticamente en el AppModule.

Angular ha introducido standalone components como alternativa a ngModules, estos componentes no necesitan los módulos porque todas sus dependencias ya están en el código Typescript.

En el pasado, solo había dos opciones para crear tus propios ngModules:

- Compartir componentes/directivas/pipes/services como librería, empaquetandolos en un ngModule.
- Cargar muchas características en forma de lazy load.

## Componentes Standalone

Desde Angular 14, (componente, pipe o directive) pueden ser creados como "standalone".
Estos componentes son standalone porque no pertenecen a un ngModule, pueden ser importados por si mismos y usarlos así.

Antes se tenía (ButtonComponent, ButtonDirective) en un ButtonModule, si se quería usar el ButtonComponent se tenía que importar ButtonModule, así se tenia disponible todo lo que estaba en ButtonModule aunque no se necesitara.

Los standalone se pueden importar como cualquier módulo, esto es mejor para rendimiento:

```
ng generate component Button --standalone
```

![Standalone cheatsheet](./assets/Standalone-Components-Cheatsheet.pdf)

# [Selectors](https://www.angulartraining.com/daily-newsletter/the-power-of-angular-selectors/)

# Decorators

Son la manera de añadir funcionalidad a una clase, función, método, o propiedad. Por ejemplo, a un componente se le pasa datos declarando sus _inputs_:

```javascript
@Component({})
export class CustomSlider {
  value = input<number>(0)
}

<custom-slider [value]="50"/>

```

Los componentes de angular también definen eventos personalizados usando la propiedad _outputs_, se usan para levandar eventos personalizados.

```javascript
@Component({})
export class ExpandablePanel {
  panelClosed = output<void>();
}

<expandable-panel (panelClosed)="savePanelState()"/>
```

Y se puede emitir un evento usando el método

```javascript
this.panelClosed.emit();
```

# [View queries](https://angular.dev/guide/components/queries#view-queries)

Recuperan resultados de los elementos, se pueden recuperar resultados con la función viewChild.

# Bindings

Conección entre el template del componente y sus datos, haciendo que se actualice automáticamente cuando los datos cambien.

```javascript
@Component({
  template: `
    <p>Your color preference is {{ theme }}.</p>
  `,
  ...
})
export class AppComponent {
  theme = 'dark';
}
```

# Template reference variables (# syntax) [ver](https://www.angulartraining.com/daily-newsletter/template-reference-variables/)

```javascript
<input #phone placeholder="phone number" />

// para usar la variable de referencia para obtener el valor del input

<button (click)="callPhone(phone.value)">Call</button>

```

# Control flow blocks

Introducidos en angular 17 (estables en 18), son una alternativa a directivas de angular.

Versión anterior *ngIf *ngElse

```javascript
<div *ngIf="condition; else elseBlock">
  Content to render when the condition is true.
</div>
<ng-template #elseBlock>
   Content to render when the condition is false.
</ng-template>
```

Versión actual

```javascript
<div>
  @if (condition) {
    Content to render when the condition is true.
  } @else {
    Content to render when the condition is false.
 }
</div>

// Ó
@if (a > b) {
  {{a}} is greater than {{b}}
} @else if (b > a) {
  {{a}} is less than {{b}}
} @else {
  {{a}} is equal to {{b}}
}
```

---

Versión nueva loop for

```javascript
@for (item of items; track item.id) {
  {{ item.name }}
}

@for (item of items; track item.id; let idx = $index, e = $even) {
  Item #{{ idx }}: {{ item.name }}
}

@for (item of items; track item.name) {
  <li> {{ item.name }} </li>
} @empty {
  <li> There are no items. </li>
}
```

---

Versión anterior de switch case

```javascript
<div [ngSwitch]="page">
      <p *ngSwitchCase="1">Viewing content of first page</p>
      <p *ngSwitchCase="2">Viewing content of second page</p>
      <p *ngSwitchCase="3">Viewing content of third page</p>
      <p *ngSwitchDefault>No page selected</p>
</div>
```

Versión nueva de switch case

```javascript
@switch (page) {
  @case (1) {
    <p>Viewing content of first page</p>
  }
  @case (2) {
    <p>Viewing content of second page</p>
  }
  @default {
     <p>No page selected</p>
  }
}
```

NOTAS:

- Las directivas ngIf, ngFor, ngSwitch no se irán.
- Puedes usar cualquiera desde Angular 17+.
- Existe una migración automatica en el CLI. ng g @angular/core:control-flow
- Se dice que esta nueva sintaxis tiene mejor rendimiento

# @let variables locales Angular 18+ [https://www.angulartraining.com/daily-newsletter/let-for-local-variables-in-angular-views/](ver más)
