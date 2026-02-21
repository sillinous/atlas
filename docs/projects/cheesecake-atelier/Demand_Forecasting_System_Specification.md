# The Cheesecake Atelier
## AI-Powered Demand Forecasting System
### Technical Specification v1.0

---

## Executive Overview

This document specifies the demand forecasting and production intelligence system for The Cheesecake Atelier. The system integrates multiple data sources to predict daily production needs, minimize waste, and ensure optimal inventory levels.

---

## System Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DEMAND FORECASTING ENGINE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Weather    │  │    Sales     │  │    Events    │              │
│  │     API      │  │   History    │  │   Calendar   │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                 │                       │
│         └────────────┬────┴────────────────┘                       │
│                      ▼                                              │
│         ┌────────────────────────┐                                 │
│         │   Prediction Engine    │                                 │
│         │   (ML + Heuristics)    │                                 │
│         └───────────┬────────────┘                                 │
│                     │                                              │
│         ┌───────────┴───────────┐                                  │
│         ▼                       ▼                                  │
│  ┌─────────────────┐   ┌─────────────────┐                        │
│  │   Production    │   │    Inventory    │                        │
│  │ Recommendations │   │     Alerts      │                        │
│  └─────────────────┘   └─────────────────┘                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Sources

### 1. Point of Sale (Square)

**Data Points Collected:**
- Transaction timestamp
- Items sold (SKU, quantity, price)
- Payment method
- Customer ID (if loyalty member)
- Employee ID

**Integration Method:**
- Square API with OAuth2 authentication
- Daily batch sync at 12:00 AM
- Real-time webhook for inventory alerts

**API Endpoint:**
```
GET /v2/orders/search
Authorization: Bearer {ACCESS_TOKEN}
```

### 2. Weather Data (OpenWeather API)

**Data Points Collected:**
- Temperature (current, high, low)
- Precipitation probability
- Weather condition (sunny, cloudy, rain, snow)
- Humidity
- 7-day forecast

**Integration Method:**
- Free tier: 1,000 calls/day
- Sync every 6 hours
- Cache results locally

**API Endpoint:**
```
GET https://api.openweathermap.org/data/2.5/forecast
?lat=38.9906&lon=-88.1631&appid={API_KEY}&units=imperial
```

### 3. Local Events Calendar

**Data Points Collected:**
- Event name
- Event type (school, church, festival, sports)
- Expected attendance
- Date and time
- Location proximity

**Data Sources:**
- Manual entry by staff
- Local newspaper event listings (scraped)
- School district calendar
- Chamber of Commerce events

**Schema:**
```json
{
  "event_id": "string",
  "name": "string",
  "type": "enum[school|church|festival|sports|holiday|other]",
  "date": "ISO8601",
  "expected_attendance": "number",
  "proximity_miles": "number",
  "impact_score": "number (1-10)"
}
```

### 4. Historical Patterns

**Data Points Analyzed:**
- Day of week patterns
- Monthly seasonality
- Holiday impacts
- Special event correlations
- Weather impact coefficients

---

## Prediction Model

### Algorithm Overview

The system uses a weighted ensemble approach combining:

1. **Time Series Baseline** (40% weight)
   - Rolling 8-week average by day of week
   - Seasonal adjustment factors

2. **Weather Adjustment** (25% weight)
   - Temperature coefficient: Sales increase 8% per 10°F above 70°F
   - Rainy day coefficient: -15% for precipitation >50%
   - Snow day coefficient: -40% for snow accumulation

3. **Event Multiplier** (20% weight)
   - Local festival: +30-50%
   - School event: +15-25%
   - Holiday: +50-100%
   - Major sports: +10-20%

4. **Trend Adjustment** (15% weight)
   - 4-week moving average growth rate
   - New customer acquisition rate

### Production Formula

```
Daily_Production[product] = 
    (Baseline[product][day_of_week] 
     * Seasonal_Factor[month]
     * Weather_Coefficient
     * Event_Multiplier
     * Trend_Adjustment)
    + Safety_Buffer[product]
```

### Safety Buffer Calculation

```
Safety_Buffer = Standard_Deviation(last_30_days) * 0.5
```

This ensures 69% confidence of not running out while minimizing overproduction.

---

## Product Categories

### Category A: High Volume, Short Shelf Life
- Slices (cut daily)
- Whipped cream (2-day freshness)

**Strategy:** Produce to demand with minimal buffer

### Category B: Medium Volume, Extended Shelf Life
- Whole cheesecakes (5-day refrigerated)
- Seasonal specials

**Strategy:** Batch production with 2-day inventory target

### Category C: Low Volume, Long Shelf Life
- Merchandise
- Packaged items

**Strategy:** Reorder point system

---

## Output Specifications

### Daily Production Report

Generated at 4:30 AM for morning production planning.

