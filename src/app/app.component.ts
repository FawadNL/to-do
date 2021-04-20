import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <div class="todolist"><input type="text" #myInput class="toDolist"> <button (click)="add()">Click me!</button></div>
    <div class="todolist">{{variableCount}} remaining out of {{totalCount()}} task</div>
    <div class="todolist" *ngFor="let item of items;let i = index">
        <ul>
            <li [ngClass]="{strike : item.isDone}" (click)="remove(item.name,item.index)">{{item.name}}</li>
        </ul>
    </div>
</div>
  `,
  styles: [
    `
      .todolist {
        text-align: center;
        justify-content: space-between;
        padding: 4px;
      }
      .strike {
        text-decoration: line-through;
      }
      .container {
        padding: 16px;
      }
      .toDolist {
        margin: 4px;
      }
    `,
  ],
})
export class AppComponent {
  @ViewChild('myInput') myInput: ElementRef;
  public name: string = '';
  public variableCount = 0;
  public items: Array<TodoItem> = [];
  private index: number = 0;
  constructor() { }
  ngOnInit(): void { }
  public getRemainingCount() {
    return this.items.filter((item) => !item.isDone).length;
  }
  public add() {
    if (this.myInput.nativeElement.value) {
      this.index++;
      let itemData = {
        isDone: false,
        name: this.myInput.nativeElement.value,
        index: this.index
      };
      this.items.push(itemData);
      this.variableCount++;
    }
  }

  public toggleItem(item: TodoItem) {
    item.isDone = !item.isDone;
  }

  remove(name: any, index: any) {
    this.items.map((item: any) => {
      if (item.name == name && item.index == index) {
        item.isDone = !item.isDone;
      }
    })
    this.checkCount();
  }

  checkCount() {
    let increaseCount = this.items.filter((item) => !item.isDone).length;
    this.variableCount = increaseCount;
  }

  totalCount() {
    return this.items.length;
  }

}

class TodoItem {
  isDone: boolean;
  name: string;
  index: number;
}
