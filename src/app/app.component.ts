import { Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catering-app';
  // ngOnInit() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(this.setGeoLocation.bind(this));
  //   }
  // }
  // setGeoLocation(position: any) {
  //   this.userService.setLocation(
  //     position["coords"].latitude,
  //     position["coords"].longitude
  //   );
  // }
}
