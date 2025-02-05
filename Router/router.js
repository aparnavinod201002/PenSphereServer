const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const postController = require('../Controller/postController')
const commentController = require('../Controller/commentController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')

const multerConfig = require('../Middleware/multerMiddleware')
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/addPosts',jwtMiddleware,multerConfig.single('postImage'),postController.addPost)
router.get('/publicPosts',postController.getPublicPosts)
router.get('/myposts',jwtMiddleware,postController.getMyPosts)
router.post('/addcomments',jwtMiddleware,commentController.addComment)
router.get('/comments/:postId',commentController.getComments)
router.get('/user',jwtMiddleware,userController.getUser)
router.delete('/posts/remove/:id',jwtMiddleware,postController.deletePost)
router.put('/posts/edit/:id',jwtMiddleware,multerConfig.single('postImage'),postController.editPost)


module.exports = router

