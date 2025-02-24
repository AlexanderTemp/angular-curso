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

![alt text](image.png)
