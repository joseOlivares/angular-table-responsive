
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InfoTransaccion } from '../models/infoTransaccion.model';
import { DataService } from '../services/data.service';



@Component({
  selector: 'app-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss']
})
export class TableResponsiveComponent implements OnInit {

  constructor(private data:DataService) {
    this.TEST_DATA= data.testArrayData; //Data test service
 }

 public TEST_DATA;

  displayedColumns: string[] = ['Fecha', 'ID', 'Tipo', 'Descripcion','Monto', 'star'];
  dataSource = new MatTableDataSource<InfoTransaccion>(this.data.testArrayData);//Data Test

  public getScreenWidth: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort| any;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Detectando el width de la pantalla
    @HostListener('window:resize', ['$event'])
    onWindowResize() {
      this.getScreenWidth = window.innerWidth;
      console.log(this.getScreenWidth);
    }
 //---------

  applyFilter(filterValue: any) {
    const myFilterValue=filterValue.target.value;
    this.dataSource.filter = myFilterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

