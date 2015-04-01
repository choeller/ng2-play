import {Component, Template} from 'angular2/angular2';
import {If} from 'angular2/angular2';
import {EventEmitter} from 'angular2/src/core/annotations/di'

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
export class Task
{
    constructor(
        @EventEmitter('draggedover') draggedOver:Function,
        @EventEmitter('dropped') dropped:Function,
        @EventEmitter('dragstarted') dragstarted:Function
    ) {
        this.dragstarted = dragstarted;
        this.draggedOver = draggedOver;
        this.dropped = dropped;
    }

    ondragstart(event) {
        this.dragstarted(this.taskdata);
    }

    ondragover(event) {
        event.preventDefault();

        this.draggedOver(this.taskdata);
    }
    ondrop(event) {
        this.dropped(this.taskdata);
    }

}
