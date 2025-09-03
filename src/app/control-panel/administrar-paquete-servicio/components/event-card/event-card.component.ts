import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() titulo: string='';
  @Input() imagen: string='';
  @Input() id: number = 0;
  // @Input() lista: any[] = [];
  @Output() emitAccion: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  
  cambioVista(){
    this.emitAccion.emit(this.id);

  }
}


