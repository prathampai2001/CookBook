import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent  implements OnInit,OnDestroy{
  ingredients:Ingredient[];

  //Store the subscrition in some property
  private igChangeSub:Subscription;


constructor(private slService:ShoppingListService){}
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  this.igChangeSub.unsubscribe();
  
  
  }


  ngOnInit() {
  //throw new Error('Method not implemented.');

  this.ingredients=this.slService.getIngredients();

  this.igChangeSub=this.slService.ingredientsChanged
    .subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    );
}


//   ingredients:Ingredient[]=[
//     new Ingredient("Apple",5),
//     new Ingredient("Tomato",15),
// ];


// onIngredientAdded(ingredient:Ingredient){
//  // this.ingredients.push(ingredient);

// }


// addIngredient(ingredient:Ingredient){
//   this.ingredients.push(ingredient);
// }



onEditItem(index:number){
  this.slService.startedEditing.next(index);


}
  

}
