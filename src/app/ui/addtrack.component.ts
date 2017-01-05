import {
  Component, Output,
  EventEmitter, HostBinding,
  ViewChild, AfterViewInit
} from '@angular/core';



@Component({
  selector: 'app-add-track',
  templateUrl: './addtrack.component.html',
  styleUrls: ['./addtrack.component.scss']
})
export class AppAddTrackComponent implements AfterViewInit {

  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() dismiss: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('form') form;

  kind = 'time';

  ngAfterViewInit() {
    setTimeout(() => {
      this.form.nativeElement.focus();
    }, 100);
  }

  submit() {
    let val = this.form.nativeElement.value;
    if (val.length < 3) {
      this.form.nativeElement.focus();
      return;
    }
    // console.log('event');
    this.add.next({
      desc: val,
      kind: this.kind
    });

  }


}
