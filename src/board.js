import {Component, Template, For} from 'angular2/angular2';
import {If} from 'angular2/angular2';
import {Task} from 'components/task';

// Annotation section
@Component({
  selector: 'board'
})
@Template({
  url: 'board.html',
 //   inline: `Bla`,
  directives: [Task, For]
})
// Component controller
export class Board {

    constructor() {
      this.tasks = [{text: "Blubb"}, {text: "Bla"}] ;
    }

    drop(state) {
        console.log(state)
    }

}
//bootstrap(Board);

