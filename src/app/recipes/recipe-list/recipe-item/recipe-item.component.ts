import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe:Recipe;
 // @Output()  recipeSelected=new EventEmitter<void>();
  @Input() index:number;

// constructor(private RecipeService:RecipeService){}
  

ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

}
