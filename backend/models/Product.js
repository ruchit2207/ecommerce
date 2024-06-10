import mongoose from 'mongoose'
const Schema = mongoose.Schema

const dimensionSchema = new Schema({
  width: Number,
  height: Number,
  depth: Number
})

const reviewSchema = new Schema({
  rating: Number,
  comment: String,
  date: Date,
  reviewer: String
})

const metaSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  source: String
})

const productSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  availabilityStatus: { type: String, required: true },
  brand: { type: String, required: true, default: 'Unknown Brand' },
  category: { type: String, required: true },
  description: { type: String, required: true },
  dimensions: dimensionSchema,
  discountPercentage: { type: Number, required: true },
  images: [String],
  meta: metaSchema,
  minimumOrderQuantity: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  returnPolicy: { type: String, required: true },
  reviews: [reviewSchema],
  shippingInformation: { type: String, required: true },
  sku: { type: String, required: true },
  stock: { type: Number, required: true },
  tags: [String],
  thumbnail: { type: String, required: true },
  warrantyInformation: { type: String, required: true },
  weight: { type: Number, required: true }
})

export const Product = mongoose.model('Product', productSchema)
