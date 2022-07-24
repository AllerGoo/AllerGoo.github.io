gsap.registerPlugin(ScrollTrigger);

const pageContainer = document.querySelector(".container");

/* SMOOTH SCROLL */
const locoScroll = new LocomotiveScroll({
el: document.querySelector(".smooth-scroll"),
smooth: true,
lerp: 0.08,
});

locoScroll.on("scroll", ScrollTrigger.update);

//smooth scroll
ScrollTrigger.scrollerProxy(".smooth-scroll", {
scrollTop(value) {
    return arguments.length
    ? locoScroll.scrollTo(value, 0, 0)
    : locoScroll.scroll.instance.scroll.y;
},

getBoundingClientRect() {
    return {
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    };
},

pinType: document.querySelector(".smooth-scroll").style.transform
    ? "transform"
    : "fixed",
});

const vw = (coef) => window.innerWidth * (coef / 100);
const vh = (coef) => window.innerHeight * (coef / 100);

const heroScroller = gsap.timeline({
paused: true,
scrollTrigger: {
    trigger: ".hero-header.h-1",
    scroller: ".smooth-scroll",
    pin: ".pin-wrapper",
    start: "top 10%",
    scrub: true,
    end: `${vh(100)}`,
},
});

heroScroller
.to(
    [".hero-header.h-1", ".hero-header.h-3"],
    {
    scale: 2,
    y: vh(150),
    xPercent: -150,
    },
    "heroScroll"
)
.to(
    ".hero-header.h-2",
    {
    scale: 2,
    y: vh(150),
    xPercent: 150,
    },
    "heroScroll"
)
.to(
    "#heroImage",
    {
    scaleY: 2.5,
    },
    "heroScroll"
)
.to(
    "#heroImage .image",
    {
    scaleX: 2.5,
    xPercent: 50,
    },
    "heroScroll"
);

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();



//Project/product Page code starts here

const colourCards = document.querySelectorAll(".card")

function green2(){
    document.body.classList.remove('cream', 'green1', 'yellow');
    document.body.classList.toggle('green2');
}

function green1(){
    document.body.classList.remove('green2', 'cream', 'yellow');
    document.body.classList.toggle('green1');
}

function cream(){
    document.body.classList.remove('green2', 'green1', 'yellow');
    document.body.classList.toggle('cream');
}

function yellow(){
    document.body.classList.remove('green2', 'green1', 'cream');
    document.body.classList.toggle('yellow');
}

























//Upload Page javascript
var dropzone = new Dropzone('#uploadform', {
    previewTemplate: document.querySelector('#preview-template').innerHTML,
    parallelUploads: 2,
    thumbnailHeight: 120,
    thumbnailWidth: 120,
    maxFilesize: 3,
    filesizeBase: 1000,
    thumbnail: function(file, dataUrl) {
      if (file.previewElement) {
        file.previewElement.classList.remove("dz-file-preview");
        var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
        for (var i = 0; i < images.length; i++) {
          var thumbnailElement = images[i];
          thumbnailElement.alt = file.name;
          thumbnailElement.src = dataUrl;
        }
        setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
      }
    }
  
});
  
  
// Now fake the file upload, since GitHub does not handle file uploads
// and returns a 404

var minSteps = 6,
    maxSteps = 60,
    timeBetweenSteps = 100,
    bytesPerStep = 100000;

dropzone.uploadFiles = function(files) {
var self = this;

    for (var i = 0; i < files.length; i++) {

        var file = files[i];
        totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

        for (var step = 0; step < totalSteps; step++) {
        var duration = timeBetweenSteps * (step + 1);
        setTimeout(function(file, totalSteps, step) {
            return function() {
            file.upload = {
                progress: 100 * (step + 1) / totalSteps,
                total: file.size,
                bytesSent: (step + 1) * file.size / totalSteps
            };

            self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
            if (file.upload.progress == 100) {
                file.status = Dropzone.SUCCESS;
                self.emit("success", file, 'success', null);
                self.emit("complete", file);
                self.processQueue();
                //document.getElementsByClassName("dz-success-mark").style.opacity = "1";
            }
            };
        }(file, totalSteps, step), duration);
        }
    }
}

























