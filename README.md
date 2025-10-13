# Global Shapers Hub Website Template

This is a configurable website template for Global Shapers hubs. It allows any hub to easily customize the content and branding to match their local community while maintaining a professional, consistent design.

## 🚀 Quick Start for Your Hub

### 1. Configuration and Data Setup

1. Copy the configuration template and customize with your hub's information:
   ```bash
   cp public/config/hub-config.template.json public/config/hub-config.json
   ```

2. Copy the data template files and customize with your hub's content:
   ```bash
   # Copy template files to data directory
   cp public/data/members.template.json public/data/members.json
   cp public/data/projects.template.json public/data/projects.json
   cp public/data/impact_points.template.json public/data/impact_points.json
   cp public/data/events.template.json public/data/events.json
   ```

3. Edit `public/config/hub-config.json` with your hub's information:
   - Hub name and region
   - Contact information
   - Social media links
   - Hero text and messaging

4. Customize the data files with your hub's specific content for members, projects, impact points, and events.

### 3. Assets Setup

Add your hub's visual assets:

```
public/assets/images/
├── logo.png                    # Your hub's logo
├── intro.jpg                   # Hero section background
├── members/                    # Member photos
├── projects/                   # Project images and galleries
├── events/                     # Event photos
└── gs/                        # Generic Global Shapers images
    ├── team.jpg
    ├── leadership.jpg
    ├── diversity.jpg
    ├── projects.jpg
    └── global.jpg
```

## 📁 File Structure

```
├── public/
│   ├── config/
│   │   ├── hub-config.json         # Hub configuration
│   │   └── hub-config.template.json # Template for new hubs
│   ├── data/                       # Your hub's data
│   │   ├── members.json
│   │   ├── members.template.json
│   │   ├── projects.json
│   │   ├── projects.template.json
│   │   ├── impact_points.json
│   │   ├── impact_points.template.json
│   │   ├── events.json
│   │   └── events.template.json
│   └── assets/images/              # Your hub's images
└── src/                           # Application source code
```

## 🛠️ Customization Guide

### Hub Configuration (`public/config/hub-config.json`)

This file contains all the basic information about your hub:

- **hubName**: Full name (e.g., "Global Shapers Berlin")
- **hubShortName**: City name only (e.g., "Berlin")
- **region**: Your region/state/province
- **heroTitle**: Main headline on the homepage
- **heroSubtitle**: Subtitle description
- **contact**: Address and email information
- **social**: Social media links
- **recruitmentText**: Recruitment section messaging

### Data Files

#### Members (`public/data/members.json`)
Add your hub's members with their photos, roles, and descriptions.

#### Projects (`public/data/projects.json`)
Showcase your hub's initiatives with images, descriptions, and categories.

#### Impact Points (`public/data/impact_points.json`)
Highlight your hub's key impact areas with custom descriptions.

#### Events (`public/data/events.json`)
List upcoming and past events.

## 🎨 Branding Customization

### Logo
The current logo (`public/assets/images/logo.png`) is the default Global Shapers logo. To use your own hub's logo:
1. Replace `public/assets/images/logo.png` with your hub's logo
2. Generate a favicon package using [Real Favicon Generator](https://realfavicongenerator.net/)
3. Replace all content in the `public/favicon/` directory with the generated favicon files

### Colors
Update the color scheme in `public/config/hub-config.json`:
```json
{
  "branding": {
    "primaryColor": "#2563eb",
    "secondaryColor": "#10b981"
  }
}
```

### Images
- **Hero Image**: `public/assets/images/intro.jpg`
- **Member Photos**: `public/assets/images/members/[name].jpg`
- **Project Images**: `public/assets/images/projects/[project-name]/`

## 🌍 Multi-language Support

To add support for additional languages:

1. Create language-specific configuration files:
   - `public/config/hub-config.en.json`
   - `public/config/hub-config.de.json`
   - etc.

2. Modify the `configService.ts` to load the appropriate language file.

## 📝 Content Guidelines

### Writing Style
- Keep project descriptions concise but impactful (2-3 sentences)
- Use active voice and action-oriented language
- Highlight measurable outcomes when possible

### Image Requirements
- **Logo**: 512x512px PNG with transparent background
- **Hero Image**: 1920x1080px high-quality photograph
- **Member Photos**: 400x400px professional headshots
- **Project Images**: 800x600px minimum, good lighting and composition

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- JSON-based data management (no backend required)

## Deployment

The site can be deployed to any static hosting provider (Netlify, Vercel, etc.) as it's a static website with no backend dependencies.

```bash
# Build for production
npm run build

# Deploy the dist directory
```
