import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{

    recipesChanged=new Subject<Recipe[]>();

    //recipeSelected=new EventEmitter<Recipe>();
    // recipeSelected=new Subject<Recipe>();

    private recipes:Recipe[]=[
        new Recipe("A Test Recipe","This is simply a test recipe ","https://bing.com/th?id=OSK.a824442525745fdb16b19ebf2bc33ff1",
        [
            new Ingredient('Buns',2),
            new Ingredient('French Fries',20)
        ]),

        new Recipe("Veg Burger","A veg burger is a plant-based sandwich consisting of a vegetarian patty, usually made from ingredients like vegetables, beans, or grains. It's served in a bun and can be topped with various condiments and vegetables for added flavor and texture. ","https://assets.bonappetit.com/photos/57acae2d1b33404414975121/master/pass/ultimate-veggie-burger.jpg",
        [
        new Ingredient('Burger Buns',10),
        new Ingredient('Leaf Lettuce',5),
        new Ingredient('Cheese(Slice)',5),
        new Ingredient('Onion',5),
        new Ingredient('Tomato',3),
        new Ingredient('Sauce(Mayonnaise-3 Spoon,Ketchup-1 Spoon)',2),
        new Ingredient('French Fries',20),


        ]),
        
        new Recipe("Chicken Burger","TA chicken burger is a sandwich made with a seasoned and cooked chicken patty, usually served in a bun with various toppings such as lettuce, tomatoes, and condiments like mayonnaise or ketchup. ","https://th.bing.com/th/id/R.d6281ae6e4e776dcfc62ba39c7e3d367?rik=Pb5PQlDPK1anDw&riu=http%3a%2f%2f3.bp.blogspot.com%2f-hcIXU5dX6n0%2fVnK4mIBsbOI%2fAAAAAAAAANE%2f0WLpskQjCOA%2fs1600%2f5ac178b0-86da-4e6f-b71f-ff6dbce633ae.jpg&ehk=KH7QHz%2bNOiO4yzJ2%2bn1Q1HDpC97ScT%2ftD4BkomQJLSw%3d&risl=&pid=ImgRaw&r=0",
        [
            new Ingredient('Burger Buns',10),
            new Ingredient('Meat(slice)',5),
            new Ingredient('Leaf Lettuce',5),
            new Ingredient('Cheese(Slice)',5),
            new Ingredient('Onion',5),
            new Ingredient('Sauce(Mayonnaise-3 Spoon,Ketchup-1 Spoon)',2),
            new Ingredient('French Fries(Pieces)',20)
        
        ]),
        
        
        
        new Recipe("Veg Pizza","Veg pizza is a delicious dish made with a dough crust, tomato sauce, cheese, and various vegetables like bell peppers, mushrooms, onions, and olives. It's a flavorful and wholesome option for those who prefer a vegetarian choice in pizzas. ","https://napolipizzalv.com/wp-content/uploads/2019/10/DSC_0924-min.png",
        [
            new Ingredient('Pizza Dough',1),
            new Ingredient('Pizza Sauce(Spoon)',2),
            new Ingredient('Mozzarella Cheese(Slices)',5),
            new Ingredient('Vegetables(Bell Pepper,Onions,Mushrooms,Black Olives,Tomatoes,Black Olives)',5),

        ]),

        new Recipe("Chicken Pizza","Chicken pizza is a delicious dish that combines tender pieces of chicken with flavorful pizza toppings. The chicken adds a protein-rich element, making it a satisfying and popular choice for pizza lovers. Whether baked in an oven or prepared on a grill, chicken pizza is a tasty and versatile option that can be customized with your favorite ingredients.","https://i.pinimg.com/originals/6b/84/a7/6b84a7cad4e7d25ca53af9aec8b9c8da.jpg",
        [
            new Ingredient('Pizza Dough',5),
            new Ingredient('Chicken Meat(Small Pieces)',20),
            new Ingredient('Pizza Sauce(Spoon)',2),
            new Ingredient('Mozzarella Cheese(Slices)',5),
            new Ingredient('Vegetables(Bell Pepper,Onions,Mushrooms,Black Olives)',5),
            

        ]),
        new Recipe("Pasta","Pasta is a type of Italian food made from wheat and water. It comes in various shapes and sizes, such as spaghetti, penne, or fusilli. Pasta is typically boiled and served with various sauces, like marinara or Alfredo. It's a versatile and popular dish enjoyed worldwide. ","https://keeprecipes.com/sites/keeprecipes/files/7287_1403622419_0.jpg",
        [
            new Ingredient('Pasta',1),
            new Ingredient('Bell Peppers',2),
            new Ingredient('Mushrooms',4),
            new Ingredient('Spinach',1),
            new Ingredient('Carrots',3),
            new Ingredient('Onion',3),
            new Ingredient('Tomato Sauce(Small Packet)',1),
            new Ingredient('Broccoli(Small Pieces)',4)
          
            
        ]),


        new Recipe("Veg Cutlet","Veg cutlets are savory snacks made from mashed vegetables, typically potatoes, peas, carrots, and beans, mixed with spices and herbs. The mixture is shaped into patties, coated with breadcrumbs, and then fried or baked until crispy on the outside and soft on the inside. They are often served with mint chutney or ketchup as a popular appetizer or tea-time snack in many Indian households. Veg cutlets are versatile and can be customized with various vegetables and seasonings to suit individual preferences. They're loved for their crunchy exterior and flavorful filling, making them a favorite among vegetarians and non-vegetarians alike. " ,"https://th.bing.com/th?id=OSK.b0c60089d944992a58be876ac0f1452e&w=214&h=214&rs=2&qlt=80&o=6&cdv=1&pid=16.1",
        [
            new Ingredient('Potatoes',5),
            new Ingredient('Mixed Vegetables(Carrot,Peas,Beans,Corn)',3),
            new Ingredient('Onions',2),
            new Ingredient('Garlic And Ginger',2),
            new Ingredient('Spices(Cumin Powder-2 Spoon,Coriander Powder-1 Spoon,Garam Masala-1 Spoon,Chilli Powder-2 Spoon,Salt-2 Spoon)',0)
        ]),
      
      ];


      constructor(private slService:ShoppingListService){}


      setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index:number){
            return this.recipes[index];

      }


      addIndegredientsToShoppingList(ingredients:Ingredient[]){
            this.slService.addIngredients(ingredients);
      }


      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());


      }

      updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe
        this.recipesChanged.next(this.recipes.slice());;

      }

      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }

}