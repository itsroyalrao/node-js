const posts = [];

function createPost1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = { title: 'POST1' };
      posts.push(post);
      resolve(post);
    }, 1000)
  })
}

function createPost2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = { title: 'POST2' };
      posts.push(post);
      resolve(post);
    }, 1000)
  })
}

function createPost3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = { title: 'POST3' };
      posts.push(post);
      resolve(post);
    }, 1000)
  })
}

function createPost4() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = { title: 'POS4' };
      posts.push(post);
      resolve(post);
    }, 1000)
  })
}

function updateLastUserActivityTime() {
  return new Promise((res, rej) => setTimeout(() => {
    const activity = { lastActivity: new Date().getTime() };
    posts.push(activity);
    res(activity);
  }, 1000))
}

function deletePost() {
  return new Promise((res, rej) => setTimeout(() => {
    if (posts.length > 0) {
      posts.pop();
      posts.pop();
      res();
    } else {
      rej('ERROR: ARRAY IS EMPTY');
    }
  }, 1000))
}

createPost1().then(val => console.log(val.title))
.then(updateLastUserActivityTime).then(act => console.log(act.lastActivity))
.then(createPost2).then(val => console.log(val.title))
.then(updateLastUserActivityTime).then(act => console.log(act.lastActivity))
.then(createPost3).then(val => console.log(val.title))
.then(updateLastUserActivityTime).then(act => console.log(act.lastActivity))
.then(createPost4).then(val => console.log(val.title))
.then(updateLastUserActivityTime).then(act => console.log(act.lastActivity))
.then(deletePost)
.then(createPost1).then(val => console.log(val.title))
.then(updateLastUserActivityTime).then(act => console.log(act.lastActivity))
.then(createPost2).then(val => console.log(val.title))
.then(updateLastUserActivityTime).then(act => console.log(act.lastActivity))
.then(createPost3).then(val => console.log(val.title))
.then(updateLastUserActivityTime).then(act => console.log(act.lastActivity));