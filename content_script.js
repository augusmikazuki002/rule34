let arr = [];
let link = document.location.href;

try {
  if (
    (link.indexOf("id=") == -1 ||
      link.indexOf("id=") == "-1" ||
      link.indexOf("pid=") != -1 ||
      link.indexOf("pid=") != "-1") &&
    (link.indexOf("page=post") != -1 || link.indexOf("page=post") != "-1")
  ) {
    pic = document.getElementsByClassName("thumb");
    for (let i = 0; i < pic.length; i++) {
      arr[i] = pic.item(i).id;
    }
    chrome.storage.local.set({ key: arr, link: link }).then(() => {
      console.log("Value is set");
    });
    chrome.storage.local.set({ link: link }).then(() => {
      console.log("Value is set");
    });
  } else {
    chrome.storage.local.get(["key"]).then((result) => {
      arr = result.key;

      let pic_id = link.slice(link.indexOf("id=") + 3);
      let pic_index = arr.indexOf("s" + pic_id);

      console.log(arr);
      const content = document.getElementsByClassName("flexi")[0];
      // if (content === undefined)
      //   content = document.getElementById("fit-to-screen");

      const next = document.createElement("a");
      next.innerHTML = " Next ";
      pic_index + 1 >= arr.length
        ? (next.href = "#")
        : (next.href =
            "https://rule34.xxx/index.php?page=post&s=view&id=" +
            arr[pic_index + 1].substring(1));

      const back = document.createElement("a");
      back.innerHTML = " Back ";
      pic_index > 0
        ? (back.href =
            "https://rule34.xxx/index.php?page=post&s=view&id=" +
            arr[pic_index - 1].substring(1))
        : (back.href = "#");
      next.style.padding = "5px";
      back.style.padding = "5px";
      content.appendChild(back);
      content.appendChild(next);

      // Add event listener for 'D' key press
      document.addEventListener('keydown', function(event) {
        if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
          // Simulate a click event on the next button
          if (pic_index + 1 < arr.length) {
            window.location.href = next.href;
          }
        }
        else if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
          // Simulate a click event on the back button
          if (pic_index > 0) {
            window.location.href = back.href;
          }
        }
        else if (event.key === 'w' || event.key === 'W') {
          window.scrollBy(0,-50);
        }
        else if (event.key === 's' || event.key === 'S') {
          window.scrollBy(0,50);
        }
        }
      });
    });
  }
} catch (err) {
  console.log(`something went wrong ${err}`);
}
