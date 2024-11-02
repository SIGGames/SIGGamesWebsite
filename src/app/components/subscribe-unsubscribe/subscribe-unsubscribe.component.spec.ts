import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeUnsubscribeComponent } from './subscribe-unsubscribe.component';

describe('SubscribeUnsubscribeComponent', () => {
  let component: SubscribeUnsubscribeComponent;
  let fixture: ComponentFixture<SubscribeUnsubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeUnsubscribeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeUnsubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
