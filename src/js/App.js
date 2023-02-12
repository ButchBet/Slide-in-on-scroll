const images = Array.from(document.getElementsByTagName("img"));

// Function that will let us to delay the call of the checkScroll function when user scroll, this to don't over do the calculation and desition many times
// To understand it, please vivist this StackOverflow documentation page: https://stackoverflow.com/questions/24004791/what-is-the-debounce-function-in-javascript
function debounce(func, delay = 20, immediate = true) {
    let timeout;

    return function() {
        let context = this, args = arguments;

        let later = function() {
            timeout = null;

            
            if(!immediate) {
                // console.log("From immediate: ",context, args);
                func.apply(context, args);
            };
        };

        let callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, delay);

        if(callNow) {
            // console.log("From call now: ",context, args);
            func.apply(context, args);
        };
    };
}


function checkScroll() {
    images.forEach((image) => {
        // Get the user position 
        const scrollInAt = (window.scrollY + window.innerHeight)/* - (image.height / 2) */;
        
        // Get the image bottom position
        const imageBottom = image.offsetTop + image.height; 

        // Check if the user position is greater than the image top
        const isShown = scrollInAt > image.offsetTop;

        // Check if the user potion is less that the image bottom
        const isNotPast = window.scrollY < imageBottom;

        // Validate previous position
        if(isShown && isNotPast) {
            image.classList.add("active");
        } else {
            image.classList.remove("active");
        }
    })
}

window.addEventListener("scroll", checkScroll);

// Calling function because we might have one image at the begining of the page
checkScroll();