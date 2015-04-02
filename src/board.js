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
  directives: [Task, For]
})
export class Board {

    constructor() {
        this.tasks = [{state: 'BACKLOG', text: "Blubb"}, {state: 'BACKLOG', text: "Bla"}, {state: 'OPEN', text: "OPEN"}];
        this.taskMap = _.groupBy(this.tasks, function(task) {
            return task.state;
        });
        this.states = ['BACKLOG', 'OPEN', 'IN_PROGRESS', 'CLOSED'];
    }

    getTasks(state) {
        this.taskMap[state] = this.taskMap[state] || [];
        return this.taskMap[state];
    }

    moveTo(task, state, predecessor) {
        console.log(predecessor)
        var oldList = this.getTasks(task.state);
        var newList = this.getTasks(state);
        _.pullAt(oldList, [oldList.indexOf(task)]);
        task.state = state;
        var index = newList.indexOf(predecessor) != -1 ? newList.indexOf(predecessor) + 1 : newList.length;
        this.getTasks(state).splice(index, 0, task);
    }

    onBoardDragOver(state, event) {
        this.newState = state;
        this.newIndex = null;
        event.preventDefault();
    }

    onDragStarted(task) {
        this.currentlyDragged = task;
    }

    onTaskDraggedOver(task) {
    if (task !== this.currentlyDragged) {
            this.currentlyOver = task;
            this.newState = task.state;
            this.newIndex=this.getTasks(task.state).indexOf(task)+1;
        }
    }
    onTaskDraggedOut(task) {
    if (task !== this.currentlyDragged) {
            this.currentlyOver = null;
        }
    }


    onDroppedOnTask(task) {
        this.drop(task.state)
    }

    drop(state) {
        this.moveTo(this.currentlyDragged, state, this.currentlyOver);
        this.currentlyOver = null;
    }
}

