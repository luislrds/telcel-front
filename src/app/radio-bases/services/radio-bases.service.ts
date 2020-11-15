import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class RadioBasesService {

  private page = 0;
  private dates : any[] = [];
  private dateTo : Date; 
  private dateFrom : Date; 
  private dateTmp : Date; 
  

  constructor(private http : HttpClient) { }

  get(pull, request){

    if(pull){
      this.page = 0;
    }
    this.page++;    
    request.PAGE =this.page;
    return this.http.post(`${URL}/radiobases/`, request);
  }

  getHeaders(request){

    var myArray = [];
    this.dates = [];
   
    for(var i=0;i<30;i++){
      myArray.push(i)
    }
      
    this.dateTo = new Date(request.FECHA);  
    this.dateFrom = new Date(request.FECHA);  
    this.dateFrom.setDate(this.dateTo.getDate() - 28);
    myArray.map(t=>{     
      this.dateTmp = new Date(request.FECHA);
      this.dateTmp.setDate(this.dateTo.getDate() - (28-t));
      this.dates.push(this.dateTmp)
    })
    
    return this.dates;
  }
}
