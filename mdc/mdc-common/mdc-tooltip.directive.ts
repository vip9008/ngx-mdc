import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

@Directive({
  standalone: false,
    selector: '[mdc-tooltip]'
})
export class MdcTooltipDirective implements OnInit {
    @Input('mdc-tooltip') tooltipText: string = '';

    private tooltipElement: HTMLDivElement;
    private hideTimeout: NodeJS.Timeout;
    private timeout: number = 1.5;

    private get baseSize(): number {
        let baseSize = getComputedStyle(this.el.nativeElement).getPropertyValue('font-size');
        return Number(baseSize.match(/\d+/)[0]);
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private el: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngOnInit(): void {
        if (this.tooltipText?.length) {
            this.tooltipElement = this.renderer.createElement('div');
            this.renderer.addClass(this.tooltipElement, 'mdc-tooltip');
            this.tooltipElement.innerText = this.tooltipText;
            this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);

            this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.showTooltip());
            this.renderer.listen(this.el.nativeElement, 'focus', () => this.showTooltip());
            this.renderer.listen(this.el.nativeElement, 'touchstart', () => this.showTooltip());
            this.renderer.listen(this.el.nativeElement, 'mouseleave', () => this.hideTooltip());
            this.renderer.listen(this.el.nativeElement, 'blur', () => this.hideTooltip());
            this.renderer.listen(this.el.nativeElement, 'touchend', () => this.hideTooltip());
        }
    }

    private showTooltip(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.tooltipElement.removeAttribute('style');

            let baseSize = this.baseSize;

            let viewportWidth = document.documentElement.clientWidth || document.body.clientWidth;
            let viewportHeight = document.documentElement.clientHeight || document.body.clientHeight;
            
            let offset = this.el.nativeElement.getBoundingClientRect();
            let tooltipOffset = this.tooltipElement.getBoundingClientRect();
            
            let top = offset.y + offset.height + baseSize;
            let left = offset.x + (offset.width / 2) - (this.tooltipElement.offsetWidth / 2);
            
            if (top > (viewportHeight - this.tooltipElement.offsetHeight - baseSize)) {
                top = viewportHeight - this.tooltipElement.offsetHeight - baseSize;
            }

            if (left > (viewportWidth - this.tooltipElement.offsetWidth - baseSize)) {
                left = viewportWidth - this.tooltipElement.offsetWidth - baseSize;
            }

            if (left < 0) {
                left = baseSize;
            }

            let position = {
                top: top.toFixed(0) + 'px',
                left: left.toFixed(0) + 'px',
            };
    
            Object.assign(this.tooltipElement.style, position);
            this.renderer.addClass(this.tooltipElement, 'active');
    
            this.cleatTimer();

            this.hideTimeout = setTimeout(() => {
                this.renderer.removeClass(this.tooltipElement, 'active');
            }, this.timeout * 1000);
        }
    }

    private hideTooltip(): void {
        this.cleatTimer();
        this.renderer.removeClass(this.tooltipElement, 'active');
    }

    private cleatTimer() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }
}
