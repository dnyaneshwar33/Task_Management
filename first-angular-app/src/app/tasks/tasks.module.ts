import { NgModule } from "@angular/core";
import { TaskComponent } from "./task/task.component";
import { TasksComponent } from "./tasks.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { SharedModule } from "../shared/card/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
@NgModule({
    declarations: [TaskComponent,TasksComponent,NewTaskComponent],
    exports: [TasksComponent],
    imports: [SharedModule,FormsModule, CommonModule]
})
export class TasksModule{}