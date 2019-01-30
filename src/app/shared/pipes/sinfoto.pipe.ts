import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinfoto'
})
export class SinfotoPipe implements PipeTransform {

  transform(value): string {

    let noimage = "assets/img/noimage.png";

    if( value == "/assets/img/null"){
      return noimage;
    }

    return ( value.length > 0 ) ? value : noimage;
  }

}

