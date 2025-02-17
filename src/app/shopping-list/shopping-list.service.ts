import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import {Subject} from 'rxjs';

export class ShoppingListService{
// ingredientsChanged=new EventEmitter<Ingredient[]>(); 
ingredientsChanged=new Subject<Ingredient[]>();
startedEditing=new Subject<number>();

      
   private ingredients:Ingredient[]=[
   // new Ingredient("Apple",5),
   // new Ingredient("Tomato",15),
];

   
   
    // ingredient: Ingredient;
getIngredients(){
    return this.ingredients.slice();

}


    getIngredient(index:number){
        return this.ingredients[index];
    }

addIngredient(ingredient: Ingredient) {
   //throw new Error('Method not implemented.');
   this.ingredients.push(ingredient);
   this.ingredientsChanged.next(this.ingredients.slice());
}


addIngredients(ingredients:Ingredient[]){
    // for(let ingredient of ingredients){
    //     this.addIngredient(ingredient);
    // }

    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
}



    updateIngredient(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}