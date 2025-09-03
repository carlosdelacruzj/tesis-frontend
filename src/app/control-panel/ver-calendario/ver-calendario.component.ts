import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CitaCalendario } from './model/calendario.model';
import { CalendarioService } from './service/calendario.service';
import esLocale from '@fullcalendar/core/locales/es';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { EventoDetailModel } from './model/eventoDetail.model';


@Component({
  selector: 'app-ver-calendario',
  templateUrl: './ver-calendario.component.html',
  styleUrls: ['./ver-calendario.component.css'],
})
export class VerCalendarioComponent implements OnInit {
  citas: CitaCalendario[];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.eventClick.bind(this),
    plugins: [dayGridPlugin, interactionPlugin],
    locale: esLocale,
    titleFormat: { year: 'numeric', month: 'long' },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridDay',
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
    },
    showNonCurrentDates: false,
  };

  constructor(
    public service: CalendarioService,
    public dialog: MatDialog
  ) {

  }

  openDialog(model: EventoDetailModel) {
    this.dialog.open(DialogComponent, {
      data: model[0]
    });
  }

  async ngOnInit() {
    await this.getEventos();
    this.addCitas(this.citas);
  }

  async getEventos() {
    try {
      this.citas = await this.service.getAllEventos();
      this.citas.map((p) => {
        p.allDay = false;
        p.id = p.id.toString();
        return p;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async eventClick(arg: any) {
    const detalle = await this.service.getDetalleID(arg.event.id);
    this.openDialog(detalle);
  }

  addCitas(citas: CitaCalendario[]) {
    this.calendarOptions.events = citas;
  }
}
