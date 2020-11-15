import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators, ValidatorFn} from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit {

  usuariosForm : FormGroup;
  loading = false;  
  formGroup : FormGroup;
  form: FormArray;
  title = "CREAR";
  overview = false;

  constructor(
    private fb : FormBuilder,
    private _usuariosService: UsuariosService,
    private _route : ActivatedRoute,
    private _router : Router,
    ) {
  
      this.usuariosForm = this.fb.group({
        ID : [null],
        NOMBRE : [null, Validators.required],
        APELLIDOPATERNO : [null, Validators.required],
        APELLIDOMATERNO : [null, Validators.required],
        FECHANACIMIENTO : [null, Validators.required],
        EMAIL : [null,  Validators.compose([
          Validators.required, Validators.email])
        ],
        PUESTO : [null, Validators.required],
        DIRECCION : [null, Validators.required],
        NUMEXT : [null, Validators.required],
        NUMINT : [null],
        CP : [null, Validators.compose([
          Validators.required, Validators.min(5)])
        ],
        COLONIA : [null, Validators.required],
        MUNICIPIO : [null, Validators.required],
        ESTADO : [null, Validators.required],
        PAIS : ['MÉXICO', Validators.required],
        HABILIDADES : this.fb.array([], this.minOneHability())
      });  

      

      this.getUsuario()
    }

  ngOnInit(): void {
  }

  minOneHability() : ValidatorFn {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const habilidad = formArray.controls  
      .map(control => control.value) 
      return (habilidad.length > 0) ? (habilidad.find(h=>h.NOMBRE == '')) ? { required: true } : null : { required: true };
    };
    return validator;
  }

  get HABILIDADES(): FormArray {
    return this.usuariosForm.get('HABILIDADES') as FormArray;
  } 

  setHabilidadesValues(habilidades) {
    this.HABILIDADES.setValue(habilidades);
  }   

  new(){
    let fg = this.fb.group(new Habilidad());
		this.HABILIDADES.push(fg);
  }
  addHabilidad(habilidad) {
		let fg = this.fb.group(habilidad);
		this.HABILIDADES.push(fg);
	}

  deleteHabilidad(idx: number) {
		this.HABILIDADES.removeAt(idx);
	}

  getUsuario(){
    if(this._route.snapshot.paramMap.get('id')){
      this.overview = true;
      this.title = "DETALLES"
      this._route.params.forEach((params : Params) =>{     
        this._usuariosService.get(params['id']).subscribe(
          response=>{
            this.usuariosForm.patchValue({
              ID : response.ID,
              NOMBRE : response.NOMBRE,
              APELLIDOPATERNO : response.APELLIDOPATERNO,
              APELLIDOMATERNO : response.APELLIDOMATERNO,
              FECHANACIMIENTO : response.FECHANACIMIENTO,
              EMAIL : response.EMAIL,
              PUESTO : response.PUESTO,
              DIRECCION : response.DIRECCION,
              NUMEXT : response.NUMEXT,
              NUMINT : response.NUMINT,
              CP : response.CP,
              COLONIA : response.COLONIA,
              MUNICIPIO : response.MUNICIPIO,
              ESTADO : response.ESTADO,
              PAIS : response.PAIS,              
            })   
            
            response.HABILIDADES.map(h=>{
              this.addHabilidad(h)
            })
           

        },      
        error=>{
          console.log(<any>error);
        })  
        this.usuariosForm.controls['NOMBRE'].disable();
        this.usuariosForm.controls['APELLIDOPATERNO'].disable();
        this.usuariosForm.controls['APELLIDOMATERNO'].disable();
        this.usuariosForm.controls['FECHANACIMIENTO'].disable();
        this.usuariosForm.controls['EMAIL'].disable();
        this.usuariosForm.controls['PUESTO'].disable();
        this.usuariosForm.controls['DIRECCION'].disable();
        this.usuariosForm.controls['NUMEXT'].disable();
        this.usuariosForm.controls['NUMINT'].disable();
        this.usuariosForm.controls['CP'].disable();
        this.usuariosForm.controls['COLONIA'].disable();
        this.usuariosForm.controls['MUNICIPIO'].disable();
        this.usuariosForm.controls['ESTADO'].disable();
        this.usuariosForm.controls['PAIS'].disable();
      }) 
    }    

  }

  onSubmit(){
    this.loading= true;
    this._usuariosService.post(this.usuariosForm.value).subscribe(r=>{
      this.loading= false;
      if(this.title == "CREAR"){
        this.usuariosForm.reset(); 
        this._router.navigate(['/usuarios'])
      }
         
    }, err=>{      
      console.log(err)
      this.loading= false;
    })   
  }
}

export class Habilidad {
	ID = 0;
	USUARIOID = 0; 
	NOMBRE = '';
} 