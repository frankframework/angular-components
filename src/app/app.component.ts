import { Component, OnInit } from '@angular/core';
import { DataTableColumn, DataTableDataSource, LibraryModule } from 'angular-components';
import { SvgAddIconComponent } from './svg-add-icon/svg-add-icon.component';
import { FormsModule } from '@angular/forms';

type TableData = {
  title: string;
  description: string;
  genre: string;
};

@Component({
  selector: 'app-root',
  imports: [FormsModule, LibraryModule, SvgAddIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected searchText: string = '';
  protected checked: boolean = false;
  protected checked2: boolean = true;
  protected datasource: DataTableDataSource<TableData> = new DataTableDataSource();
  protected displayedColumns: DataTableColumn<TableData>[] = [
    { name: 'title', displayName: 'Title', property: 'title', sortable: true },
    { name: 'description', displayName: 'Description', property: 'description', sortable: true },
    { name: 'genre', displayName: 'Genre', property: 'genre', sortable: true },
    { name: 'actions', displayName: 'Actions', property: null, html: true },
    { name: 'something', displayName: 'Something', property: null, html: true },
  ];

  private readonly appRoot: HTMLElement = document.querySelector('app-root')!;

  ngOnInit(): void {
    this.datasource.data = [
      {
        title: 'The Lord of the Rings',
        description: 'The Lord of the Rings is an epic high fantasy novel written by English author J. R. R. Tolkien.',
        genre: 'Fantasy',
      },
      {
        title: 'Star Wars: A new Hope',
        description:
          'Star Wars: A new Hope is a 1977 American epic space opera film directed by George Lucas, produced by Lucasfilm and distributed by 20th Century Fox.',
        genre: 'Sci-Fi',
      },
      {
        title: 'The Matrix',
        description: 'The Matrix is a science fiction action film written and directed by the Wachowskis.',
        genre: 'Sci-Fi',
      },
    ];
  }

  protected debug(...data: unknown[]): void {
    console.log(data);
  }

  protected toggleTheme(): void {
    document.body.classList.toggle('ff-dark-theme');
  }

  protected toggleFont(): void {
    this.appRoot.classList.toggle('no-font');
  }

  protected changeSearchQuery(): void {
    this.searchText = 'Eekum Bokum';
  }
}
