# ⏰ Tracks

🚜 WIP Angular 2 Progressive Web App. __lot's of snipets with love_

Master branch is published here.
https://tracks.tmpo.io

⌨⌨ **<span color="red">Also if you found this repo interesting, and you are looking for someone that can help you build better frontend projects. We are available for hire! </span>** ⌨⌨ 


## 📺 Whats on?

- Progressive Web App built with Angular2. (2.3.x) 
- [Uses ngrx/store to keep the state and syncs it to localStorage.](https://github.com/tmpo-io/tracks/blob/8838a3f03b9a808804a5fa33bfa19a06561c9127/src/app/store/store.module.ts)
- [App is OnPush](https://github.com/tmpo-io/tracks/blob/8838a3f03b9a808804a5fa33bfa19a06561c9127/src/app/app.component.ts#L25) Theoretically there is no changedetector (but it's still compiled in the javascript) I think there is no easy way of tree shake it (perhaps by module design). Also I found some recursive callbacks with zone when you record a timeline profile.
- Optimized for high performance on mobile devices (Tested on an old Samsung galaxy note 2)
- Using Observables for interactive elements.
- [🔥 A swipe implementation ala Cycle (Using observable streams)](https://github.com/tmpo-io/tracks/blob/8838a3f03b9a808804a5fa33bfa19a06561c9127/src/app/ui/swiper.directive.ts)
- Using service worker from google-chrome.
- [🌴 An example on howto build it with rollup](https://github.com/tmpo-io/tracks/blob/7690a3c7e2f04ae6ddd326393de1626bca23a401/Makefile) (30% reduction in size than with cli). Check devel branch. There is a makefile that should do the job.
- Still not optimized for desktop browsers

## 🔨 Some other interesting snippets you can find on de codebase:

- [🏎 Apply animations to host components](https://github.com/tmpo-io/tracks/blob/8838a3f03b9a808804a5fa33bfa19a06561c9127/src/app/ui/addtrack.component.ts#L33)
- [🔺 Acces nativeElement (the DOM object)](https://github.com/tmpo-io/tracks/blob/8838a3f03b9a808804a5fa33bfa19a06561c9127/src/app/ui/addtrack.component.ts#L31)
- [📦 The whole App state is managed through ngrx (also routing)](https://github.com/tmpo-io/tracks/blob/8838a3f03b9a808804a5fa33bfa19a06561c9127/src/app/app.component.ts#L73) 
  This exploits the fact that Observable streams are lazy. Each data stream is built declaratively, with small functions. Component subscription is managed with the *async pipe*
- [✈️ An example of how declaratively build the data stream allows to test the important parts.](https://github.com/tmpo-io/tracks/blob/8838a3f03b9a808804a5fa33bfa19a06561c9127/src/app/store/selectors.spec.ts)
- [⌚️ A timer like a clock built with an Observable Stream](https://github.com/tmpo-io/tracks/blob/8838a3f03b9a808804a5fa33bfa19a06561c9127/src/app/ui/trackclock.component.ts) Also interesting on the example the use of a seter, to change the component behaviour. 
- [👏 An example of how to implement authorization with GAPI](https://github.com/tmpo-io/tracks/blob/7690a3c7e2f04ae6ddd326393de1626bca23a401/src/app/drive/index.ts) The idea is to let export your tracks to google Drive.

## ✂️ Things I did to optimize the size:

- I don't use angular router. The app is only two screens and the angular router is about 30Kb.
- I also don't use forms and http.
- I tried to provide my own implementation of Commons (because I'm only using two directives and one filter), but it's almost impossible to get rid of it, without making ugly hacks.


## Contributing
✨ If you like the app or you would like to contribute in something, feel free to send us a PR. it will make us so happy.... ✨

## Ports:
I'm also porting the app to *p*react to see the main differences on the process

🛠<br />
You can track the progress here<br/>[github.com/jordic/tracks_preact](https://github.com/jordic/tracks_preact)

## Screenshot
<img src="https://raw.githubusercontent.com/jordic/tracks_preact/master/screenshot/screenshot.png" width="300" />


**Built with :heart: by [TMPO.io](https://tmpo.io)**

