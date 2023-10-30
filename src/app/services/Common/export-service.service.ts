import { Injectable } from '@angular/core';
import {jsPDF }  from 'jspdf';
import 'jspdf-autotable';
import {UserOptions} from 'jspdf-autotable';


interface IjsPDFwithplugin extends jsPDF{
  autoTable:(option:UserOptions)=>jsPDF;
}
@Injectable({
  providedIn: 'root'
})
export class ExportServiceService {

  constructor() { }

  convertToPdf(rowList:any[],headerList:string[]){
    const doc=new jsPDF('portrait','px','a4') as IjsPDFwithplugin;



    doc.autoTable({
      head:[headerList],
      body:rowList
    });

    return doc;
  }

  convertToCsv(rowList:any[],headerList:string[]){
    let str="";
    let row='sl. no.,';

    row+=headerList.join(',');//generate header row
    str +=row+'\r\n';


    for(let i=0;i<rowList.length;i++){
      let line=(i+1).toString();

      for(const index in headerList){

        if(index){
          const header=headerList[index];
          line+=','+rowList[i][header];
        }
      }

      str+=line+'\r\n';
    }
    return str
  }
}
