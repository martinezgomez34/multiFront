import { Component, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-paypal-button',
  standalone: true,
  template: `
    <div id="paypal-button-container"></div>
  `,
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements AfterViewInit {
  @Input() amount!: number; // Monto de pago
  @Output() paymentCompleted = new EventEmitter<void>(); // Evento para notificar que el pago fue completado

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (!this.amount) {
      console.error('Error: No se ha proporcionado un monto para el pago.');
      return;
    }

    this.loadPaypalScript().then(() => {
      // @ts-ignore: PayPal SDK global variable
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount.toString(),
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert(`¡Pago completado por ${details.payer.name.given_name}!`);
            console.log('Detalles del pago:', details);

            // Emitir evento al completar el pago
            this.paymentCompleted.emit();
          });
        },
        onError: (err: any) => {
          console.error('Error durante el pago:', err);
        },
      }).render('#paypal-button-container');
    }).catch((error) => {
      console.error(error);
    });
  }

  private loadPaypalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Verificar si ya se ha cargado el script
      if (document.getElementById('paypal-script')) {
        resolve();
        return;
      }

      // Crear el script y agregarlo al DOM
      const script = document.createElement('script');
      script.id = 'paypal-script';
      script.src = 'https://www.paypal.com/sdk/js?client-id=AZSKswZtzXSztd39odeuJd6gEIkPL7DJBcOe0085e9B_3GKDu75pnwn9agUAThV3ee9LsltcFyctBpIV&currency=USD';
      script.onload = () => resolve();
      script.onerror = (error) => reject('Error al cargar el script de PayPal: ' + error);
      document.body.appendChild(script);
    });
  }
}
