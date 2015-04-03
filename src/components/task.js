import {Component, Template, NgElement} from 'angular2/angular2';
import {If} from 'angular2/angular2';
import {EventEmitter} from 'angular2/src/core/annotations/di'
import {Placeholder} from 'components/placeholder';

// Annotation section
@Component({
  selector: 'task',
    bind: {
        'taskdata': 'taskdata'
    }
})
@Template({
  url: 'components/task.html',
    directives: [Placeholder]
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
        this.dragging = true;
        this.dragstarted(this.taskdata);
    }
    ondragend(event) {
        this.dragging = false;
    }

    ondragover(event) {
        if (!this.dragging) {
            this.isOver = true;
            this.draggedOver(this.taskdata);
        }
        event.preventDefault();
    }

    ondragleave(event) {
        this.isOver = false;
    }

    ondrop(event) {
        this.isOver = false;
        this.dropped(this.taskdata);
    }

}
