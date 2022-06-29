import {Component} from "@angular/core";

export function DefaultComponent() {
   return (target: any) => {
     const defaultComponentAngular = Component({
       selector: 'unusable-component',
       templateUrl: '<p>This component is the basis for other components, that is, it is unusable!</p>'
     });

    Object.defineProperty(target.prototype, 'annotation', defaultComponentAngular);
  }
}
