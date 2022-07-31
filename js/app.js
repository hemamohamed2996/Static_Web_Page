let mainColor = localStorage.getItem('color_option');
let backgroundOption = true;
let backgroundIntrval;
let backgroundLocalitem = localStorage.getItem('background_option');
if (backgroundLocalitem !== null) {
  console.log(backgroundLocalitem);
  if (backgroundLocalitem === 'true') {
    backgroundOption = true;
    console.log('yes');
  } else {
    backgroundOption = false;
    console.log('no');
  }
  document.querySelectorAll('.random-background span').forEach((element) => {
    element.classList.remove('active');
  });
  if (backgroundLocalitem === 'true') {
    document.querySelector('.random-background .yes').classList.add('active');
  } else {
    document.querySelector('.random-background .no').classList.add('active');
  }
}

if (mainColor !== null) {
  // console.log('local storge is not empty');
  //console.log(localStorage.getItem('color_option'));
  document.documentElement.style.setProperty(
    '--main-color',
    localStorage.getItem('color_option')
  );
}

let landingPage = document.querySelector('.landing-page');

let arrayPic = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];

function randomizeImgs() {
  console.log(backgroundOption);
  if (backgroundOption === true) {
    backgroundIntrval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * arrayPic.length);
      landingPage.style.backgroundImage =
        'url("Pic/' + arrayPic[randomNum] + '")';
    }, 1000);
  }
}
randomizeImgs();

let icon = document.querySelector('.toggle-settings');

let settingsBox = document.querySelector('.settings-box');
icon.addEventListener('click', function (e) {
  settingsBox.classList.toggle('active');
});
/* .onclick = function () {

    document.querySelector(".settings-box").classList.toggle("open");

};
 */
let colors = document.querySelectorAll('.settings-container .color');
let removeActiveclass = () => {
  colors.forEach((color) => {
    color.classList.remove('show-color');
  });
};
colors.forEach((color) => {
  color.addEventListener('click', (e) => {
    let newColor = e.target.getAttribute('data-color');
    document.documentElement.style.setProperty('--main-color', newColor);
    removeActiveclass();
    e.target.classList.add('show-color');
    localStorage.setItem('color_options', newColor);
  });
});

let randomBackground = document.querySelectorAll('.random-background span');
let removeActive = () => {
  randomBackground.forEach((span) => {
    span.classList.remove('active');
  });
};
randomBackground.forEach((span) => {
  span.addEventListener('click', (e) => {
    let random = e.target.getAttribute('span');
    removeActive();
    e.target.classList.add('active');

    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem('background_option', true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundIntrval);
      localStorage.setItem('background_option', false);
    }
  });
});

// select skills selector
let ourSkills = document.querySelector('.skills');
window.onscroll = function () {
  let skillsOFFsetTOP = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOFFsetTOP + skillsOuterHeight - windowHeight) {
    let allskills = document.querySelectorAll(
      '.skills .skill-box .skill-progress span '
    );
    allskills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
//create Popup with the image
let ourGallery = document.querySelectorAll('.gallery img');
ourGallery.forEach((img) => {
  img.addEventListener('click', (e) => {
    //create overlay
    let overlay = document.createElement('div');
    // add class to overlay
    overlay.className = 'popup-overlay';
    //append to body
    document.body.appendChild(overlay);
    // create popup box
    let popupBox = document.createElement('div');
    //add class to popup box
    popupBox.className = 'popup-box';
    if (img.alt !== null) {
      //create heading
      let imgHeading = document.createElement('h3');
      //create text
      let imgText = document.createTextNode(img.alt);
      // append the text to heading
      imgHeading.appendChild(imgText);
      // append heading to popup box
      popupBox.appendChild(imgHeading);
    }
    // create image
    let popupImage = document.createElement('img');
    // set image source
    popupImage.src = img.src;
    // add image to popup box
    popupBox.appendChild(popupImage);
    //append the popup box to body
    document.body.appendChild(popupBox);

    let closeButton = document.createElement('span');
    let closeButtonText = document.createTextNode('x');
    closeButton.appendChild(closeButtonText);
    closeButton.className = 'close-button';
    popupBox.appendChild(closeButton);
  });
});

//close popup
document.addEventListener('click', function (e) {
  if (e.target.className == 'close-button') {
    e.target.parentNode.remove();
    document.querySelector('.popup-overlay').remove();
  }
});
