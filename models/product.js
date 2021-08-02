import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const product = new Schema({
  name: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  set: [
    {
      colorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
        required: true,
      },
      sizeCollection: [
        {
          name: {
            type: String,
            required: true,
          },
          sizes: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Size',
              required: true,
            },
          ],
        },
      ],
      images: [
        {
          type: String,
          required: true,
        },
      ],
      extraOptions: [
        {
          name: {
            type: String,
            required: true,
          },
          options: [
            {
              name: {
                type: String,
                required: true,
              },
              available: {
                type: String,
                required: true,
              },
            },
          ],
        },
      ],
    },
  ],
});