var urlParams = new URLSearchParams(location.search);
var userId = urlParams.get('user')-1
var ogUserId = userId + 1

function ajax(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('load', function(evt) {
      if(this.status === 200) {
        console.log(this.responseText)
        resolve(this.responseText)
      } else {
        reject('There was a network error')
      }
    })
    xhr.open('GET', url)
    xhr.send()
  })
}

window.onload = function() {
  ajax('https://jsonplaceholder.typicode.com/users')
  .then(res => {
    let users = JSON.parse(res).slice(0,10)
    let header = document.getElementById('name')
    let main = document.getElementById('about')
    
    let promises = []
    
    promises.push(ajax('https://jsonplaceholder.typicode.com/posts?userId='+ogUserId))
    let d = document.createElement('div')
    d.setAttribute('data-id', users[userId].id)

    let username = document.createElement('h2')
    let name = document.createElement('span')
    let email = document.createElement('p')
    let address = document.createElement('p')
    let phone = document.createElement('p')
    let website = document.createElement('p')
    let company = document.createElement('p')

    console.log("user", users[userId].name)

    name.innerText = users[userId].name
    username.innerText = users[userId].username
    email.innerText = users[userId].email
    address.innerText = users[userId].address.street + ", " + users[userId].address.suite + ", " + users[userId].address.city + ", " + users[userId].address.zipcode  
    phone.innerText = users[userId].phone
    website.innerText = users[userId].website
    company.innerText = users[userId].company.name


    let textStyle = 'margin: 0'
    name.setAttribute('style', textStyle)
    username.setAttribute('style', textStyle)

    d.appendChild(username)
    d.appendChild(email)
    d.appendChild(address)
    d.appendChild(phone)
    d.appendChild(website)
    d.appendChild(company)
    d.setAttribute('style', 'border: solid 1px black; padding: 1em')
    header.appendChild(name)
    main.appendChild(d)
    
    let pro_crumb = document.getElementById('profile-name')
    pro_crumb.innerText = users[userId].name

    return Promise.all(promises)
  
  })
  .then(posts => {
    posts.forEach(post_list => {
      post_list = JSON.parse(post_list).slice(0,10)
      
      
      
      let div = document.getElementById('posts')
      let list = document.createElement('ol')
      post_list.forEach(post => {
        let li = document.createElement('li')
        let a = document.createElement('a')
        
        a.innerText = post.title
        
        console.log("new", userId)
        console.log("og", ogUserId)
        console.log("post_id", post.id)
        var link = "./post.html?user=" + ogUserId + "&post=" + post.id;
        a.setAttribute("href", link);
        a.setAttribute("id", "post");
        
        li.appendChild(a)

        list.appendChild(li)
      })
      div.appendChild(list)
    })
  })
  .catch(err => { console.log(err) })
}


