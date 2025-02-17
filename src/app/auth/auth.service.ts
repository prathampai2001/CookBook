import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Route, Router } from "@angular/router";


export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{

    user= new BehaviorSubject<User>(null);
    private tokenExpirationTimer:any;
   
    constructor(private http:HttpClient,
                private router:Router ){}

    

    signup(email:string,password:string){

      return this.http
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvYcAIfkyqDCR-IXOiZfgoH9tdQ00EbXg',
        
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
    )
        .pipe(catchError(this.handleError),
            tap(resData=>{
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn);
            
        })
        );

    }


    login(email:string,password:string){
       return this.http
       .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvYcAIfkyqDCR-IXOiZfgoH9tdQ00EbXg',
    
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
        
        )
        .pipe(catchError(this.handleError),
        tap(resData=>{
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn);
        
    }));
    }


    autoLogin(){
        const userData:{
            email:string;
            id:string;
            _token:string;
            _tokenExpirationDate:string;
        }=JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedUser=new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration=new Date(
                userData._tokenExpirationDate).getTime()-new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }


    autoLogout(expirationDuration:number){
       // console.log(expirationDuration);
      this.tokenExpirationTimer=  setTimeout(()=>{
            this.logout();
        },expirationDuration);
    }

    private handleAuthentication(
        email:string,
        userId:string,
        token:string,
        expiresIn:number
        ){
        const expirationDate=new Date(
            new Date().getTime() + expiresIn*1000);
        
        const user=new User(email,userId,token,expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        
        localStorage.setItem('userData',JSON.stringify(user));
    }


    private handleError(errorRes:HttpErrorResponse){
        let errorMessage="An Unknown Error Occurred";
            
        // if(!errorRes.error){
            if(!errorRes.error || !errorRes.error.error){
                console.error(errorRes);

                return throwError(errorMessage);
            }
            // console.error(errorRes.error.error.message);

           
            const errorCode=errorRes.error.error.message;

         switch(errorCode){
                
                case 'EMAIL_NOT_FOUND':
                    errorMessage='This Email Does Not Exists';
                    break;

                case 'INVALID_PASSWORD':
                    errorMessage='This Password is Not Correct';
                    break;

                case 'EMAIL_EXISTS':
                    errorMessage='This Email Already Exists';
                    break;

                case 'INVALID_LOGIN_CREDENTIALS':
                    errorMessage = 'Invalid email or password.';
                    break;

                default:
                    errorMessage=errorRes.error.error.message || errorMessage;
                    // errorMessage='An UnKnown Error Occurred';
                    break;
              
                }

                console.error('Firebase Error:', errorCode);
                console.error('Error Response:', errorRes);
                console.error('Error Message:', errorMessage);

            
               return throwError(errorMessage);
        }

    }

