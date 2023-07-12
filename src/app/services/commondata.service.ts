import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const COMMON_DATA_SERVICE = new InjectionToken<CommonDataService>('CommonDataService');

@Injectable({
    providedIn: 'root',
    useValue: COMMON_DATA_SERVICE
})
export class CommonDataService {

    private userObjSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userObj') || '{}'));
    user$: Observable<any> = this.userObjSubject.asObservable();

    private currencySubject = new BehaviorSubject<any>(localStorage.getItem("currency") || "USD");
    currency$: Observable<any> = this.currencySubject.asObservable();

    private configSubject = new BehaviorSubject<any>(localStorage.getItem("config"));
    config$: Observable<any> = this.configSubject.asObservable();

    private adminAccessSubject = new BehaviorSubject<any>(localStorage.getItem("adminAccess"));
    adminAccess$: Observable<any> = this.adminAccessSubject.asObservable();

    private domainAdminAccessSubject = new BehaviorSubject<any>(localStorage.getItem("domainAdminAccess"));
    domainAdminAccess$: Observable<any> = this.domainAdminAccessSubject.asObservable();

    private accountAdminAccessSubject = new BehaviorSubject<any>(localStorage.getItem("accountAdminAccess"));
    accountAdminAccess$: Observable<any> = this.accountAdminAccessSubject.asObservable();

    private customerSessionSubject = new BehaviorSubject<any>(localStorage.getItem("customerSession") || '{}');
    customerSession$: Observable<any> = this.customerSessionSubject.asObservable();

    constructor() {
        const userObj = JSON.parse(localStorage.getItem('userObj') || '{}');
        const customerSession = JSON.parse(localStorage.getItem('customerSession') || '{}');
        const currency = localStorage.getItem("currency") || "USD";
        const config = localStorage.getItem("config");
        const adminAccess = localStorage.getItem("adminAccess");
        const domainAdminAccess = localStorage.getItem("domainAdminAccess");
        const accountAdminAccess = localStorage.getItem("accountAdminAccess");

        this.userObjSubject.next(userObj);
        this.currencySubject.next(currency);
        this.configSubject.next(config);
        this.adminAccessSubject.next(adminAccess);
        this.domainAdminAccessSubject.next(domainAdminAccess);
        this.accountAdminAccessSubject.next(accountAdminAccess);
        this.customerSessionSubject.next(customerSession);
    }

    setUserData(data:any) {
        localStorage.setItem("userObj", JSON.stringify(data));
        this.userObjSubject.next(data);
    }

    setCustomerSession(data:any) {
        localStorage.setItem("customerSession", JSON.stringify(data));
        this.customerSessionSubject.next(data);
    }

    setCurrencyData(data:any) {
        if(data !== "INR"){
            data = "USD";
        }

        localStorage.setItem("currency", data);
        this.currencySubject.next(data);
    }

    setConfigData(data:any) {
        localStorage.setItem("config", data);
        this.configSubject.next(data);
    }

    setAdminAccess(data:any) {
        localStorage.setItem("adminAccess", data);
        this.adminAccessSubject.next(data);
    }

    setDomainAdminAccess(data:any) {
        localStorage.setItem("domainAdminAccess", data);
        this.domainAdminAccessSubject.next(data);
    }

    setAccountAdminAccess(data:any) {
        localStorage.setItem("accountAdminAccess", data);
        this.accountAdminAccessSubject.next(data);
    }

    removeAllSubject() {
        localStorage.removeItem("userObj");

        this.userObjSubject.next({});
        this.currencySubject.next(null);
        this.adminAccessSubject.next(null);
        this.domainAdminAccessSubject.next(null);
        this.accountAdminAccessSubject.next(null);
        this.customerSessionSubject.next(null);
        // this.configSubject.next(null); //TODO: Don't clear, it's necessary for 
    }
}
