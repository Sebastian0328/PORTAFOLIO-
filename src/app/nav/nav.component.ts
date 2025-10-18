import { Component, HostListener, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isOpen = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  toggleNav(): void {
    this.isOpen = !this.isOpen;
    this.lockScroll(this.isOpen);
  }

  closeNav(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.lockScroll(false);
  }

  /** Bloquea/rehabilita scroll y aplica clase para overlay CSS */
  private lockScroll(lock: boolean): void {
    const body = this.doc.body;
    if (lock) {
      this.renderer.addClass(body, 'nav-lock');      // para el overlay (CSS)
      this.renderer.setStyle(body, 'overflow', 'hidden'); // evita scroll de fondo
    } else {
      this.renderer.removeClass(body, 'nav-lock');
      this.renderer.removeStyle(body, 'overflow');
    }
  }

  /** Cierra al redimensionar a escritorio (≈lg = 992px) */
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 992) {
      this.closeNav();
    }
  }

  /** Cierra con tecla ESC */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeNav();
  }

  /** Para usar (click) en el backdrop del template si lo tienes */
  onBackdropClick(): void {
    this.closeNav();
  }

  /** Limpieza si el componente se destruye */
  ngOnDestroy(): void {
    this.lockScroll(false);
  }
}
