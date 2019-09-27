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
