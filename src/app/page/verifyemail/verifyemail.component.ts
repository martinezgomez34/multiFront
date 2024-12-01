import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verifyemail',
  standalone: true,
  imports: [
CommonModule
  ],
  template: `
        <div
      [ngClass]="{'dark': isDarkMode}"
      class="flex-1 flex items-center justify-center bg-white overflow-hidden dark:bg-black/95 min-h-screen"
    >
      <div class="text-center">
      <div class="flex-shrink-0 sm:mt-0 ">
        @if (isDarkMode) {
          <img src="Logo02.png" class="h-14 sm:h-20 w-auto" alt="Logo de Donaciones" />
        }@else {
          <img src="Logo01.png" class="h-14 sm:h-20 w-auto" alt="Logo de Donaciones" />
        }
      </div>
        <div *ngIf="loading" class="text-gray-800 dark:text-gray-200 text-xl font-medium">
          Verificando tu correo...
        </div>
        <div *ngIf="verificationStatus === 'success'" class="text-green-600 dark:text-green-400 text-xl font-semibold">
          ¡Correo verificado con éxito!
        </div>
        <div *ngIf="verificationStatus === 'error'" class="text-red-600 dark:text-red-400 text-xl font-semibold">
          Hubo un problema al verificar tu correo.
        </div>
      </div>
    </div>`,
  styles: [],
})
export class VerifyemailComponent implements OnInit {
  @Input() isDarkMode!: boolean;
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
