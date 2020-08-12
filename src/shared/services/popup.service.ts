import {Injectable} from '@angular/core'
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PopUpService{
 
    private data =  {
        isValid : true,
        isOpen : false,
        message : ''
    }
    public  subject = new BehaviorSubject(this.data);

    getData() : object {
        return this.data;
    }

    setData(isValid: boolean, isOpen: boolean, message: string) {
        this.data = {
            isValid : isValid,
            isOpen: isOpen,
            message : message,
        }
        this.subject.next(this.data);
         setTimeout(() => (this.data.isOpen = !this.data.isOpen), 2000);
         this.subject.next(this.data);
    }
}