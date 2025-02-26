// Define a Custom Animation
// import {animate, style, transition, trigger} from '@angular/animations';

// export const dialogAnimations = {
//   // Slide in from top with a slight scale effect
//   dialogOpen: trigger('dialogOpen', [
//     transition(':enter', [
//       style({transform: 'translateY(-20%) scale(0.9)', opacity: 0}),
//       animate('300ms ease-out', style({transform: 'translateY(0) scale(1)', opacity: 1}))
//     ]),
//     transition(':leave', [
//       animate('200ms ease-in', style({transform: 'translateY(-20%) scale(0.9)', opacity: 0}))
//     ])
//   ])
// };



//  Fade-In Animation
import { trigger, transition, style, animate } from '@angular/animations';

export const dialogAnimations = {
  dialogOpen: trigger('dialogOpen', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ opacity: 0 }))
    ])
  ])
};



//Zoom-In Animation
// import { trigger, transition, style, animate } from '@angular/animations';
//
// export const dialogAnimations = {
//   dialogOpen: trigger('dialogOpen', [
//     transition(':enter', [
//       style({ transform: 'scale(0.5)', opacity: 0 }),
//       animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'scale(1)', opacity: 1 }))
//     ]),
//     transition(':leave', [
//       animate('200ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'scale(0.5)', opacity: 0 }))
//     ])
//   ])
// };


// Slide-In from Bottom Animation
// import { trigger, transition, style, animate } from '@angular/animations';
//
// export const dialogAnimations = {
//   dialogOpen: trigger('dialogOpen', [
//     transition(':enter', [
//       style({ transform: 'translateY(100%)', opacity: 0 }),
//       animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
//     ]),
//     transition(':leave', [
//       animate('200ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
//     ])
//   ])
// };


// Slide-In from Right Animation
// import { trigger, transition, style, animate } from '@angular/animations';
//
// export const dialogAnimations = {
//   dialogOpen: trigger('dialogOpen', [
//     transition(':enter', [
//       style({ transform: 'translateX(100%)', opacity: 0 }),
//       animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
//     ]),
//     transition(':leave', [
//       animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
//     ])
//   ])
// };

// Bounce-In Animation
// import { trigger, transition, style, animate, keyframes } from '@angular/animations';
//
// export const dialogAnimations = {
//   dialogOpen: trigger('dialogOpen', [
//     transition(':enter', [
//       animate(
//         '400ms cubic-bezier(0.35, 0, 0.25, 1)',
//         keyframes([
//           style({ transform: 'scale(0.5)', opacity: 0, offset: 0 }),
//           style({ transform: 'scale(1.05)', opacity: 1, offset: 0.6 }),
//           style({ transform: 'scale(0.95)', opacity: 1, offset: 0.8 }),
//           style({ transform: 'scale(1)', opacity: 1, offset: 1.0 })
//         ])
//       )
//     ]),
//     transition(':leave', [
//       animate('200ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'scale(0.5)', opacity: 0 }))
//     ])
//   ])
// };
