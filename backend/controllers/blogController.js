const Blog = require('../models/Blog');

async function listPublic(req, res) {
  const { category, tag, search, page = 1, limit = 9 } = req.query;
  const query = { status: 'published' };
  if (category) query.category = category;
  if (tag) query.tags = tag;
  if (search) query.title = { $regex: search, $options: 'i' };

  const skip = (Number(page) - 1) * Number(limit);
  const [blogs, total] = await Promise.all([
    Blog.find(query).sort({ publishedAt: -1 }).skip(skip).limit(Number(limit)),
    Blog.countDocuments(query),
  ]);
  res.json({ blogs, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
}

async function getBySlug(req, res) {
  const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' });
  if (!blog) return res.status(404).json({ message: 'Blog post not found' });
  res.json(blog);
}

async function listAdmin(req, res) {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
}

async function getOneAdmin(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog post not found' });
  res.json(blog);
}

async function create(req, res) {
  const payload = { ...req.body };
  if (req.file) payload.coverImage = `/uploads/blogs/${req.file.filename}`;
  if (typeof payload.tags === 'string') {
    payload.tags = payload.tags.split(',').map((t) => t.trim()).filter(Boolean);
  }
  const blog = await Blog.create(payload);
  res.status(201).json(blog);
}

async function update(req, res) {
  const payload = { ...req.body };
  if (req.file) payload.coverImage = `/uploads/blogs/${req.file.filename}`;
  if (typeof payload.tags === 'string') {
    payload.tags = payload.tags.split(',').map((t) => t.trim()).filter(Boolean);
  }
  const blog = await Blog.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });
  if (!blog) return res.status(404).json({ message: 'Blog post not found' });
  res.json(blog);
}

async function remove(req, res) {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog post not found' });
  res.json({ message: 'Blog post deleted' });
}

module.exports = { listPublic, getBySlug, listAdmin, getOneAdmin, create, update, remove };
