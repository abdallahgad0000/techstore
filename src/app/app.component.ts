import { ActivatedRoute } from '@angular/router';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
        transition('1<=> 2, 1<=>3, 1<=>4, 1<=>5, 1<=>6, 1<=>7, 2<=>3, 2<=>4, 2<=>5, 2<=>6, 2<=>7, 3<=>4, 3<=>5, 3<=>6, 3<=>7, 4<=>5, 4<=>6, 4<=>7, 5<=>6, 5<=>7, 6<=>7', [
            style({ height: '!' }),
            query(':enter', style({ opacity: '0' })),
            query(':enter, :leave', style({ })),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ opacity: '0' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ opacity: '1' }))),
            ]),
        ]),
        // transition('2 => 1', [
        //     style({ height: '!' }),
        //     query(':enter', style({ transform: 'translateX(-100%)' })),
        //     query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        //     // animate the leave page away
        //     group([
        //         query(':leave', [
        //             animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
        //         ]),
        //         // and now reveal the enter
        //         query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
        //     ]),
        // ]),
    ])
]
})
export class AppComponent {
  title = 'techstore';
  getDepth(myOutLet){
    return myOutLet.activatedRouteData.pageIndex;
  }
}
