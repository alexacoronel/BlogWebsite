var urlParams = new URLSearchParams(location.search);
var userId = urlParams.get('user')
var postId = urlParams.get('post')

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
    
    promises.push(ajax('https://jsonplaceholder.typicode.com/posts?userId='+userId))
    let d = document.createElement('div')
    d.setAttribute('data-id', users[userId].id)

    let username = document.createElement('h2')
    let name = document.createElement('span')
    let email = document.createElement('p')
    let address = document.createElement('p')
    let phone = document.createElement('p')
    let website = document.createElement('p')
    let company = document.createElement('p')

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
    
    let pro_crumb = document.getElementById('profile-name')
    pro_crumb.innerText = users[userId-1].name

    return Promise.all(promises)
  
  })
  .then(posts => {
    posts.forEach(post_list => {
      post_list = JSON.parse(post_list).slice(0,10)
      
      let title = document.getElementById('post-title')
      let div = document.getElementById('post-text')
      
      let post_crumb = document.getElementById('post-title-c')
      
      
      post_list.forEach(post => {
        if(post.id==postId){
          title.innerText = post.title
          div.innerText = post.body
          post_crumb.innerText = post.title
        }       
       
      })

    })
  })
  .catch(err => { console.log(err) })
}


