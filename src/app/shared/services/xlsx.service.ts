import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export class XLSXData {
  rows: any[];
  description?: {};
  title?: string;
}

type AOA = any[][];

@Injectable({
  providedIn: 'root',
})
export class XlsxService {
  private wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'binary' };

  constructor() {}

  export(sheetsData: XLSXData[], sheetNames: string[], fileName): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    wb.Workbook = { Views: sheetNames.map((s) => ({ RTL: true })) };
    sheetsData.forEach((data, i) => {
      if (!data.rows[0]) {
        return;
      }
      // Auto Fit Column Widths
      const colsWidth = [];
      Object.keys(data.rows[0]).forEach((key, i) => {
        if (typeof data.rows[0][key].getMonth === 'function') {
          colsWidth[i] = { wpx: 70 };
          return;
        }
        const items = data.rows.map((r) => (r[key] ? r[key].toString() : ''));
        items.push(key);
        const maxStrLength = items.reduce((a, b) =>
          a.length > b.length ? a : b
        ).length;
        colsWidth[i] = { wch: maxStrLength + 1 };
      });

      const aoa: AOA = new Array<any[]>(); // = _.keys(data.rows[0]).concat(['','','','','','',])
      const merges = [];
      if (data.title) {
        aoa.push([data.title]);
        merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 15 } });
      }

      aoa.push(
        Object.keys(data.rows[0])
          .map((key) => key)
          .concat(['', '', '', '', '', ''])
      );
      data.rows.forEach((v, i) => {
        aoa.push(
          Object.values<any>(data.rows[i]).concat(['', '', '', '', '', ''])
        );
      });
      if (data.description) {
        Object.keys(data.description).forEach((key, i) => {
          aoa[1 + i][aoa[0].length - 3] = key;
          aoa[1 + i][aoa[0].length - 2] = data.description[key];
        });
      }
      const sheet = XLSX.utils.aoa_to_sheet(aoa, { cellDates: true });
      sheet['!cols'] = colsWidth;
      sheet['!merges'] = merges;
      XLSX.utils.book_append_sheet(wb, sheet, sheetNames[i]);
      // wb.Sheets[sheetNames[i]] = sheet;
    });
    /* save to file */
    const wbout: string = XLSX.write(wb, this.wopts);
    saveAs(new Blob([this.s2ab(wbout)]), fileName);
  }

  import(arrayBuffer) {
    const data = new Uint8Array(arrayBuffer);
    const arr = [];
    for (let i = 0; i !== data.length; ++i) {
      arr[i] = String.fromCharCode(data[i]);
    }
    const bstr = arr.join('');
    const workbook = XLSX.read(bstr, { type: 'binary' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(worksheet, { raw: true });
  }

  private s2ab(s: string): ArrayBuffer {
    const buf: ArrayBuffer = new ArrayBuffer(s.length);
    const view: Uint8Array = new Uint8Array(buf);
    // eslint-disable-next-line no-bitwise
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }
}
