function ajax(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(evt) {
      if (this.status === 200) {
        resolve(this.responseText);
      } else {
        reject("There was a network error");
      }
    });
    xhr.open("GET", url);
    xhr.send();
  });
}

window.onload = function() {
  ajax("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      let users = JSON.parse(res).slice(0, 10);
      let main = document.querySelector("main");
      let promises = [];
      users.forEach(user => {
        promises.push(
          ajax("https://jsonplaceholder.typicode.com/posts?userId=" + user.id)
        );
        let d = document.getElementById("usr-container");
        d.setAttribute("data-id", user.id);
        let username = document.createElement("h2");
        let div = document.createElement("div");
        let name = document.createElement("a");

        name.innerText = user.name;
        username.innerText = user.username;

        let textStyle = "padding:20px; font-size: 2em;";
        div.setAttribute("style", textStyle);
        name.setAttribute("id", "user");

        var link = "./profile.html?user=" + user.id;
        name.setAttribute("href", link);

        username.setAttribute("style", textStyle);
        div.appendChild(name);
        d.appendChild(div);
        // d.setAttribute('style', 'border: solid 1px black; padding: 1em')
        main.appendChild(d);
      });
      return Promise.all(promises);
    })
    .then(posts => {
      posts.forEach(post_list => {
        post_list = JSON.parse(post_list).slice(0, 10);
        let div1 = document.querySelector(`[data-id="${post_list[0].userId}"]`);
        let list = document.createElement("ul");
        post_list.forEach(post => {
          let li = document.createElement("li");
          li.innerText = post.title;
          list.appendChild(li);
        });
        //     div.appendChild(list)
      });
    })
    .catch(err => {
      console.log(err);
    });
};
