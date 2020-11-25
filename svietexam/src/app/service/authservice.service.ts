import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Observable, of as observableOf, throwError } from 'rxjs';
//import { AuthInterceptor } from'../interceptor/auth.interceptor';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private contentusername = new BehaviorSubject<string>("");
  public shareusername = this.contentusername.asObservable();
  private contentsubjectCode = new BehaviorSubject<string>("");
  public sharesubjectCode = this.contentsubjectCode.asObservable();
  private contenttime = new BehaviorSubject<number>(0);
  public sharetime = this.contenttime.asObservable();
  private contenttoken = new BehaviorSubject<string>("");
  public sharetoken = this.contenttoken.asObservable();
  private contentid = new BehaviorSubject<number>(0);
  public shareid = this.contentid.asObservable();
  private contentmessage = new BehaviorSubject<string>("");
  public sharemessage = this.contentmessage.asObservable();

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  errorData: {};

  url =" http://127.0.0.1:8000/";

  updateusername(username:string){
    this.contentusername.next(username);
  }

  updatesubjectCode(subjectCode:string){
    this.contentsubjectCode.next(subjectCode);
  }

  updatetoken(token:string){
    this.contenttoken.next(token);
  }

  updatetime(time:number){
    this.contenttime.next(time);
  }

  updateid(id:number){
    this.contentid.next(id);
  }

  updatemessage(message:string){
    this.contentmessage.next(message);
  }

  isLoading = new BehaviorSubject(false);

  startLoading() {
    this.isLoading.next(true);
  }

  stopLoading() {
    this.isLoading.next(false);
  }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  loggedin(){
    return !!sessionStorage.getItem('token');
  }

  login(username:string, password:string):Observable<any>{
    return this.http.post<any>(this.url+"online_exam/api/login/",
    {
      "username":username,
      "password":password
    },
    this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  logout():Observable<any>{
    return this.http.post<any>(this.url+"online_exam/api/logoutall/",
    this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }
  

  getexamlist(branchCode:string):Observable<any>{
    return this.http.get<any>(this.url+"online_exam/api/exam/"+branchCode,
    this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }
  
  startexam(username:string,id:number):Observable<any>{
    return this.http.get<any>(this.url+"online_exam/api/question/"+username+"/"+id,
    this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  questionsubmit(username:string,examid:number,questionid:number,answer:number):Observable<any>{
    return this.http.post<any>(this.url+"online_exam/api/submitanswer/",
    {
      "username":username,
      "examid":examid,
      "questionid":questionid,
      "answer":answer
    },
    this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  submitexam(username:string,examid:number):Observable<any>{
    return this.http.post<any>(this.url+"online_exam/api/submitexam/",
    {
      "username":username,
      "examid":examid,
    },
    this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      console.error('An error occurred:', error.error.message);
    } else {

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

}
