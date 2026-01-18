# Setup Guide - Janine Bicca Doces Finos

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Sanity CMS

1. Create a free account at [sanity.io](https://sanity.io)
2. Create a new project in the Sanity dashboard
3. Copy your Project ID
4. Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Initialize Sanity Dataset

```bash
npm run dev
```

Then visit `http://localhost:3000/studio` to access the Sanity Studio admin panel.

### 4. Add Initial Content

In the Sanity Studio, you'll need to create:

1. **Categories**: Trufas, Brigadeiros, Doces Finos, Páscoa, Presentes & Kits
2. **Occasions**: All the occasions from the list (Batizado, Dia da Mulher, etc.)
3. **Collections**: Eventos, Presentes, Sazonais, Assinatura Janine
4. **Products**: Add your products with images, prices, and details
5. **Gallery Items**: Upload event photos
6. **FAQs**: Add frequently asked questions
7. **Site Settings**: Configure seasonal toggles (Easter, tasting kit)

## Features Overview

### Content Management (Sanity CMS)

Janine can manage all content without developer help:

- **Products**: Add/edit/remove products, prices, categories, flavors, badges
- **Collections**: Manage collection order and visibility
- **Occasions**: Enable/disable specific occasions
- **Gallery**: Upload and manage event photos
- **FAQs**: Add/edit frequently asked questions
- **Seasonal Settings**: Toggle Easter collection visibility, tasting kit availability

### Customer Features

- **Interactive Catalog**: Search and filter by category, mood, and occasion
- **Quote Bag**: Add products to bag with quantity selection
- **WhatsApp Integration**: Send pre-filled WhatsApp messages with order details
- **Gift Box Builder**: Visual builder to create custom boxes (6/12/24 units)
- **Party Calculator**: Calculate recommended sweet quantities for events
- **Tasting Kit Request**: Form to request degustação via WhatsApp
- **Gallery**: Social proof with real event photos
- **FAQ**: Self-service support

## Environment Variables

Required variables in `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy

### Configure Sanity for Production

1. Go to your Sanity project settings
2. Add your production domain to CORS origins
3. Add your Vercel domain (e.g., `https://yoursite.vercel.app`)

## Content Guidelines

### Product Images

- Use high-quality macro photography
- Recommended size: 800x800px minimum
- Format: JPG or PNG
- Show products in elegant presentation

### Gallery Photos

- Use real event photos showing doces on the table
- Recommended size: 1200x1200px
- Show variety of occasions (weddings, birthdays, corporate events)

### Pricing

- Update prices regularly in Sanity Studio
- Set clear minimum order quantities
- Keep the quote bag system for final price confirmation

## WhatsApp Integration

All WhatsApp links use the format:
```
https://wa.me/5551998116188?text=[ENCODED_MESSAGE]
```

Messages are pre-filled with:
- Customer name
- Selected products and quantities
- Event date and delivery preference
- Specific tags (e.g., [DEGUSTAÇÃO])

## Support

For technical support or questions about the website, contact:

**Developer**: Fabricio Rassier
- LinkedIn: [linkedin.com/in/fabriciorassier](https://www.linkedin.com/in/fabriciorassier/)

For business inquiries:

**Janine Bicca Doces Finos**
- WhatsApp: (51) 99811-6188
- Instagram: [@janinebiccadoces](https://www.instagram.com/janinebiccadoces)
- Facebook: [janinebiccadoces](https://www.facebook.com/janinebiccadoces)
