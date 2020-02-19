import { Component, Input } from '@angular/core'
import { UiBrand, UiLink, UiUser } from '@kikstart/ui'

@Component({
  selector: 'app-header',
  template: `
    <header>
      <nav class="navbar navbar-expand-md navbar-{{ style }} bg-{{ style }}" [class.dense]="dense">
        <div [class.container-xl]="!fluid" [class.container-fluid]="fluid">
          <a class="navbar-brand" routerLink="/">
            <ui-brand [brand]="brand"></ui-brand>
          </a>
          <button class="navbar-toggler" type="button" (click)="toggleNavBar()">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" [ngClass]="{ show: navBarOpen }">
            <ul class="navbar-nav mr-0">
              <app-header-link *ngFor="let link of links" [link]="link"></app-header-link>
            </ul>
            <div class="mr-auto"></div>
            <ul class="navbar-nav mr-0">
              <app-header-link *ngFor="let link of rightLinks" [link]="link"></app-header-link>
              <app-header-dropdown *ngIf="user && user?.developer" [links]="devLinks">
                <ui-label class="mr-1" label="Development" icon="fa-bug"></ui-label>
              </app-header-dropdown>
              <app-header-dropdown *ngIf="user && user?.role === 'Admin' && adminLinks.length" [links]="adminLinks">
                <ui-label class="mr-1" label="Admin" icon="fa-shield"></ui-label>
              </app-header-dropdown>
              <app-header-dropdown [links]="userLinks">
                <span *ngIf="showUsername && user?.username">{{ user?.username }}</span>
                <ui-avatar *ngIf="user?.avatar" class="mx-1" size="sm" [avatar]="user?.avatar"></ui-avatar>
              </app-header-dropdown>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [
    `
      .dense {
        padding-top: 0;
        padding-bottom: 2px !important;
      }
    `,
  ],
})
export class AppHeaderComponent {
  @Input() public brand: UiBrand
  @Input() public dense = false
  @Input() public fluid = false
  @Input() public style: 'light' | 'dark' = 'dark'
  @Input() public user: UiUser
  @Input() public showUsername = false
  @Input() public links: UiLink[] = []
  @Input() public rightLinks: UiLink[] = []
  @Input() public userLinks: UiLink[] = []
  @Input() public adminLinks: UiLink[] = []
  @Input() public devLinks: UiLink[] = []

  public navBarOpen = false

  toggleNavBar() {
    this.navBarOpen = !this.navBarOpen
  }
}
