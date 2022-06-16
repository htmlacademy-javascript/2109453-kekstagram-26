import { createPost } from './data.js';
import { POST_NUMBER } from './setup.js';
const randomPosts = () => Array.from({ length: POST_NUMBER }, createPost);
randomPosts();
