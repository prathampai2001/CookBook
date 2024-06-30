import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  // standalone:true,
  // imports:HttpClient,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 
})
export class AppComponent  implements OnInit{

  constructor(private authService:AuthService){}

  ngOnInit(): void {
   // throw new Error('Method not implemented.');
   this.authService.autoLogin();
  
  
  }

  // loadedFeature="recipe";

  // onNavigate(feature:string){
  //   this.loadedFeature=feature;

  // }

}
