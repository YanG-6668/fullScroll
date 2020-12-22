(function () {
  "use strict";
  const sections = document.querySelectorAll('.section');
  const navLink = document.querySelectorAll('.nav__link');
  const dotsLink = document.querySelectorAll('.dots__link');
  const scrollTime = 1;
  const sectionsLength = sections.length;
  let scdir;
  let hold = false;

  function _scrollY(obj) {
    let slength;
    let plength;
    let pan;
    let step = 100;
    const vh = window.innerHeight / 100;
    const vmin = Math.min(window.innerHeight, window.innerWidth) / 100;

    if ((this !== undefined && this.id === 'fullScroll') || (obj !== undefined && obj.id === 'fullScroll')) {
      pan = this || obj;
      plength = parseInt(pan.offsetHeight / vh);
    }
    if (pan === undefined) {
      return;
    }
    plength = plength || parseInt(pan.offsetHeight / vmin);
    slength = parseInt(pan.style.transform.replace('translateY(', ''));

    if (scdir === 'up' && Math.abs(slength) < (plength - plength / sectionsLength)) {
      slength = slength - step;
    } else if (scdir === 'down' && slength < 0) {
      slength = slength + step;
    } else if (scdir === '1') {
      slength = 0;
    } else if (scdir === '2') {
      slength = -100;
    } else if (scdir === '3') {
      slength = -200;
    } else if (scdir === '4') {
      slength = -300;
    }

    document.querySelector('.nav__link.is-active').classList.remove('is-active');
    document.querySelector('.dots__link.is-active').classList.remove('is-active');
    if (slength === 0) {
      navLink[0].classList.add('is-active');
      dotsLink[0].classList.add('is-active');
    } else if (slength === -100) {
      navLink[1].classList.add('is-active');
      dotsLink[1].classList.add('is-active');
    } else if (slength === -200) {
      navLink[2].classList.add('is-active');
      dotsLink[2].classList.add('is-active');
    } else if (slength === -300) {
      navLink[3].classList.add('is-active');
      dotsLink[3].classList.add('is-active');
    }

    if (hold === false) {
      hold = true;
      pan.style.transform = 'translateY(' + slength + 'vh)';
      setTimeout(function () {
        hold = false;
      }, 500);
    }
  }
 
  const fullScroll = document.getElementById('fullScroll');
  fullScroll.style.transform = 'translateY(0)';
  fullScroll.style.transition = `transform ${scrollTime}s ease`;
  fullScroll.addEventListener('wheel', function (e) {

    if (e.deltaY < 0) {
      scdir = 'down';
    }
    if (e.deltaY > 0) {
      scdir = 'up';
    }
    e.stopPropagation();
  });
  fullScroll.addEventListener('wheel', _scrollY);

  dotsLink.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const target = e.target.dataset.dots;
      if (target === '1') {
        scdir = '1';
      } else if (target === '2') {
        scdir = '2';
      } else if (target === '3') {
        scdir = '3';
      } else if (target === '4') {
        scdir = '4';
      }
      _scrollY(fullScroll);
    });
  });


  navLink.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = e.target.dataset.navLink;
      if (target === '1') {
        scdir = '1';
      } else if (target === '2') {
        scdir = '2';
      } else if (target === '3') {
        scdir = '3';
      } else if (target === '4') {
        scdir = '4';
      }
      _scrollY(fullScroll);
    });
  });
})();
