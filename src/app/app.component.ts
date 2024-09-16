import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'socialApp';
  private readonly _FlowbiteService = inject(FlowbiteService)
  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flowbite) =>{
      
    })
  }
}
