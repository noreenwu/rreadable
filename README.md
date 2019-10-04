# Project: Readable
# Noreen Wu
# Udacity React: October 2019

# Overview

## Installation


## Implementation Notes


## Required Files

index.js - creates the Redux store and wraps the app in Provider (for Redux) and BrowserRouter for routing

App.js - defines all the Routes and loads the initial data (posts and categories)

components/CategoryNav - contains navigation to the Dashboard by category (all, redux, react, udacity),
    and is included in each view


components/Comment.js - renders a comment when passed comment and post info from PostDetail. Comment
    is not connected through Redux. Comment contains links to up- and downVote a comment, and to
    edit and delete a comment. Voting does not make changes in Redux but updates the server via PostsAPI.


component/CreatePost.js - allows the user to create a new post. Input fields include author, title of post,
    and body of post. A dropdown allows the user to categorize the post, but if CreatePost was invoked
    (button clicked) from a category listing, then by default that category will be selected (but can be changed).

component/Dashboard.js - renders all the listing views: for example, all posts, redux posts, react posts, udacity posts.
    Allows any view to be sorted by either timestamp or score


component/EditComment.js -


component/EditPost.js - Allows a post to be edited. EditPost is invoked from the PostTitle component, via a Link which
   includes the current post as the starting state. EditPost utilizes componentDidMount to pick up this state, so
   that the input fields are populated with the original post's information, for editing.


component/NewComment.js -  a button to create a new comment appears at the bottom of the PostDetail page; if other
   comments are present for the post, it appears below them. NewComment provides the user with 2 input fields:
   author and comment (body). It obtains the post information (its parent) from Link on the PostDetail page, and
   uses this info, both to display some context for the new comment and also as part of the server request to add
   the comment. The new comment id and timestamp are generated by helper functions, and the parentId is the id of the post
   that this comment is associated with.

component/PostBody.js - this stateless functional component renders the body of a post. This allows the post header
   and title information to be rendered separately from the body in different views, without the body.

component/PostDetail.js - when the user clicks on a post title from one of the listing views, s/he is taken to
   the PostDetail page. The full content of the post is displayed here, along with any associated comments. The
   comments don't live in the Redux store, but are pulled from the server each time PostDetail is rendered.


component/PostHeader.js - this renders for a specific post the post's category, author, date posted and comment count.
   The correct comment count is supplied by the server, based on the number of comments associated with the post.


component/PostListItem.js - Dashboard calls PostListItem for each post on its current list. PostListItem renders
    PostHeader and PostTitle for these listings.


component/PostTitle.js - renders the title of the specific post that the user had entered. Contains links to the
    post functions for up and downVoting, editing and deleting, passing along the necessary post information
    and dispatching actions for saving changes in Redux and also issuing server functions to save changes
    (for deleting the post and voting). This component also needs to compute the pathname of the view that is shown
    following these actions, so that deleting a post, for example, brings the user back to the appropriate category
    listing page, or editing a post navigates to the EditPost page.
