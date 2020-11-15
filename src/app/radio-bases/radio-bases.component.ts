import { Component, OnInit } from '@angular/core';
import { RadioBasesService } from './services/radio-bases.service';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-radio-bases',
  templateUrl: './radio-bases.component.html',
  styleUrls: ['./radio-bases.component.scss']
})
export class RadioBasesComponent implements OnInit {

  radiobasesForm : FormGroup;
  radiobasesSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);  
  radiobases$ = this.radiobasesSubject.asObservable();
  loading = false;
  isEnd = false;
  datesSubject : BehaviorSubject<any[]> = new BehaviorSubject([]);
  dates$ = this.datesSubject.asObservable();
  
  constructor(
    private _radiobasesService : RadioBasesService, 
    private fb : FormBuilder){
    this.radiobasesForm = this.fb.group({
      REGION : ["0"],
      RADIOBASE : [null],
      FECHA: ['2019-09-09'],
      PAGE : [0]
    });         

    this.datesSubject.next(this._radiobasesService.getHeaders(this.radiobasesForm.value));
    
    this.onScroll(false);
  }

  ngOnInit(): void {
  }

  getColor(trafico){
    let color = "gris"
    if(trafico >= 0 && trafico <= 15){
      color = 'rojo'
    }else if(trafico > 15 && trafico <= 40){
      color = 'naranja'
    }else if(trafico > 40 && trafico <= 90){
      color = 'amarillo'
    }else if(trafico > 90){
      color = 'verde'
    }
      
    return color

  }
  onScroll(pull:boolean = false){
    if(!this.loading && !this.isEnd){
      this.loading = true;
      this._radiobasesService.get(pull, this.radiobasesForm.value).subscribe(d=>{ 
        if(d){
          this.radiobasesSubject.next(this.radiobasesSubject.getValue().concat(d))
          this.loading = false;
        }else{
          this.isEnd = true;
        }
        
      });
    }    
  }

  onSubmit(){
    this.radiobasesSubject.next([])
    this.datesSubject.next([])
    let pull = true;
    this.isEnd = false;
    this.loading = true;
    
    this.datesSubject.next(this._radiobasesService.getHeaders(this.radiobasesForm.value));

    this._radiobasesService.get(pull, this.radiobasesForm.value).subscribe(d=>{  
      this.radiobasesSubject.next(this.radiobasesSubject.getValue().concat(d))
      this.loading = false;        
    });
  }
}

export interface Fechas {
  FECHA : string,
  REGION : string,
  TRAFICO : string,
}
