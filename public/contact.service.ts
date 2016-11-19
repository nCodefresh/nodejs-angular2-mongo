import {Injectable} from '@angular/core';
import {Contact} from "./contact";
import {Headers, RequestOptions, Response, Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ContactService{

    constructor (private http: Http) {}

    addContact(name: string, email: string, message: string): Observable<Contact>{

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/api/contact', { name, email, message}, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);    }
}