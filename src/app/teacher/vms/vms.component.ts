import { Component, OnInit } from '@angular/core';
import { Vm } from 'src/app/models/vm.model';

@Component({
  selector: 'app-vms',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.css']
})
export class VmsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  vms: Vm[] = [
    {name: 'prova', id: 1, vcpu: 1, ram: 2, spaceDisk: 3, isActive: false },
    {name: 'prova2', id: 2, vcpu: 1, ram: 2, spaceDisk: 3, isActive: false },
  ].map( (element) => new Vm() );
  
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  displayFn(vm: Vm): string {
    return vm.toString();
  }
}
