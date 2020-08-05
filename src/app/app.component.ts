import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
// export class AppComponent implements OnInit {
export class AppComponent {
    @ViewChild('agGrid') agGrid: AgGridAngular;

    title = 'app';

    modules: any[] = [ClientSideRowModelModule, RowGroupingModule];
    rowData = [
        {
          id: 1,
          filePath: ['Documents'],
        },
        {
          id: 2,
          filePath: ['Documents', 'txt'],
        },
        {
          id: 3,
          filePath: ['Documents', 'txt', 'notes.txt'],
          dateModified: 'May 21 2017 01:50:00 PM',
          size: 14.7,
        },
        {
          id: 4,
          filePath: ['Documents', 'pdf'],
        },
        {
          id: 5,
          filePath: ['Documents', 'pdf', 'book.pdf'],
          dateModified: 'May 20 2017 01:50:00 PM',
          size: 2.1,
        },
        {
          id: 6,
          filePath: ['Documents', 'pdf', 'cv.pdf'],
          dateModified: 'May 20 2016 11:50:00 PM',
          size: 2.4,
        },
        {
          id: 7,
          filePath: ['Documents', 'xls'],
        },
        {
          id: 8,
          filePath: ['Documents', 'xls', 'accounts.xls'],
          dateModified: 'Aug 12 2016 10:50:00 AM',
          size: 4.3,
        },
        {
          id: 9,
          filePath: ['Documents', 'stuff'],
        },
        {
          id: 10,
          filePath: ['Documents', 'stuff', 'xyz.txt'],
          dateModified: 'Jan 17 2016 08:03:00 PM',
          size: 1.1,
        },
        {
          id: 11,
          filePath: ['Music', 'mp3', 'pop'],
          dateModified: 'Sep 11 2016 08:03:00 PM',
          size: 14.3,
        },
        {
          id: 12,
          filePath: ['temp.txt'],
          dateModified: 'Aug 12 2016 10:50:00 PM',
          size: 101,
        },
        {
          id: 13,
          filePath: ['Music', 'mp3', 'pop', 'theme.mp3'],
          dateModified: 'Aug 12 2016 10:50:00 PM',
          size: 101,
        },
        {
          id: 14,
          filePath: ['Music', 'mp3', 'jazz'],
          dateModified: 'Aug 12 2016 10:50:00 PM',
          size: 101,
        },
      ];
    columnDefs = [
        {
          field: 'dateModified',
          minWidth: 250,
          comparator: function(d1, d2) {
            return new Date(d1).getTime() < new Date(d2).getTime() ? -1 : 1;
          },
        },
        {
          field: 'size',
          aggFunc: 'sum',
          valueFormatter: function(params) {
            return params.value
              ? Math.round(params.value * 10) / 10 + ' MB'
              : '0 MB';
          },
        },
      ];
    defaultColDef = {
        flex: 1,
        filter: true,
        sortable: true,
        resizable: true,
      };
    autoGroupColumnDef = {
        headerName: 'Files',
        minWidth: 330,
        cellRendererParams: {
          checkbox: true,
          suppressCount: true,
          innerRenderer: 'fileCellRenderer',
        },
      };
    components = { fileCellRenderer: getFileCellRenderer() };
    groupDefaultExpanded = 0;

    getDataPath = function(data) {
        return data.filePath;
      };
    getRowNodeId = function(data) {
    return data.id;
    };

    public gridApi;
    public gridColumnApi;
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      }
}

function getFileCellRenderer() {
    function FileCellRenderer() {}
    FileCellRenderer.prototype.init = function(params) {
      var tempDiv = document.createElement('div');
      var value = params.value;
      var icon = getFileIcon(params.value);
      console.log(value)
      tempDiv.innerHTML = icon
        ? '<span><i class="' +
          icon +
          '"></i>' +
          '<span class="filename"></span>' +
          value +
          '</span>'
        : value;
      this.eGui = tempDiv.firstChild;
      console.log(tempDiv.firstChild)
    };
    FileCellRenderer.prototype.getGui = function() {
      return this.eGui;
    };
    return FileCellRenderer;
  }

function getFileIcon(name) {
  return endsWith(name, '.mp3') || endsWith(name, '.wav')
    ? 'far fa-file-audio'
    : endsWith(name, '.xls')
    ? 'far fa-file-excel'
    : endsWith(name, '.txt')
    ? 'far fa-file'
    : endsWith(name, '.pdf')
    ? 'far fa-file-pdf'
    : 'far fa-folder';
}

function endsWith(str, match) {
var len;
if (str == null || !str.length || match == null || !match.length) {
    return false;
}
len = str.length;
return str.substring(len - match.length, len) === match;
}