import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
email = 'alvarezpaezsebastian03@gmail.com';
copyMsg = '';

get mailtoHref(): string {
  const subject = encodeURIComponent('Contacto desde tu portafolio');
  const body = encodeURIComponent('Hola Sebastian,\n\nTe escribo desde tu sitio seels.online.\n\n—');
  return `mailto:${this.email}?subject=${subject}&body=${body}`;
}

async copyEmail(): Promise<void> {
  try {
    await navigator.clipboard.writeText(this.email);
    this.copyMsg = 'Correo copiado';
  } catch {
    const ta = document.createElement('textarea');
    ta.value = this.email;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    this.copyMsg = 'Correo copiado';
  }
  setTimeout(() => (this.copyMsg = ''), 1500);
}

}
