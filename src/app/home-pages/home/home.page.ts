import { GlobalEventService } from './../../../providers/events.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { NavController, IonContent } from '@ionic/angular';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppEventsService } from 'src/providers/app-events/app-events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('recentSlider', { static: false }) slider: IonSlides;

  segments = "topSeller"//first segment by default 
  scrollTopButton = false;//for scroll down fab 
  //for product slider after banner
  sliderConfig = {
    slidesPerView: this.config.productSlidesPerPage,
    spaceBetween: 0
  }
  selectedRadioGroup: any;
  selectedRadioItem: any;


  constructor(
    public nav: NavController,
    public config: ConfigService,
    public appEventsService: AppEventsService,
    public router: Router,
    public shared: SharedDataService,
    private eventService: GlobalEventService
  ) {
  }

  setMethod(d) {
    console.log(d);
  }
  ngOnInit() {
  }
  ionViewDidEnter() {
    this.shared.hideSplashScreen();
  }
  ionViewWillEnter() {
    if (!this.config.appInProduction) {
      this.config.productCardStyle = "1";
    }
  }

  // For FAB Scroll
  onScroll(e) {
    if (e.detail.scrollTop >= 500) {
      this.scrollTopButton = true;
    }
    if (e.detail.scrollTop < 500) {
      this.scrollTopButton = false;
    }
  }
  // For Scroll To Top Content
  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }
  openProducts(value) {
    this.nav.navigateForward(this.config.currentRoute + "/products/0/0/" + value);
  }

  refresh() {
    this.eventService.publishSomeData({event: 'refresh'});
  }

  openCategoryPage() {
    this.nav.navigateForward(this.config.getCurrentCategoriesPage())
  }

  openMyOrders() {
    this.nav.navigateForward('my-orders')
  }

  openContactUs() {
    this.nav.navigateForward('contact-us')
  }

}
