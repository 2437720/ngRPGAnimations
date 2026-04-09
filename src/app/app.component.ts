import { Component } from '@angular/core';
import { transition, trigger, useAnimation } from "@angular/animations";
import { bounce, flip, jello, pulse, shakeX, tada } from 'ng-animate';
import { lastValueFrom, timer } from 'rxjs';

var TIMINGANIMATION = 0.5;
const ATTACKANIMATIONTIMING = 0.3;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("death", [
      transition(":increment",
        useAnimation(shakeX, { params: { timing: TIMINGANIMATION } })
      )
    ]),
    trigger("attack", [

      transition(":increment", [
        useAnimation(jello, { params: { timing: ATTACKANIMATIONTIMING } }),
        useAnimation(pulse, { params: { timing: ATTACKANIMATIONTIMING, scale: 4.5 } })
      ]),

    ]),
    trigger("bounce", [
      transition(":increment",
        useAnimation(bounce, { params: { timing: 1 } })
      )
    ]),
    trigger("flip", [
      transition(":increment",
        useAnimation(flip, { params: { timing: 0.75 } })
      )
    ]),

  ]
})
export class AppComponent {
  slimeIsPresent = false;
  ng_death = 0;
  ng_atack = 0;
  ng_bounce = 0;
  ng_flip = 0;

  css_hit = false;
  css_rotate = false;
  css_infinite_triple_spin = false;

  constructor() {
  }

  spawn() {

    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
    this.showSlime();

  }

  death() {
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    this.hideSlime();

    // TODO 2e animation angular en même temps
    this.ng_death++;
  }

  attack() {
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    this.ng_atack++;

    // TODO Jouer une autre animation avant

  }

  hit() {
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true;
    setTimeout(() => {
      this.css_hit = false;
    }, 0.3 * 1000);
  }

  async bounceShakeFlip() {

    await this.ng_bounce++;
    await this.waitFor(1);
    TIMINGANIMATION = 0.75;

    await this.ng_death++;
    await this.waitFor(1);
    await this.ng_flip++;



  }

  showSlime() {
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime() {
    var element = document.getElementById("slimeyId");

    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");

  }

  playLoopRotate() {
    this.rotateSlime();
  }
  rotateSlime() {

    this.slimeIsPresent = true;
    this.css_rotate = true;

    setTimeout(() => {
      this.css_rotate = false;
      this.rotateTop();
    }, 0.8 * 2 * 1000);




  }

  rotateTop() {
    this.slimeIsPresent = true;
    this.css_infinite_triple_spin = true;

    setTimeout(() => {
      this.css_infinite_triple_spin = false;
      this.playLoopRotate();
    }, 0.7 * 1000);
  }

  async waitFor(delayInSecons: number) {
    await lastValueFrom(timer(delayInSecons * 1000));
  }

}
