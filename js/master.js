//check if there's local storage color option
let mainColors = localStorage.getItem("color-option");

if(mainColors !== null){
    //console.log("local storage is not empty you can set it on root now");
    //console.log(localStorage.getItem("color-option"));
    document.documentElement.style.setProperty('--main-color', mainColors);

     //Remove active class from all children
        document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        //add active class on element with data-color === local storage item
        if(element.dataset.color === mainColors){
            element.classList.add("active");
        }
    });
    
}
//variable to control the background interval 
let backgroundInterval;
//random background option 
let backgroundOption = true;
backgroundLocalItem = localStorage.getItem("background_option");
//check if there is local storage random background item 

//check if random background local storage is not empty
if(backgroundLocalItem !== null){
    
    console.log(typeof(backgroundLocalItem)); //string
    if(backgroundLocalItem==='true'){
        backgroundOption=true;
    }
    else{
        backgroundOption=false;
    }
    //remove active from all spans
    
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });

    if(backgroundLocalItem === 'true'){
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }else{
        document.querySelector(".random-backgrounds .no").classList.add("active"); //dernaha psq ki par exemple localStorage rahi false w derna actualiser lel la page active ma tkonch fl class ta3 no
    }
    
}

//Toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function() {
    //toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");
    
    //toggle class open on main settings box
    document.querySelector(".settings-box").classList.toggle("open");
};

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
// loop on all list of items of colors
colorsLi.forEach(li => {
    // click on every list items of colors
    li.addEventListener("click",(e) => {

        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        //set color on lacal storage
        localStorage.setItem("color-option" , e.target.dataset.color);

        handleActive(e);

    });

});

//switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// loop on all spans
randomBackEl.forEach(span => {
    // click on every span
    span.addEventListener("click",(e) => {

        handleActive(e);

        if(e.target.dataset.background === 'yes'){
            backgroundOption=true;
            randomizeImgs();
            localStorage.setItem("background_option",true);
        }
        else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option",false);
        }

    });

});

//select landing page element
let landingPage = document.querySelector(".landing-page");

//get array of imgs //biha tekhtar ay photo 3echwa2iya li moda mo3ayana ta3 background
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];

//change background image url


//function to randomize imgs
function randomizeImgs(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            //console.log(imgsArray.length);
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        } , 1000);
    }

}
randomizeImgs();



//select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
    // get skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop; //offsetTop hiya div ta3 skills chhal rahi mhewda te7t, ye3ni chhal kayn massafa bin a3la no9ta fl skills w bin top ta3 la page yetbedel ida bedelna agrandir ta3 lbrowser  w ki tdir zoom lelbrowser
    this.console.log(skillsOffsetTop); //this hna hiya lwindow

    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight; //offsetHeight hiya div ta3 skills chhal fiha tol 
    this.console.log(skillsOuterHeight);
    
    //window Height
    let windowHeight = this.innerHeight; //innerHeight hiya tol ta3 lheight li f la page, yetbedel ida bedelna agrandir ta3 lbrowser w ki tdir zoom lelbrowser
    this.console.log(windowHeight); //windowHeight IS THE HEART OF THE WINDOW nrmlment hada howa te3rif li nichan

    //window ScrollTop
    let windowScrollTop = this.pageYOffset; //tol ta3 scroll flbrowser
    this.console.log(windowScrollTop);

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight )){
        //this.console.log("skills section reached");

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

//Create popup with the image 
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener('click' , (e) => {
        //create overlay element
        let overlay = document.createElement("div");

        //add class to overlay
        overlay.className = 'popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay);

        //Create the popup box
        let popupBox = document.createElement("div");

        //Add class to the popup box
        popupBox.classList = 'popup-box';

        //Create alt image
        if(img.alt !== null){
            //Create heading
            let imgHeading = document.createElement("h3");     

            //Create text for heading
            let imgText = document.createTextNode(img.alt);

            //Append the text to the heading
            imgHeading.appendChild(imgText);

            //Append the heading to the popup box
            popupBox.appendChild(imgHeading);
            
            
        }

        //Create the image
        let popupImage = document.createElement("img");

        //Set image source
        popupImage.src = img.src;

        //Add image to popup box
        popupBox.appendChild(popupImage);

        //Append the popup box to body
        document.body.appendChild(popupBox);
        // Create the close span
        let closeButton = document.createElement("span");
        
        //create the close button text
        let closeButtonText = document.createTextNode("X");
        //Append text to close button
        closeButton.appendChild(closeButtonText);

        //Add class to close button
        closeButton.className = 'close-button';

        //Add close button to the popup box
        popupBox.appendChild(closeButton);
    });
});
//Close popup
document.addEventListener("click", function(e){
    
    if(e.target.className == 'close-button'){

        //Remove the current popup
        e.target.parentNode.remove();
        
        //Remove overlay
        document.querySelector(".popup-overlay").remove();
        
        
    }
});