```
═══════════════════════════════════════════════════════════════
        THE CHEESECAKE ATELIER - DAILY PRODUCTION PLAN
                    [DATE: 2026-02-15]
═══════════════════════════════════════════════════════════════

WEATHER OUTLOOK: Partly Cloudy, High 45°F, 10% precip
EVENT ALERT: Newton High Basketball Game (7 PM, +15% traffic)
DAY TYPE: Saturday (Peak Day)

───────────────────────────────────────────────────────────────
PRODUCTION RECOMMENDATIONS
───────────────────────────────────────────────────────────────

WHOLE CHEESECAKES:
  The Classic ................ 4 units  [Confidence: 85%]
  The Burnt .................. 2 units  [Confidence: 78%]
  The Cloud .................. 2 units  [Confidence: 72%]
  The Decadent ............... 2 units  [Confidence: 80%]
  Seasonal (Maple Pecan) ..... 2 units  [Confidence: 75%]
                              ─────────
  TOTAL WHOLE ............... 12 units

SLICE PREP (from inventory + fresh):
  Target Display Cases ....... 48 slices
  Current Inventory .......... 18 slices
  Fresh Cutting Needed ....... 30 slices (2.5 cakes)

WHIPPED CREAM:
  Classic Vanilla ............ 6 pints
  Seasonal (Maple Bourbon) ... 4 pints

───────────────────────────────────────────────────────────────
INVENTORY ALERTS
───────────────────────────────────────────────────────────────

⚠️  Cream Cheese: 4 lbs remaining - REORDER TODAY
✓  Heavy Cream: 12 quarts (5-day supply)
✓  Eggs: 8 dozen (4-day supply)
⚠️  Graham Crackers: 2 boxes remaining - REORDER

───────────────────────────────────────────────────────────────
CONFIDENCE NOTES
───────────────────────────────────────────────────────────────

• Saturday historically 40% above weekday average
• Basketball games typically add 12-18% evening traffic
• Weather neutral (no significant impact expected)
• Trending +5% vs. 4-week average

═══════════════════════════════════════════════════════════════
```

### Inventory Alert System

**Critical Alert (Red):** <1 day supply remaining
**Warning Alert (Yellow):** <3 days supply remaining  
**Reorder Alert (Blue):** Below reorder point

Alerts sent via:
- SMS to owner (critical only)
- Email digest (all alerts)
- Dashboard notification

---

## Implementation Phases

### Phase 1: Manual + Spreadsheet (Months 1-3)
- Google Sheets-based tracking
- Manual weather checks
- Daily production log
- Basic formula-based recommendations

**Cost:** $0 (existing tools)

### Phase 2: Semi-Automated (Months 4-6)
- Square API integration
- Automated weather data pull
- Python scripts for analysis
- Scheduled email reports

**Cost:** ~$50/month (hosting, APIs)

### Phase 3: Full Automation (Months 7-12)
- Custom dashboard
- Real-time inventory tracking
- Mobile app for production staff
- Machine learning refinement

**Cost:** ~$150/month (infrastructure, APIs)

---

## Technical Implementation

### Phase 1: Google Sheets Structure

**Sheet 1: Daily Sales Log**
| Date | Day | Weather | Events | Classic | Burnt | Cloud | Decadent | Seasonal | Total Slices | Total Whole | Revenue |

**Sheet 2: Weather Data**
| Date | High | Low | Condition | Precip% |

**Sheet 3: Event Calendar**
| Date | Event | Type | Impact Score |

**Sheet 4: Production Recommendations**
Formula-driven sheet that calculates daily production based on inputs.

### Phase 2: Python Implementation

