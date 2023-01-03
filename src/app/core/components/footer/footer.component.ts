import { Component } from '@angular/core';
import { ConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  readonly now = new Date();
  readonly version = this.configService.getVersion();

  constructor(private configService: ConfigService) {}
}
