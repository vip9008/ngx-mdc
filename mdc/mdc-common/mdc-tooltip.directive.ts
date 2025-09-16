import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
@Directive({
    standalone: false,
    selector: '[mdc-tooltip]'
})
export class MdcTooltipDirective implements OnInit {
    @Input('mdc-tooltip') tooltipText: string = '';

    private tooltipElement: HTMLDivElement;
    private hideTimeout: NodeJS.Timeout;
    private timeout: number = 1.5;

    private pointerTimer: any;
    private isTouchPointer: boolean = false;
    private longPressDelay: number = 600; // ms to press before showing
    private moveTolerance: number = 8; // px finger can move before cancel
    private startX: number = 0;
    private startY: number = 0;

    private get baseSize(): number {
        let baseSize = getComputedStyle(this.el.nativeElement).getPropertyValue('font-size');
        return Number(baseSize.match(/\d+/)[0]);
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private el: ElementRef,
        private renderer: Renderer2,
        private translation: TranslateService,
    ) {
        this.translation.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
            if (this.tooltipElement) {
                this.tooltipElement.innerText = this.tooltipString;
            }
        });
    }

    private get tooltipString(): string {
        return this.translation.instant(this.tooltipText);
    }

    ngOnInit(): void {
        if (this.tooltipText?.length) {
            this.tooltipElement = this.renderer.createElement('div');
            this.renderer.addClass(this.tooltipElement, 'mdc-tooltip');
            this.tooltipElement.innerText = this.tooltipString;
            this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);

            // to prevent unwanted positioning
            this.renderer.setStyle(this.el.nativeElement, 'will-change', 'unset');

            // this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.showTooltip());
            // this.renderer.listen(this.el.nativeElement, 'focus', () => this.showTooltip());
            // this.renderer.listen(this.el.nativeElement, 'touchstart', () => this.showTooltip());
            // this.renderer.listen(this.el.nativeElement, 'mouseleave', () => this.hideTooltip());
            // this.renderer.listen(this.el.nativeElement, 'blur', () => this.hideTooltip());
            // this.renderer.listen(this.el.nativeElement, 'touchend', () => this.hideTooltip());

            // Touch accessibility: touch hold shows tooltip
            this.renderer.listen(this.el.nativeElement, 'pointerdown', (event: PointerEvent) => this.onPointerDown(event));
            this.renderer.listen(this.el.nativeElement, 'pointermove', (event: PointerEvent) => this.onPointerMove(event));
            this.renderer.listen(this.el.nativeElement, 'pointerup', () => this.onPointerEnd());
            this.renderer.listen(this.el.nativeElement, 'pointercancel', () => this.onPointerEnd());

            // Non-touch accessibility: hover/focus still shows tooltip
            this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.showTooltip());
            this.renderer.listen(this.el.nativeElement, 'focus', (event: PointerEvent) => {
                this.isTouchPointer = event.pointerType?.toLowerCase() === 'touch' || event.pointerType?.toLowerCase() === 'pen';

                if (!this.isTouchPointer) {
                    return this.showTooltip();
                }
            });
            this.renderer.listen(this.el.nativeElement, 'mouseleave', () => this.hideTooltip());
            this.renderer.listen(this.el.nativeElement, 'blur', () => this.hideTooltip());

            // Optional: prevent system context menu on long press (iOS)
            this.renderer.listen(this.el.nativeElement, 'contextmenu', (e: Event) => {
                if (this.isTouchPointer) {
                    e.preventDefault();
                }
            });
        }
    }

    private onPointerDown(event: PointerEvent) {
        this.isTouchPointer = event.pointerType?.toLowerCase() === 'touch' || event.pointerType?.toLowerCase() === 'pen';

        if (this.isTouchPointer) {
            // Start a long-press timer; do NOT show on tap
            this.startX = event.clientX;
            this.startY = event.clientY;

            this.clearPointerTimer();
            this.pointerTimer = setTimeout(() => {
                this.showTooltip();
                this.pointerTimer = null;
            }, this.longPressDelay);
        } else {
            // For mouse, let mouseenter/focus handle showing
            this.clearPointerTimer();
        }
    }

    private onPointerMove(event: PointerEvent) {
        if (!this.isTouchPointer || !this.pointerTimer) {
            return;
        }

        let dx = Math.abs(event.clientX - this.startX);
        let dy = Math.abs(event.clientY - this.startY);
        if (dx > this.moveTolerance || dy > this.moveTolerance) {
            // User is scrolling or moved finger—cancel long-press
            this.clearPointerTimer();
        }
    }

    private onPointerEnd() {
        // Finger lifted or canceled—don’t show on taps
        this.clearPointerTimer();
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
    
            this.clearTimer();

            this.hideTimeout = setTimeout(() => {
                this.renderer.removeClass(this.tooltipElement, 'active');
            }, this.timeout * 1000);
        }
    }

    private hideTooltip(): void {
        this.clearTimer();
        this.renderer.removeClass(this.tooltipElement, 'active');
    }

    private clearTimer() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }

    private clearPointerTimer() {
        if (this.pointerTimer) {
            clearTimeout(this.pointerTimer);
            this.pointerTimer = null;
        }
    }
}
