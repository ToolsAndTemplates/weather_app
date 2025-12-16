# ⛅ Weather App

A beautiful, responsive weather application built with Next.js 14, TypeScript, and Tailwind CSS. Get real-time weather information for any city worldwide with a stunning, dynamic UI.

![Weather App](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🌍 **Auto Location Detection** - Automatically detects your location via IP address
- 🔍 **Global Weather Search** - Get weather for any city worldwide
- 📊 **7-Day Forecast** - See weather predictions for the week ahead
- 🎨 **Dynamic Themes** - Background changes based on current weather conditions
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Real-time Data** - Powered by Open-Meteo API
- 🎭 **Beautiful Animations** - Smooth transitions and hover effects
- 🔒 **No API Key Required** - Free and unlimited access
- 🌡️ **Detailed Metrics** - Temperature, humidity, wind speed, pressure, and more
- 🔄 **Smart Fallback** - Falls back to Baku if location detection fails

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository** (if from git) or navigate to the project directory:
   ```bash
   cd weather_app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit:
   ```
   http://localhost:3000
   ```

## 🛠️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Open-Meteo API](https://open-meteo.com/)** - Free weather API
- **[Axios](https://axios-http.com/)** - HTTP client for API requests

## 📂 Project Structure

```
weather_app/
├── app/
│   ├── api/
│   │   └── weather/
│   │       └── route.ts          # Weather API endpoint
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ForecastCard.tsx          # 7-day forecast component
│   ├── SearchBar.tsx             # City search input
│   └── WeatherCard.tsx           # Current weather display
├── lib/
│   ├── weatherCodes.ts           # WMO weather code mappings
│   └── weatherThemes.ts          # Dynamic theme configurations
├── types/
│   └── weather.ts                # TypeScript type definitions
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies
```

## 🎨 Features in Detail

### Dynamic Weather Themes
The app automatically changes its background gradient based on current weather conditions:
- ☀️ Clear sky - Bright blue gradient
- ⛅ Partly cloudy - Cyan to blue gradient
- ☁️ Overcast - Gray gradient
- 🌧️ Rainy - Slate gradient
- ⛈️ Thunderstorm - Dark purple/indigo gradient
- 🌨️ Snow - Light slate gradient
- 🌫️ Fog - Light gray gradient

### Responsive Design
- **Mobile**: Single column layout with touch-friendly buttons
- **Tablet**: Optimized grid layouts for forecast cards
- **Desktop**: Full-width display with hover effects

### Weather Metrics
- Current temperature with "feels like" temperature
- Min/max daily temperatures
- Humidity percentage
- Wind speed in km/h
- Atmospheric pressure in hPa
- Sunrise and sunset times
- Weather description with emoji icons

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## 🌐 API Information

This app uses the **Open-Meteo API**, which provides:
- ✅ Free access (no API key required)
- ✅ No rate limits for non-commercial use
- ✅ Global coverage
- ✅ Accurate forecasts
- ✅ Multiple weather parameters

### How it works:
1. **IP Geolocation** (ipapi.co) - Automatically detects your location from IP
2. **Geocoding API** - Converts city names to coordinates
3. **Weather API** - Fetches weather data using coordinates

### Auto-Location Detection:
The app automatically detects your location when you first visit:
- Uses **ipapi.co** for IP-based geolocation (no API key required)
- Falls back to **ip-api.com** if the primary service fails
- If both fail, defaults to **Baku, Azerbaijan**
- Your detected location is shown at the bottom of the page

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Future Enhancements

- [x] ~~Geolocation support (auto-detect user location)~~ ✅ Completed!
- [ ] Hourly forecast view
- [ ] Weather alerts and notifications
- [ ] Multiple location favorites
- [ ] Temperature unit toggle (Celsius/Fahrenheit)
- [ ] Dark mode support
- [ ] Weather maps integration
- [ ] PWA support for offline access

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using Next.js and TypeScript

---

**Powered by [Open-Meteo API](https://open-meteo.com/)** • Free & Unlimited Weather Data
