import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManiocService {
  
  public host: string = "http://localhost:3002";

  constructor(private http: HttpClient) { }

  uploadManiocImage(currentFileUpload: File): Observable <HttpEvent<{}>> {
    let formatData: FormData = new FormData();
    formatData.append('file',currentFileUpload);
    const req = new HttpRequest('POST',this.host+'/uploadManiocImage/', formatData,{
      reportProgress :true,
      responseType :'text'
    });
    return this.http.request(req)
  }
  public getManiocPrediction(): Observable<any>{
    return this.http.get(this.host+"/prediction");
 } 
 public getLabels(): Observable<any>{
  return this.http.get(this.host+"/labels");
}
}
