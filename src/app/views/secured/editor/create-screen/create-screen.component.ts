import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ScreenModel } from "src/app/models/ScreenModel";
import { BoodskapService } from "src/app/services/boodskap.services";
import { CommonDataService } from "src/app/services/commondata.service";
import Swal from "sweetalert2";
import { ActivatedRoute } from '@angular/router';
import { EditorComponent } from "../editor.component";
import { ScreensListModel } from "../screens-list/screens-list.component";
import { EditorService } from "../editor.service";

@Component({
    selector: "app-create-screen",
    templateUrl: "./create-screen.component.html",
    styles: [``]
})

export class CreateScreenModal implements OnInit {
    app_id: any;
    createScreenForm: FormGroup;
    userObj: any;
    user_subs: any;
    isScreenCreateSubmit: boolean = false;
    isLoading: boolean = false;
    ScreenList: any
    screenNameList: any = [];
    existingValues: any;
    getSelectedEditScreenName: any
    grt: boolean = false

    @Input() selectedScreenObj: ScreenModel;

    constructor(
        public activeModal: NgbActiveModal,
        public boodskapService: BoodskapService,
        public commonDataService: CommonDataService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private editorComponent: EditorComponent,
        private editorSrv: EditorService
    ) {

        this.createScreenForm = this.formBuilder.group({
            screenname: ['', [Validators.required, this.duplicateValueValidator([this.screenNameList])]]
        });
    }
    get f1(): { [key: string]: AbstractControl } {


        return this.createScreenForm.controls;


    }

    createScreen() {
        this.isScreenCreateSubmit = true
        let screenObj: ScreenModel;
        if (this.selectedScreenObj.type == 'update' && this.createScreenForm.value.screenname) { //update

            screenObj = {
                "domainKey": this.userObj.domainKey,
                "clientDomainKey": this.selectedScreenObj.clientDomainKey,
                "category": this.selectedScreenObj.category,
                "tags": this.selectedScreenObj.tags,
                "screenid": this.selectedScreenObj.screenid,
                "screenname": this.createScreenForm.value.screenname,
                "app_id": this.selectedScreenObj.app_id,
                "screenimage": this.selectedScreenObj.screenimage,
                "screenitems": this.selectedScreenObj.screenitems,
                "version": this.selectedScreenObj.version,
                "code": this.selectedScreenObj.code,
                "createdby": this.selectedScreenObj.createdby,
                "createdbyemail": this.selectedScreenObj.createdbyemail,
                "createdtime": this.selectedScreenObj.createdtime,
                "updatedtime": new Date().getTime(),
                "importedtime": this.selectedScreenObj.importedtime,
                "config": this.selectedScreenObj.config,
                "description": this.selectedScreenObj.description,
                "market": this.selectedScreenObj.market
            };
        } else { //create

            screenObj = {
                "domainKey": this.userObj.domainKey,
                "clientDomainKey": "",
                "category": "screen",
                "tags": this.selectedScreenObj.app_id,
                "screenid": this.guid(),
                "screenname": this.createScreenForm.value.screenname,
                "app_id": this.selectedScreenObj.app_id,
                "screenimage": "",
                "screenitems": [],
                "version": "1.0.0",
                "code": "",
                "createdby": this.userObj.user.firstName + " " + this.userObj.user.lastName,
                "createdbyemail": this.userObj.user.email,
                "createdtime": new Date().getTime(),
                "updatedtime": new Date().getTime(),
                "importedtime": new Date().getTime(),
                "config": "",
                "description": "",
                "market": ""
            };

        }
        let duplicateValueFind = (this.createScreenForm.controls['screenname'].errors);

        if (this.createScreenForm.value.screenname && duplicateValueFind == null) {
            this.boodskapService.upsertScreenAPI(screenObj).subscribe({
                next: (res) => {
                    if (res && (res.code === "SUCCESS")) {
                        Swal.fire(
                            'Success',
                            `Screen create/update successfully`,
                            'success'
                        ).then((result) => {
                            this.activeModal.close();
                            this.editorComponent.app_id = screenObj.tags
                            setTimeout(() => {
                                this.editorComponent.getScreensList()
                            }, 1000)
                        });
                        this.editorComponent.screensList = []

                        this.editorComponent.getScreensList()
                    } else {
                        Swal.fire(
                            'Failed',
                            'Screen create/update failed, please try again later!',
                            'error'
                        );
                    }
                },
                error: (err) => {
                    Swal.fire({
                        title: 'Failed!',
                        html: `Screen update failed.`,
                        icon: 'error',
                        confirmButtonColor: '#f41a7b',
                        confirmButtonText: 'Ok, Close'
                    });
                },
                complete: () => { }
            });
        }

    }

    duplicateValueValidator(existingValues: any[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const value = control.value;


            if (existingValues[0].includes(value)) {
                return { 'duplicateValue': true };
            }
            return null;
        };
    }


    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    ngOnInit(): void {



        this.ScreenList = (this.editorSrv.ScreenList);
        let listArr = this.ScreenList
        listArr.filter((item: any) => {


            this.screenNameList.push(item.screenname);



        })

        this.user_subs = this.commonDataService.user$.subscribe((value) => {
            this.userObj = value;
        });

        this.getSelectedEditScreenName = this.editorSrv.editValue

        if (this.selectedScreenObj && this.selectedScreenObj.screenname) {
            let control = this.createScreenForm.get('screenname');
            let errors = control!.errors!['required'];


            this.createScreenForm.patchValue({
                screenname: (this.getSelectedEditScreenName || this.selectedScreenObj.screenname)

            });
        }
    }
}