```python
# demand_forecast.py - Core forecasting engine

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import requests

class DemandForecaster:
    def __init__(self, config):
        self.config = config
        self.weather_api_key = config['openweather_api_key']
        self.square_access_token = config['square_access_token']
        
    def get_weather_forecast(self, days=7):
        """Fetch weather forecast from OpenWeather API"""
        url = f"https://api.openweathermap.org/data/2.5/forecast"
        params = {
            'lat': 38.9906,
            'lon': -88.1631,
            'appid': self.weather_api_key,
            'units': 'imperial'
        }
        response = requests.get(url, params=params)
        return self._parse_weather(response.json())
    
    def calculate_weather_coefficient(self, temp, precip_prob, condition):
        """Calculate sales impact coefficient based on weather"""
        coef = 1.0
        
        # Temperature impact
        if temp > 70:
            coef += (temp - 70) * 0.008  # +0.8% per degree above 70
        elif temp < 40:
            coef -= (40 - temp) * 0.005  # -0.5% per degree below 40
            
        # Precipitation impact
        if precip_prob > 0.5:
            coef *= 0.85  # -15% for likely rain
        if condition in ['snow', 'blizzard']:
            coef *= 0.60  # -40% for snow
            
        return round(coef, 2)
    
    def get_baseline_demand(self, product, date):
        """Get baseline demand from historical data"""
        day_of_week = date.strftime('%A')
        month = date.month
        
        # Query historical sales for same day of week
        historical = self._query_historical_sales(product, day_of_week)
        
        # Calculate rolling 8-week average
        baseline = historical['quantity'].rolling(8).mean().iloc[-1]
        
        # Apply seasonal adjustment
        seasonal_factor = self.config['seasonal_factors'].get(month, 1.0)
        
        return baseline * seasonal_factor
    
    def get_event_multiplier(self, date):
        """Get sales multiplier based on local events"""
        events = self._query_events(date)
        
        if not events:
            return 1.0
            
        max_impact = max(e['impact_score'] for e in events)
        
        impact_map = {
            1: 1.05, 2: 1.10, 3: 1.15, 4: 1.20, 5: 1.25,
            6: 1.30, 7: 1.40, 8: 1.50, 9: 1.75, 10: 2.00
        }
        
        return impact_map.get(max_impact, 1.0)
    
    def forecast_day(self, date, products):
        """Generate production forecast for a specific day"""
        weather = self.get_weather_forecast()[0]  # Today's weather
        weather_coef = self.calculate_weather_coefficient(
            weather['temp_high'],
            weather['precip_prob'],
            weather['condition']
        )
        event_mult = self.get_event_multiplier(date)
        trend_adj = self._calculate_trend_adjustment()
        
        forecasts = {}
        for product in products:
            baseline = self.get_baseline_demand(product, date)
            
            predicted = (
                baseline 
                * weather_coef 
                * event_mult 
                * trend_adj
            )
            
            # Add safety buffer
            std_dev = self._get_std_dev(product)
            safety = std_dev * 0.5
            
            forecasts[product] = {
                'predicted': round(predicted),
                'safety_buffer': round(safety),
                'recommended': round(predicted + safety),
                'confidence': self._calculate_confidence(product, date)
            }
            
        return forecasts
    
    def generate_daily_report(self, date=None):
        """Generate formatted daily production report"""
        if date is None:
            date = datetime.now() + timedelta(days=1)
            
        products = ['classic', 'burnt', 'cloud', 'decadent', 'seasonal']
        forecasts = self.forecast_day(date, products)
        
        report = self._format_report(date, forecasts)
        return report
```

---

## Integration with AEGIS Framework

This demand forecasting system integrates with the broader AEGIS autonomous business framework:

### Data Flow
```
Square POS → AEGIS Data Layer → Demand Forecaster → Production Dashboard
     ↑                                    ↓
     └──────── Actual Sales ←── Feedback Loop
```

### Autonomous Capabilities
- Self-adjusting coefficients based on prediction accuracy
- Automatic retraining on new data weekly
- Alert escalation for anomalies
- Integration with inventory ordering systems

---

## Success Metrics

### Forecast Accuracy
- Target: ±15% of actual demand
- Measurement: Weekly MAPE (Mean Absolute Percentage Error)

### Waste Reduction
- Target: <5% daily waste rate
- Measurement: (Unsold / Produced) * 100

### Stockout Prevention
- Target: <2% stockout incidents
- Measurement: Customer requests unfulfilled / Total requests

### Revenue Impact
- Target: 8-12% revenue increase vs. non-forecasted baseline
- Measurement: A/B test against manual planning

---

## Appendix: Configuration Templates

### config.yaml
```yaml
# Demand Forecasting Configuration

api_keys:
  openweather: "${OPENWEATHER_API_KEY}"
  square: "${SQUARE_ACCESS_TOKEN}"

location:
  lat: 38.9906
  lon: -88.1631
  timezone: "America/Chicago"

products:
  - id: classic
    name: "The Classic"
    shelf_life_days: 5
    min_batch: 1
    category: B
    
  - id: burnt
    name: "The Burnt"
    shelf_life_days: 5
    min_batch: 1
    category: B
    
  - id: cloud
    name: "The Cloud"
    shelf_life_days: 3
    min_batch: 1
    category: B
    
  - id: decadent
    name: "The Decadent"
    shelf_life_days: 5
    min_batch: 1
    category: B
    
  - id: seasonal
    name: "Seasonal Special"
    shelf_life_days: 5
    min_batch: 1
    category: B

seasonal_factors:
  1: 0.85   # January - post-holiday slump
  2: 1.10   # February - Valentine's boost
  3: 0.95   # March
  4: 1.00   # April - Easter boost
  5: 1.05   # May - Mother's Day
  6: 1.00   # June
  7: 0.90   # July - summer slowdown
  8: 0.90   # August
  9: 0.95   # September
  10: 1.00  # October
  11: 1.15  # November - Thanksgiving
  12: 1.40  # December - holiday peak

day_of_week_factors:
  Monday: 0.70
  Tuesday: 0.75
  Wednesday: 0.80
  Thursday: 0.85
  Friday: 1.15
  Saturday: 1.40
  Sunday: 1.00

alert_thresholds:
  critical_days: 1
  warning_days: 3
  reorder_buffer: 1.5

report_schedule:
  daily_production: "04:30"
  inventory_check: "14:00"
  weekly_summary: "Sunday 20:00"
```

---

*Document Version: 1.0*
*Last Updated: January 2026*
*Author: AEGIS Framework Integration*
