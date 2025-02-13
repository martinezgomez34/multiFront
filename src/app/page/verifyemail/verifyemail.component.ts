import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verifyemail',
  template: `
    @if(loading){
      <div>Verificando tu correo...</div>
    }
    @if(verificationStatus === 'success'){
      ¡Correo verificado con éxito!
    }
    @if(verificationStatus === 'error'){
      Hubo un problema al verificar tu correo.
    }`,
  styles: []
})
export class VerifyemailComponent implements OnInit {
  loading = true;
  verificationStatus: 'success' | 'error' | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.verifyEmail(token);
    } else {
      this.loading = false;
      this.verificationStatus = 'error';
    }
  }

  verifyEmail(token: string): void {
    this.http.post('http://localhost:8000/verificar-correo', { token }).subscribe({
      next: () => {
        this.loading = false;
        this.verificationStatus = 'success';
        setTimeout(() => {
          this.router.navigate(['/Login']);
        }, 2000); 
      },
      error: () => {
        this.loading = false;
        this.verificationStatus = 'error';
      }
    });
  }
}
