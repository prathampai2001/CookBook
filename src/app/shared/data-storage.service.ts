import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient,
                private recipeService:RecipeService,
                private authService:AuthService ){}

   storeRecipes(){
    const recipes=this.recipeService.getRecipes();
     this.http
     .put('https://shopping-foodrecipe-project-default-rtdb.firebaseio.com/recipes.json',
     recipes)
     .subscribe(response=>{
        console.log(response)
    });

    }

    fetchRecipes(){
        
            return this.http.get<Recipe[]>
            ('https://shopping-foodrecipe-project-default-rtdb.firebaseio.com/recipes.json?',
            // {
            //     params:new HttpParams().set('auth',user.token)
            // }
            ).pipe(
         
        map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe,
                    ingredients:recipe.ingredients ? recipe.ingredients:[]
                };
            });
        }),
        tap(recipes=>{
            this.recipeService.setRecipes(recipes);
        })
        );
       // .subscribe(recipes=>{
           // console.log(recipes);
        //    this.recipeService.setRecipes(recipes);
        //}););
       

    }
}