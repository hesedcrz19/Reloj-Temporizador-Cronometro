// ----------------------- HEADER ----------------------

// ----------------------- THEME -----------------------

const COLOR_THEME = document.querySelector(".header__options__theme");
const COLOR_THEME_BUTTON = document.querySelector(".header__options__theme__label");
const COLOR_OPTIONS = document.querySelectorAll(".header__options__theme__label__color");

if(localStorage.getItem('theme')){
    let elementColorStorage = localStorage.getItem('theme');
    let elementColor = document.getElementsByClassName(elementColorStorage)[0];
    let elementColorColor = getComputedStyle(elementColor).getPropertyValue('--color-option');

    elementColor.classList.add('color-selected');

    document.documentElement.style.setProperty('--primary-color',elementColorColor);
}else{
    let defaultColor = getComputedStyle(COLOR_OPTIONS[0]).getPropertyValue('--color-option');

    COLOR_OPTIONS[0].classList.add('color-selected');
    document.documentElement.style.setProperty('--primary-color',defaultColor);
}

const COLOR_SELECTIONED = (event)=>{
    if(!event.target.matches('.header__options__theme__label__color'))return

    TOGGLE_COLOR_OPTIONS();

    let oldColor = document.querySelector('.color-selected');
    oldColor.classList.remove('color-selected');
    
    let newColor = getComputedStyle(event.target).getPropertyValue('--color-option');
    
    document.documentElement.style.setProperty('--primary-color',newColor);
    
    localStorage.setItem('theme',event.target.className);
    
    event.target.classList.add('color-selected');
}

const RECURSIVE_TOGGLE_COLOR_OPTIONS = ()=>{
    let locked = false;

    return ()=>{
        if(locked) return;
        let open = COLOR_THEME_BUTTON.classList.contains('open');
    
        if(open){
            locked = true
    
            COLOR_OPTIONS.forEach((color)=>{
                color.style.animationName = "hide-color-options";
            })

            setTimeout(()=>{
                COLOR_THEME_BUTTON.classList.remove('open');
                COLOR_THEME_BUTTON.classList.add('close');
                setTimeout(()=>{
                    locked = false
                    removeEventListener('click',TOGGLE_COLOR_OPTIONS)
                },50)
            },300)
        }else{
            locked = true
    
            COLOR_THEME_BUTTON.classList.remove('close');
            COLOR_THEME_BUTTON.classList.add('open');
            setTimeout(()=>{
                COLOR_OPTIONS.forEach((color)=>{
                    color.style.display = 'block';
                    color.style.animationName = "show-color-options";
                })

                setTimeout(()=>{
                    locked = false
                    addEventListener('click',TOGGLE_COLOR_OPTIONS)
                },300)
            },50)
        }
    }
}

const TOGGLE_COLOR_OPTIONS = RECURSIVE_TOGGLE_COLOR_OPTIONS();

COLOR_THEME_BUTTON.addEventListener('click',TOGGLE_COLOR_OPTIONS);
COLOR_THEME.addEventListener('click',COLOR_SELECTIONED);

// ----------------------- THEME END -----------------------





// ----------------------- DARK-LIGHT -----------------------

const DARK_LIGHT_BUTTON = document.querySelector(".header__options__theme-mode");

const TOGGLE_DARK_LIGHT = ()=>{
    const ROOT = document.documentElement;
    let darkMode = ROOT.classList.contains('dark');
    let scheme = darkMode ? ['dark','light'] : ['light','dark'];

    localStorage.setItem('scheme',scheme[1]);

    if(!document.startViewTransition){
        document.documentElement.classList.replace(scheme[0],scheme[1]);
        return;
    }
    document.startViewTransition(()=>{
        document.documentElement.classList.replace(scheme[0],scheme[1]);
    })
}

const colorScheme = localStorage.getItem('scheme')

if(colorScheme){
    document.documentElement.classList.add(colorScheme)
}else{
    const COLOR_SCHEME = window.matchMedia('(prefers-color-scheme: dark)');
    
    document.documentElement.classList.add(COLOR_SCHEME.matches ? 'dark' : 'light');
    
    COLOR_SCHEME.addEventListener('change',TOGGLE_DARK_LIGHT);
}

DARK_LIGHT_BUTTON.addEventListener('click',TOGGLE_DARK_LIGHT);

// ----------------------- DARK LIGHT END -----------------------





// ----------------------- CONFIG ----------------------

const CONFIG_BUTTON = document.querySelector('.header__options__config');

CONFIG_BUTTON.addEventListener('click', ()=>{

})

// ----------------------- CONFIG END ----------------------

// ----------------------- HEADER END ----------------------





// ----------------------- MAIN -----------------------

const HOUR_CONTAINER = document.querySelector('.main__time');
const DATE_CONTAINER = document.querySelector('.main__date');
const HOUR_AM_PM = document.querySelector('.main__date__am-pm');

let hour12;

const HOUR_FORMAT = new Intl.DateTimeFormat('es-ES',{
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12
}) 
const DATE_FORMAT = new Intl.DateTimeFormat('es-ES',{
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
})


const UPDATE_DATE = ()=>{
    const DATE = new Date();
    HOUR_CONTAINER.textContent = HOUR_FORMAT.format(DATE).slice(0,11) + HOUR_FORMAT.format(DATE).slice(12);
    DATE_CONTAINER.textContent = DATE_FORMAT.format(DATE);
    console.log(HOUR_FORMAT.format(DATE))
}

UPDATE_DATE();
setInterval(UPDATE_DATE,1000);