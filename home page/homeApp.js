// fetch api youtube
// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=quiz&key=AIzaSyCf-zK2wWIBHVlSvXZRfpYHYjzcW7Mqn0U
let youtubeContainer = document.querySelector(".youtubeContainer");
let search = `html css js quiz`
let htmlButton = document.querySelector(".HTML")
let cssButton = document.querySelector(".CSS")
let jsButton = document.querySelector(".JS")

console.log(youtubeContainer)
// fetchYoutubeVideo(search);
function fetchYoutubeVideo(search) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${search}&key=AIzaSyBx66h7lf4-GtFHkQTFIUuKbiwF6ucbMnM`)
        .then(response => {
            console.log("entered res")// debug
            if (!response.ok)
                throw Error(` response error : ${response.status}`)
            return response.json()
        }).then(data => {
            console.log("entered data")// debug
            console.log(data.items[0])// debug
            // console.log(data.items[0].snippet.title)// debug
            // console.log(data.items[0].snippet.description)// debug
            createYoutubeVideo(data.items[0])
        }).
        catch(err => {
            console.log(`Error : ${err}`)
        })
}
function createYoutubeVideo(data) {
    console.log("entered create")// debug
    // console.log(data.items.snippet.title)// debug
    // console.log(data.items.snippet.description)// debug
    let newVideo = document.createElement("div")
    newVideo.innerHTML = `
   <a href="https://www.youtube.com/watch?v=${data.id.videoId}" target="_blank">
            <img class="youtubeVideo" src="${data.snippet.thumbnails.high.url}" alt="Video Thumbnail">
        </a>
          <p class="videoTitle">${data.snippet.title}</p>
          <p class="videoDesc">
            ${data.snippet.description}
            
          </p>
    `
    youtubeContainer.appendChild(newVideo)
    console.log("entered created")// debug
}
// ${data.items.snippet.thumbnails.default.url}

htmlButton.addEventListener("click", () => {
  if(sessionStorage.getItem("id") && sessionStorage.getItem("name")){
    console.log("hi")
    localStorage.setItem("url", "htmlQus.json");
    window.location = "../quiz/quiz.html";
  }else{window.location = "../register/register.html"}
  
    
});
cssButton.addEventListener("click", () => {
  if(sessionStorage.getItem("id") && sessionStorage.getItem("name")){
    localStorage.setItem("url", "cssQus.json");
    window.location = "../quiz/quiz.html";
  }else{window.location = "../register/register.html"}
  
  
});
jsButton.addEventListener("click", () => {
  if(sessionStorage.getItem("id") && sessionStorage.getItem("name")){
    localStorage.setItem("url", "jsQus.json");
    window.location = "../quiz/quiz.html";
  }else{window.location = "../register/register.html"}
  
  
});


// cards animation
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target); // To ensure the animation runs only once
            }
        });
    });

    document.querySelectorAll('#entryAnimation').forEach(element => {
        observer.observe(element);
    });
    if (sessionStorage.getItem("id") && sessionStorage.getItem("name")) {
      document.querySelector("#loginLogout").textContent = "Log Out";
      document.querySelector("#loginLogout").addEventListener("click", () => {
        sessionStorage.clear();
        location.reload();
      });
    } else {
      document.querySelector("#loginLogout").textContent = "Log In";
      document.querySelector("#loginLogout").addEventListener("click", () => {
        window.location = "../register/register.html";
      });
    }
});
