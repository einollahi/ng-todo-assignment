import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UiService } from '../../shared/services/ui.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  isLoading = true;
  isLoadingSubscription: Subscription;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.isLoadingSubscription = this.uiService.getIsloading().subscribe((data: boolean) => {
      this.isLoading = data;
    })
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription?.unsubscribe();
  }
}
