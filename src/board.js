import {Component, Template, For} from 'angular2/angular2';
import {If} from 'angular2/angular2';
import {Task} from 'components/task';

//enum TaskState {BACKLOG, OPEN, IN_PROGRESS, CLOSED};

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
        this.tasks = [{state: 'BACKLOG', text: "Blubb"}, {state: 'BACKLOG', text: "Bla"}, {state: 'OPEN', text: "OPEN"}];
        this.placeholderTask = {state: 'BACKLOG', text: "Drop here", isPlaceholder: true}
        this.states = ['BACKLOG', 'OPEN', 'IN_PROGRESS', 'CLOSED'];
    }

    getTasks(state) {

        var result =  this.tasks.filter((task) => {
            return task.state === state;
        });

        result.forEach( (element, index) => {
            if (element === this.currentlyOver) {
                this.placeholderTask.state = this.currentlyOver.state;
                result.splice(index+1, 0, this.placeholderTask);
            }
        });

        return result;
    }

    onBoardDragOver(event) {
        event.preventDefault();
    }

    onDragStarted(task) {
        this.currentlyDragged = task;
    }

    onTaskDraggedOver(task) {
        if (task !== this.currentlyDragged) {
            this.currentlyOver = task;
        }
    }

    onDroppedOnTask(task) {
        this.drop(task.state)
    }

    drop(state, event) {
        this.currentlyDragged.state = state;
        if (this.currentlyOver !== null) {
           var newIndex =  this.tasks.indexOf(this.currentlyOver);
           var oldIndex =  this.tasks.indexOf(this.currentlyDragged);
            this.tasks.move(oldIndex, newIndex);
        }
        this.currentlyOver = null;
    }
}

