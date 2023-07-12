import { ProjectController } from './project.controller';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectsearcher',
})
export class Searcher implements PipeTransform {
  constructor(private common: ProjectController) {}
  filtered: any;
  transform(value: any, search: any): any {
    if (search == '') {
      this.filtered = value;
      this.common.setMyData(this.filtered)
      return value;
    } else {
      this.filtered = value.filter((name: any) => {
        if (name.project_name.toLowerCase().includes(search.toLowerCase())) {
          return name.project_name;
        }
      });
    }
    this.common.setMyData(this.filtered);
    return this.filtered
  }
}
