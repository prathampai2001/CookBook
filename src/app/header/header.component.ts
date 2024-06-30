import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";


@Component({
    selector:"app-header",
    templateUrl:"./header.component.html",
   
})
export class HeaderComponent implements OnInit,OnDestroy{

    private userSub:Subscription;
    isAuthenticated=false;

    constructor(private dataStorageService:DataStorageService,
                private authService:AuthService){}
    
    
        ngOnDestroy(): void {
       // throw new Error("Method not implemented.");
        this.userSub.unsubscribe();
    
    
    }
    
        ngOnInit(): void {
        //throw new Error("Method not implemented.");
        this.userSub=this.authService.user.subscribe(user=>{
        // this.isAuthenticated=!user?false:true;
        this.isAuthenticated=!!user;
        console.log(!user);
        console.log(!!user)
        });
    }


    // @Output() featureSelected=new EventEmitter<string>();
    
    // onSelect(feature:string){
    //     this.featureSelected.emit(feature);


    // }


    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }


}