//Select all links
const allLinks = document.querySelectorAll(".links a");
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
function scrollToSomeWhere(elements){
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault(); //rana dayrin fl index.html href="#" tsema ki nekliko flien yedina lel #, bach negel3oha derna perventDefault 
            document.querySelector(e.target.dataset.section).scrollIntoView({ //dakhel queryselector lazem tkon class unique 3labiha zedna data-section fl index.html
                behavior: 'smooth'
            });
        });
    });
}
scrollToSomeWhere(allLinks);
scrollToSomeWhere(allBullets);
//Handle active state
function handleActive(ev){
    //Remove active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    //add active class on self
    ev.target.classList.add("active");
}


let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");
if(bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.toggle("active"); //ki nebgho ndiro add toggle remove lclass neste3lo classList
    }
    else{
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.toggle("active");
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets-option",'block');
        }
        else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets-option",'none');
        }
        handleActive(e);
    });
});

//Reset Button(localStorage)
document.querySelector(".reset-options").onclick = function(){
    //localStorage.clear(); //ki tebghi tem7i ga3 les localStorage
    localStorage.removeItem("color-option"); // hna ki tebghi t7eded localStorage li baghi tem7ih
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option");

    //Reload window
    window.location.reload();
};

//Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function(e) {
    e.stopPropagation(); //t7ewes 3la cher7 ta3ha chof te7t
    //Toggle class menu-active on button
    this.classList.toggle("menu-active");
    //Toggle class "open" on links
    tLinks.classList.toggle("open");
}; 
//Click anywhere outside meenu and toggle button 
document.addEventListener("click", (e) => {
    if(e.target !== toggleBtn && e.target !==tLinks){
    //console.log("This is not the button");//ki ndiro zoom(400% par exemple) lel browser des fois tesra 7aja bizzard w li hiya ki teclicki 3la toggle-menu tetafficha This is not the button w .links ma tekhdemch hadi tetsama propagation jaya mel propaganda bach negel3oha chof lfog
    //console.log("This is not the button and not the menu"); //ki tedrok mjihet el itar ta3 .links ma tetaffichach bsh ki tweli tedrok dakhel tweli tetafficha psq ki gotleh e.target !==document.querySelector(".links"); ye7seb gotleh ghi .links brk li li fiha ma y3edhomch bach n7elo hada prblm ndiro stopPropagation chof te7t
    
    //Check if menu is open
    if(tLinks.classList.contains("open")){//si tLinks contient open
        //console.log("menu is open");
         //Toggle class menu-active on button
         toggleBtn.classList.toggle("menu-active");
    //Toggle class "open" on links
    tLinks.classList.toggle("open");
    }
}
});
//stop propagation on menu
tLinks.onclick = function(e){
    e.stopPropagation();
}
/*
document.querySelector(".toggle-menu").onclick = function() {
    fenetre = document.querySelector(".header-area .links").classList.toggle("open");
   
    document.querySelector(".header-area .toggle-menu").style.setProperty('--beforeBack','block');
    
  
        document.querySelector(".header-area .toggle-menu").style.setProperty('--beforeBack','none');
    
}; 
*/

//document.querySelector(".bullets-option span .yes") mkach mnha la correcte insertion est: document.querySelector(".bullets-option .yes")

//la fonction hiya lewla puis la class active