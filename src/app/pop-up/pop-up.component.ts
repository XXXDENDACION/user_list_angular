import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {PopUpService} from '../../shared/services/popup.service'

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'close',
        style({
          transform: 'translateX(100%)',
        })
      ),
      state(
        'open',
        style({
          transform: 'translateX(0%)',
        })
      ),
      transition('close=>open', [animate('0.5s')]),
      transition('open=>close', [animate('0.5s')]),
    ]),
  ],
})
export class PopUpComponent implements OnInit {
  // isOpen: boolean = true;
  // error: string;
  // isValid: boolean = true;
  data;

  constructor(
    private popUpService: PopUpService
  ) { }

  ngOnInit(): void {
    this.setParameters();
  }

  setParameters() : void {
    this.popUpService.subject.subscribe(x => this.data = x);
  }

}
