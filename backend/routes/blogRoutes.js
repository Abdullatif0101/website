const express = require('express');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, authorize('admin'), createBlog);

router.route('/:id')
    .put(protect, authorize('admin'), updateBlog)
    .delete(protect, authorize('admin'), deleteBlog);

// Get single blog by slug (separate endpoint pattern to avoid conflicting with /:id)
router.get('/slug/:slug', getBlog);

module.exports = router;
