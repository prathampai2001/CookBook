import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit,OnDestroy{

    @Output() recipeWasSelected=new EventEmitter<Recipe>();  

   //recipes:Recipe[]=[
  //   new Recipe("A Test Recipe","This is simply a test recipe ","https://bing.com/th?id=OSK.a824442525745fdb16b19ebf2bc33ff1"),
  //   new Recipe("Veg Burger","A veg burger is a plant-based sandwich consisting of a vegetarian patty, usually made from ingredients like vegetables, beans, or grains. It's served in a bun and can be topped with various condiments and vegetables for added flavor and texture. ","https://assets.bonappetit.com/photos/57acae2d1b33404414975121/master/pass/ultimate-veggie-burger.jpg"),
  //   new Recipe("Chicken Burger","TA chicken burger is a sandwich made with a seasoned and cooked chicken patty, usually served in a bun with various toppings such as lettuce, tomatoes, and condiments like mayonnaise or ketchup. ","https://th.bing.com/th/id/R.d6281ae6e4e776dcfc62ba39c7e3d367?rik=Pb5PQlDPK1anDw&riu=http%3a%2f%2f3.bp.blogspot.com%2f-hcIXU5dX6n0%2fVnK4mIBsbOI%2fAAAAAAAAANE%2f0WLpskQjCOA%2fs1600%2f5ac178b0-86da-4e6f-b71f-ff6dbce633ae.jpg&ehk=KH7QHz%2bNOiO4yzJ2%2bn1Q1HDpC97ScT%2ftD4BkomQJLSw%3d&risl=&pid=ImgRaw&r=0"),
  //   new Recipe("Veg Pizza","Veg pizza is a delicious dish made with a dough crust, tomato sauce, cheese, and various vegetables like bell peppers, mushrooms, onions, and olives. It's a flavorful and wholesome option for those who prefer a vegetarian choice in pizzas. ","https://napolipizzalv.com/wp-content/uploads/2019/10/DSC_0924-min.png"),
  //   new Recipe("Chicken Pizza","Chicken pizza is a delicious dish that combines tender pieces of chicken with flavorful pizza toppings. The chicken adds a protein-rich element, making it a satisfying and popular choice for pizza lovers. Whether baked in an oven or prepared on a grill, chicken pizza is a tasty and versatile option that can be customized with your favorite ingredients.","https://i.pinimg.com/originals/6b/84/a7/6b84a7cad4e7d25ca53af9aec8b9c8da.jpg"),
  //   new Recipe("Pasta","Pasta is a type of Italian food made from wheat and water. It comes in various shapes and sizes, such as spaghetti, penne, or fusilli. Pasta is typically boiled and served with various sauces, like marinara or Alfredo. It's a versatile and popular dish enjoyed worldwide. ","https://keeprecipes.com/sites/keeprecipes/files/7287_1403622419_0.jpg"),
  
  // ];
  recipes:Recipe[];
  subcription:Subscription;
  constructor(private recepeService:RecipeService,
            private router:Router,
            private route:ActivatedRoute){
}
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.subcription.unsubscribe();

  }
  ngOnInit(): void {

   this.subcription= this.recepeService.recipesChanged
          .subscribe(
          (recipes:Recipe[])=>{
              this.recipes=recipes;
          }

          );

   // throw new Error('Method not implemented.');
  this.recipes=this.recepeService.getRecipes();
  
  }


//   onRecipeSelected(recipe:Recipe){
// this.recipeWasSelected.emit(recipe);


//   }

onNewRecipe(){
  this.router.navigate(['new'],{relativeTo:this.route});

}
 
 

}
