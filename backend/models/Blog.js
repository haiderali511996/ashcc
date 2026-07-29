const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    excerpt: { type: String, trim: true, maxlength: 300 },
    content: { type: String, required: true },
    coverImage: { type: String, default: '' },
    category: { type: String, trim: true, default: 'General' },
    tags: [{ type: String, trim: true }],
    author: { type: String, trim: true, default: 'Al Sadiq Health Care Centre' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
    metaTitle: { type: String, trim: true, maxlength: 70 },
    metaDescription: { type: String, trim: true, maxlength: 160 },
  },
  { timestamps: true }
);

blogSchema.pre('validate', function generateSlug(next) {
  // Only auto-generate a slug when one hasn't been explicitly set (e.g. by a seed
  // script or admin form) — isModified('title') is always true on a brand-new
  // document, so checking that alone would silently overwrite an explicit slug.
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Date.now().toString(36);
  }
  next();
});

blogSchema.pre('save', function setPublishedAt(next) {
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
