const toggleSwitchMode = document.querySelector('.header__switch');

toggleSwitchMode.addEventListener('click', (event)=>{
 const body = document.querySelector("body");
 body.dataset.theme = !JSON.parse(body.dataset.theme)
})

// class Slider{
//   constructor(images, buttons, visibleElements, sliderChangeState){
//     this.images = images;
//     this.buttons = buttons;
//     this.index = 0;
//     this.width = 0;
//     this.visibleElements = visibleElements;
//     this.sliderChangeState = sliderChangeState;
//   }

  
//   calcTheWholeWidth(){
//     document.querySelector('.slider').style.width =  (this.images[0].offsetWidth * this.visibleElements) + (20 * this.images.length)+ 'px';
//   }

//   moveSlider(width){
//     const slider = document.querySelector('.slider-wrapper');
//     slider.style.left = -width * this.index + 'px';
  
//   }
 
//   setIndex(number){
//     const soloImage = this.images.length - this.visibleElements;
//     const multiImage = this.images.length / this.visibleElements;
//     const a = this.sliderChangeState ? soloImage : multiImage
//     if(number > a ){
//       this.index = 0;
//       this.moveSlider(0);
//     }else if (number < 0){
//       this.index = this.sliderChangeState ? soloImage : multiImage;
//       this.moveSlider(this.images[0].offsetWidth * this.visibleElements / this.visibleElements);
//     }else{
//       this.index = number;
//       this.moveSlider(this.sliderChangeState ? this.images[0].offsetWidth : this.images[0].offsetWidth * this.visibleElements)
//     }


//   }
  
//   nextSlider(){
//     this.setIndex(this.index + 1);
//   }
//   prevSlider(){
//     this.setIndex(this.index - 1);
//   }

//   init(){
//     this.calcTheWholeWidth();
//     buttons.forEach(element =>{
//       if (element.classList.contains('prev')){
//         element.addEventListener('click', this.prevSlider.bind(this))
//       }
//       if (element.classList.contains('next')){
//         element.addEventListener('click', this.nextSlider.bind(this))
//       }
//     })
      
    
//   }
// }



// const images = document.querySelectorAll('.image');
// const buttons = document.querySelectorAll('.arrow')




// const slider = new Slider(images, buttons, 4, true)


// slider.init();

class Slider{
  constructor(container, button, visibleElements, sliderChangeState){
    this.container = container;
    this.button = button;
    this.index = 0;
    this.width = 0;
    this.visibleElements = visibleElements;
    this.sliderChangeState = sliderChangeState;
  }

  
  // calcTheWholeWidth(){
  //   document.querySelector('.slider').style.width =  (this.images[0].offsetWidth * this.visibleElements) + (20 * this.images.length)+ 'px';
  // }

  moveSlider(width){
    // const style = getComputedStyle(document.querySelector('.slider__wrapper'));
    // const left = style.getPropertyValue("left");
    // console.log(this.index)
    this.container.style.left = 245 - (width + 46) * this.index + 'px';
    console.log(this.container.children)
    for (let item of this.container.children) {
      item.classList.remove('active')
    }
    this.container.children[this.index].classList.add('active')
    document.querySelector('.progress__num_first').innerHTML = this.index
  }
 
  setIndex(number){
    const soloImage = this.container.children.length - this.visibleElements;
    const multiImage = this.container.children.length / this.visibleElements;
    const a = this.sliderChangeState ? soloImage : multiImage
    if(number > 8 ){
      this.index = 0;
      this.moveSlider(0);
    }else if (number < 0){
      this.index = this.sliderChangeState ? soloImage : multiImage;
      this.moveSlider(this.container.children[0].offsetWidth * this.visibleElements / this.visibleElements);
    }else{
      this.index = number;
      this.moveSlider(this.sliderChangeState ? this.container.children[0].offsetWidth : this.container.children[0].offsetWidth * this.visibleElements)
    }


  }
  
  nextSlider(){
    this.setIndex(this.index + 1);
  }
  prevSlider(){
    this.setIndex(this.index - 1);
  }

  changeIndexSlide(value) {
    this.setIndex(value);
  }

  init(){
    // this.calcTheWholeWidth();
    // buttons.addEventListener(element =>{
    //   if (element.classList.contains('prev')){
    //     element
    //   }
    //   if (element.classList.contains('next')){
    //     element.addEventListener('click', this.nextSlider.bind(this))
    //   }
    // })
    this.button.addEventListener('change', (event) => {
      this.changeIndexSlide.call(this, event.target.value)

    })
      
    
  }
}



const container = document.querySelector('.slider__wrapper');
// const buttons = document.querySelectorAll('.arrow')

const progress = document.querySelector('.progress__slider')


const slider = new Slider(container, progress, 4, true)


slider.init();