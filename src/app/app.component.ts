import { HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManiocService } from './services/manioc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  public electFiles: any;
  public progress: any;
  public currentFileUpload: any;
  public uploadBnt= 0;
  
  public prediction: any;
  public labels: any;
  
  public maniocPredictions = new Map();

  constructor(public maniocService: ManiocService) { }

  ngOnInit(): void {  
  }

  public selectedFile(event:any){
    this.electFiles = event.target.files;
    this.uploadBnt =1;
  }
  public uploadManiocImage(){
    this.progress = 0;
    this.currentFileUpload = this.electFiles.item(0);
    this.maniocService.uploadManiocImage(this.currentFileUpload)
      .subscribe(response =>{
        if(response.type === HttpEventType.UploadProgress){
          if(response.total != undefined && response.total !=0){
            this.progress = Math.round(100* response.loaded / response.total);
            if(this.progress ==100){ 
              this.maniocService.getManiocPrediction()
                .subscribe(pred =>{
                  this.prediction = pred;
                  this.maniocService.getLabels()
                    .subscribe(label =>{
                      this.labels = label;
                      console.log(this.prediction);
                      console.log(this.labels);
                    }, err=>{
                      console.log("Ereur de lecture des labels !!!")
                    })
                }, err =>{
                  console.log("Erreur de prediction !!!");
                }) 
              this.uploadBnt =0;
            }
          }
        }else if (response instanceof HttpRequest){
          this.uploadBnt =0;
        }
      }, err=>{//access token is expired or not valid, refresh it immediatly by using refresh token
           console.log("Erreur de chargement de l'image !!!")         
      }
    );
  }
}
