import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { OptimizedImageComponent } from '../shared/optimized-image/optimized-image.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, OptimizedImageComponent, JsonPipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  auth = inject(AuthService);

  userProfile = this.auth.userProfile;

  image = computed(() => {
    return {
      image: this.userProfile().avatar,
      name: this.userProfile().name
    }
  })

}
