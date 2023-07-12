import { Injectable } from '@angular/core';

@Injectable()
export class IntegrationService {
  isEditorRender: boolean = true
  editor!: any;

 private dropEvents:any = [{
    event : `function triggerEvent(){}`,
    if:`if(condtion){}else{}`,
    alert:`<p>
    <ngb-alert [dismissible]="false">
      <strong>Warning!</strong> Better check yourself, you're not looking too good.
    </ngb-alert>
  </p>`,
    toast:`	<ngb-toast [autohide]="false"> I am a simple static toast. </ngb-toast> `,
    navigation:''
  }]

}
