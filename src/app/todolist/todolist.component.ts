import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  isEditEnabled: boolean = false;
  updateIndex: number = 0;

  taskArray : {taskName: string; isCompleted: boolean }[] = [];
  
  condition = localStorage.getItem('toDos');

  constructor() { }

  ngOnInit(): void {
    if(this.condition){
      this.taskArray = JSON.parse(this.condition);
      // alert(this.condition);
    }
  }

  onSubmit(form: NgForm) {
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false
    })

    this.saveLocally();
    form.reset();
  }

  onDelete(index: number) {
    console.log(index);

    this.taskArray.splice(index, 1);
    this.saveLocally();
  }

  onCheck(index: number) {
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    this.saveLocally();
  }

  onEdit(index: number, form:NgForm) {
    console.log(index);

    form.controls['task'].setValue(this.taskArray.at(index)?.taskName);
    
    this.isEditEnabled = true;
    this.updateIndex  = index;
    
    // this.taskArray.push({
    //   taskName: form.controls['task'].value,
    //   isCompleted: false
    // })
  }

  updateTask(form:NgForm){
    this.taskArray[this.updateIndex].taskName = form.controls['task'].value;
    this.saveLocally();
    form.reset();
    this.isEditEnabled = false;
  }

  saveLocally(){
    localStorage.setItem('toDos', JSON.stringify(this.taskArray));
  }

 
}
