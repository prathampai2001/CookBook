import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ShoppingListComponent } from '../shopping-list.component';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl:'./shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
  
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
//For Loading shoppinh list items into forms
  @ViewChild('f',{static:false}) slForm:NgForm;

  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;
  
  constructor(private slService:ShoppingListService){}
  
  
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.subscription.unsubscribe();
  
  }
  
  ngOnInit() {
  //  throw new Error('Method not implemented.');
  

  // @ViewChild("nameInput",{static:false})nameInputRef:ElementRef;
  // @ViewChild("amountInput",{static:false})amountInputRef:ElementRef;
  // ingredientAdded=new EventEmitter<{name:string,amount:number}>();

  //@Output() ingredientAdded=new EventEmitter<Ingredient>();
  // @Output ()ingredientAdded=new EventEmitter<Ingredient>();
  
    this.slService.startedEditing
    .subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
          this.editMode=true;
          this.editedItem=this.slService.getIngredient(index);
          this.slForm.setValue({
            name:this.editedItem.name,
            amount:this.editedItem.amount
          })
      }
    );



}
  
  
  
  
  onSubmit(form:NgForm){
    event.preventDefault();     //From Preventong it from Overloading
    // const ingName=this.nameInputRef.nativeElement.value;
    // const ingAmount=this.amountInputRef.nativeElement.value;
    
    const value=form.value;
    
    //forms
    const newIngredient=new Ingredient(value.name,value.amount);
    
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    
    //this.ingredientAdded.emit(newIngredient);
  // this.slService.addIngredient(newIngredient);
    this.editMode=false;
    form.reset();
  }


  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
 


}
