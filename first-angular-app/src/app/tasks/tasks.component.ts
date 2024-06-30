import { Component, Input } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
})
export class TasksComponent {
     @Input({required: true}) userId!: string;
     @Input({required: true}) name!: string;
     isAddingTaskng  = false;

     constructor(private tasksService: TasksService){}//we telling angular we need instance using construtor
     
     get selectedUserTasks() {
       return this.tasksService.getUserTasks(this.userId);
     }

     

     onStartAddTask(){
      this.isAddingTaskng = true;
     }

     onCloseAddTask() {
      this.isAddingTaskng = false;
     }

     
}
