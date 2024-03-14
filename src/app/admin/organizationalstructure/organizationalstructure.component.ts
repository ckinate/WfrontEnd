import { IBasicOrganizationalStructureInfo } from './IBasicOrganizationalStructureInfo';
import { OrganizationalTreeComponent } from './organizational-tree.component';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';


@Component({

  templateUrl: './organizationalstructure.component.html',
  animations: [appModuleAnimation()]
})
export class OrganizationalstructureComponent extends AppComponentBase {

@ViewChild('oTree', {static: true}) oTree: OrganizationalTreeComponent;
orgS: IBasicOrganizationalStructureInfo = null;

nodes: any = [
  {
    name: 'Sundar Pichai',
    cssClass: 'ngx-org-ceo',
    image: '',
    title: 'Chief Executive Officer',
    childs: [
      {
        name: 'Thomas Kurian',
        cssClass: 'ngx-org-ceo',
        image: 'assets/node.svg',
        title: 'CEO, Google Cloud',
      },
      {
        name: 'Susan Wojcicki',
        cssClass: 'ngx-org-ceo',
        image: 'assets/node.svg',
        title: 'CEO, YouTube',
        childs: [
          {
            name: 'Beau Avril',
            cssClass: 'ngx-org-head',
            image: 'assets/node.svg',
            title: 'Global Head of Business Operations',
            childs: []
          },
          {
            name: 'Tara Walpert Levy',
            cssClass: 'ngx-org-vp',
            image: 'assets/node.svg',
            title: 'VP, Agency and Brand Solutions',
            childs: []
          },
          {
            name: 'Ariel Bardin',
            cssClass: 'ngx-org-vp',
            image: 'assets/node.svg',
            title: 'VP, Product Management',
            childs: []
          }
        ]
      },
      {
        name: 'Jeff Dean',
        cssClass: 'ngx-org-head',
        image: 'assets/node.svg',
        title: 'Head of Artificial Intelligence',
        childs: [
          {
            name: 'David Feinberg',
            cssClass: 'ngx-org-ceo',
            image: 'assets/node.svg',
            title: 'CEO, Google Health',
            childs: []
          }
        ]
      }
    ]
  },
  {
    name: 'Sundar Pichai',
    cssClass: 'ngx-org-ceo',
    image: 'assets/node.svg',
    title: 'Chief Executive Officer',
    childs: [
      {
        name: 'Thomas Kurian',
        cssClass: 'ngx-org-ceo',
        image: 'assets/node.svg',
        title: 'CEO, Google Cloud',
      },
      {
        name: 'Susan Wojcicki',
        cssClass: 'ngx-org-ceo',
        image: 'assets/node.svg',
        title: 'CEO, YouTube',
        childs: [
          {
            name: 'Beau Avril',
            cssClass: 'ngx-org-head',
            image: 'assets/node.svg',
            title: 'Global Head of Business Operations',
            childs: []
          },
          {
            name: 'Tara Walpert Levy',
            cssClass: 'ngx-org-vp',
            image: 'assets/node.svg',
            title: 'VP, Agency and Brand Solutions',
            childs: []
          },
          {
            name: 'Ariel Bardin',
            cssClass: 'ngx-org-vp',
            image: 'assets/node.svg',
            title: 'VP, Product Management',
            childs: []
          }
        ]
      },
      {
        name: 'Jeff Dean',
        cssClass: 'ngx-org-head',
        image: 'assets/node.svg',
        title: 'Head of Artificial Intelligence',
        childs: [
          {
            name: 'David Feinberg',
            cssClass: 'ngx-org-ceo',
            image: 'assets/node.svg',
            title: 'CEO, Google Health',
            childs: []
          }
        ]
      }
    ]
  },
  {
    name: 'Sundar Pichai',
    cssClass: 'ngx-org-ceo',
    image: 'assets/node.svg',
    title: 'Chief Executive Officer',
    childs: [
      {
        name: 'Thomas Kurian',
        cssClass: 'ngx-org-ceo',
        image: 'assets/node.svg',
        title: 'CEO, Google Cloud',
      },
      {
        name: 'Susan Wojcicki',
        cssClass: 'ngx-org-ceo',
        image: 'assets/node.svg',
        title: 'CEO, YouTube',
        childs: [
          {
            name: 'Beau Avril',
            cssClass: 'ngx-org-head',
            image: 'assets/node.svg',
            title: 'Global Head of Business Operations',
            childs: []
          },
          {
            name: 'Tara Walpert Levy',
            cssClass: 'ngx-org-vp',
            image: 'assets/node.svg',
            title: 'VP, Agency and Brand Solutions',
            childs: []
          },
          {
            name: 'Ariel Bardin',
            cssClass: 'ngx-org-vp',
            image: 'assets/node.svg',
            title: 'VP, Product Management',
            childs: []
          }
        ]
      },
      {
        name: 'Jeff Dean',
        cssClass: 'ngx-org-head',
        image: 'assets/node.svg',
        title: 'Head of Artificial Intelligence',
        childs: [
          {
            name: 'David Feinberg',
            cssClass: 'ngx-org-ceo',
            image: 'assets/node.svg',
            title: 'CEO, Google Health',
            childs: []
          }
        ]
      }
    ]
  }
];
  constructor( injector: Injector
  ) {
      super(injector);
  }

  ouSelected(event: any): void {
    this.orgS = event;
}

}
