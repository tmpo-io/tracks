import { NgModule, Injectable } from '@angular/core';



@Injectable()
export class TestService {

  test() {
    console.log('test');
  }

}


@NgModule({
  providers: [
    TestService
  ]
})
export class TestModule {

}
