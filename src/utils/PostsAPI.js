export const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';

const headers = {
  headers: { Authorization: "whatever-you-want" },
  // credentials: "include"
}

export const getAllPosts = () =>
    fetch(`${api}/posts`, headers)
		.then(res =>  res.text() )
		.then(res => JSON.parse(res))
		//.then(res => console.log("getallposts: ", res, typeof(res)))


export const getAllCategories = () =>
	fetch(`${api}/categories`, headers)
		.then(res => res.text() )
		.then(res => JSON.parse(res))
	  	.then(res => res['categories'])



export const getComments = (postid) =>
  fetch(`${api}/posts/${postid}/comments`, headers)
    .then(res => res.text() )
    .then(res => JSON.parse(res))
      .then(res => Object.values(res))


function swapPostsKeys(posts) {
    Object.keys(posts).forEach(function(key, index) {
    let newKey = posts[key].id
    posts[newKey] = posts[key]
    delete posts[key]
   })
  return posts
}

export function getInitialData () {
        return Promise.all([
          getAllPosts(),
          getAllCategories(),
        ]).then(([posts, categories]) => ({
          posts: swapPostsKeys(posts),
          categories,
        }))
}

export function savePost(post) {
    console.log("PostAPI: savePost id ", post.id)
    console.log("PostAPI and the full post is ", post)

    return Promise.all([

    fetch(`${api}/posts`, {
      method: 'POST',
      headers: { Authorization: "whatever-you-want",
                'Content-Type': 'application/json' },
      body: JSON.stringify({            // or post[post.id]
          id: post.id,
          timestamp: post.timestamp,
          title: post.title,
          body: post.body,
          author: post.author,
          category: post.category
        })
    })
  ])
}

export function savePostEdits(post) {
  return Promise.all([

  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: { Authorization: "whatever-you-want",
              'Content-Type': 'application/json' },
    body: JSON.stringify({            // or post[post.id]
        title: post.title,
        body: post.body
      })
  })
])
}


function getOption(plusMinus) {

  if (plusMinus === 1) {
    return 'upVote'
  }
  else if (plusMinus === -1) {
    return 'downVote'
  }

}


export function saveVote(postid, plusMinus) {
  console.log("PostsAPI: saveVote ", postid)

  let vote = getOption(plusMinus)

  return Promise.all([

  fetch(`${api}/posts/${postid}`, {
    method: 'POST',
    headers: { Authorization: "whatever-you-want",
              'Content-Type': 'application/json' },
    body: JSON.stringify({
        option: vote
      })
    })
  ])

}

export function sDeletePost(postid) {

  return Promise.all([

  fetch(`${api}/posts/${postid}`, {
    method: 'DELETE',
    headers: { Authorization: "whatever-you-want",
              'Content-Type': 'application/json' }
    })
  ])

}

export function saveComment(comment) {
    console.log("PostAPI: saveComment id ", comment.id)
    console.log("PostAPI and the full comment is ", comment)

    return Promise.all([

    fetch(`${api}/comments`, {
      method: 'POST',
      headers: { Authorization: "whatever-you-want",
                'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    })
  ])
}

export function saveCommentVote(commentId, plusMinus) {
  console.log("PostsAPI: commentVote ", commentId)

  let vote = getOption(plusMinus)

  return Promise.all([

  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: { Authorization: "whatever-you-want",
              'Content-Type': 'application/json' },
    body: JSON.stringify({
        option: vote
      })
    })
  ])

}

export function saveCommentEdits(comment) {
  console.log("save comment edits", comment)
  return Promise.all([

  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: { Authorization: "whatever-you-want",
              'Content-Type': 'application/json' },
    body: JSON.stringify({
              timestamp: comment.timestamp,
              body: comment.body
    })
  })
])
}

export function deleteComment(commentid) {

  return Promise.all([

  fetch(`${api}/comments/${commentid}`, {
    method: 'DELETE',
    headers: { Authorization: "whatever-you-want",
              'Content-Type': 'application/json' }
    })
  ])

}
      /*  ** outside the workspace, do not include credentials

        componentDidMount() {
          const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001';
          const url = `${api}/categories`;
          console.log('fetching from url', url);
          fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
            .then( (res) => { return(res.text()) })
            .then((data) => {
              this.setState({backend:data});
            });
        }
        */
