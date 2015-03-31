import {Component, Template} from 'angular2/angular2';
import {If} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'task',
    bind: {
        'taskdata': 'taskdata'
    }
})
@Template({
  url: 'components/task.html'
})
// Component controller
export class Task {

    constructor() {
      this.title =  'World';
      this.state = 'BACK_LOG';
    }

    setTitle(title) {
      this.title = title
    }

    drag($event) {
            console.log("Start ", $event)

         //   ev.dataTransfer.setData("text", ev.target.id);
    }
}

