import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonalPagePage } from './personal-page.page';

describe('PersonalPagePage', () => {
  let component: PersonalPagePage;
  let fixture: ComponentFixture<PersonalPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
