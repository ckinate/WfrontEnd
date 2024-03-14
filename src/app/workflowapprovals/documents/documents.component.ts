import { Component, Injector, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { DomSanitizer } from "@angular/platform-browser";
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { inject } from '@angular/core/testing';

@Pipe({ name: 'finsafe' })
export class FINSafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@Component({
  selector: 'appdocuments',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent extends AppComponentBase implements OnInit {
  @ViewChild('docView', { static: true }) modal: ModalDirective;
link = '';
  constructor( injector: Injector) { super(injector); }
  Opid:any;
  iD:any;

  ngOnInit(): void {
  }

  ShowAttachmentByRef(id: any, OPID: number) {

   this.Opid = OPID;
   this.iD=id;
    this.link =  AppConsts.documentUrl +  "/document/view?id=" +  this.iD + "&OPID="+ this.Opid +"&TypeV=false";

    this.modal.show();
  }

  ShowAttachmentforQuery(id: any, OPID: number) {



    this.link =  AppConsts.documentUrl +  "/document/view?id=" +  id + "&OPID="+ OPID +"&TypeV=true";

    this.modal.show();
  }


  CloseModal() {
 this.Opid=0;
 this.iD=null;
this.modal.hide();
  }

  onShown() {

  }

}
