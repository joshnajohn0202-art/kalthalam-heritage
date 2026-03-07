# 🏨 Kalthalam Heritage User Module - Visual Guide

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Kalthalam Heritage                   │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│  SIDEBAR    │        HEADER (with greeting)            │
│  280px      │                                           │
│             ├───────────────────────────────────────────┤
│  📊 Dash    │                                           │
│  🏠 Cottages│                                           │
│  📅 Avail   │          MAIN CONTENT AREA                │
│  🎫 Booking │                                           │
│  📋 Complaints                        (Scrollable)      │
│  👤 Profile │                                           │
│             │                                           │
│  🚪 Logout  │                                           │
└─────────────┴───────────────────────────────────────────┘
```

## 🎨 Color Palette

```
┌──────────────┬─────────────────┬──────────────────┐
│ Primary      │ Secondary       │ Accent           │
│ #667eea      │ #764ba2         │ #2f855a          │
│ ██████████   │ ██████████      │ ██████████       │
└──────────────┴─────────────────┴──────────────────┘

┌──────────────┬─────────────────┬──────────────────┐
│ Success      │ Warning         │ Danger           │
│ #15803d      │ #d97706         │ #c53030          │
│ ██████████   │ ██████████      │ ██████████       │
└──────────────┴─────────────────┴──────────────────┘

┌──────────────┬─────────────────┬──────────────────┐
│ Light BG     │ Text Primary    │ Text Secondary   │
│ #f8f9fa      │ #1e293b         │ #64748b          │
│ ██████████   │ ██████████      │ ██████████       │
└──────────────┴─────────────────┴──────────────────┘
```

## 📱 Responsive Breakpoints

```
Desktop (1200px+)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[SIDEBAR 280px] [MAIN CONTENT - Full Width]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tablet (768px - 1199px)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[SIDEBAR 250px] [MAIN CONTENT - Reduced]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mobile (< 768px)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[HORIZONTAL SIDEBAR / MENU]
[MAIN CONTENT - Full Width]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🖼️ Component Layouts

### UserDashboard
```
┌─ Welcome Banner ─────────────────────────┐
│ Welcome to Your Dashboard                │
│ Manage your bookings and account         │
└──────────────────────────────────────────┘

┌─ Statistics (4 Cards) ────────────────────────┐
│ [🎫 Bookings] [📅 Upcoming] [⭐ Loyalty] [✅ Status] │
└───────────────────────────────────────────────┘

┌─ Quick Actions (4 Buttons) ───────────────────┐
│ [🎫 New Booking] [👤 Profile] [💬 Support] [⚙️ Settings] │
└────────────────────────────────────────────────┘

┌─ Recent Bookings (3 Cards) ───────────────────┐
│ [🏡 Cottage] [🏰 Villa] [🌿 Bungalow]        │
└────────────────────────────────────────────────┘

┌─ Featured Offers (3 Cards) ────────────────────┐
│ [20% OFF] [BONUS] [NEW]                        │
└─────────────────────────────────────────────────┘
```

### UserProfile
```
┌────────────────────────────────────────┐
│ [AVATAR] Full Name: John Doe           │
│ JD      Father Name: Mr. Doe           │
│         Mother Name: Mrs. Doe          │
│         Address: 123 Main St...        │
│         Phone: 9876543210              │
│                          [Edit Profile]│
└────────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 👤 Personal Information               │
│ [Display Mode / Edit Form]           │
├──────────────────────────────────────┤
│ 📊 Booking Statistics                │
│ [3 Stat Cards]                      │
├──────────────────────────────────────┤
│ 🗓️ Booking History                  │
│ [Toggle] [Booking Cards]            │
├──────────────────────────────────────┤
│ ⚡ Quick Actions                    │
│ [4 Action Buttons]                  │
└──────────────────────────────────────┘
```

### Complaints
```
┌─────────────────────────────────────────────────┐
│ 📋 Complaints & Issues                          │
│ Submit and track your concerns                  │
└─────────────────────────────────────────────────┘

┌─ Submit Form ─────────────────────────────────┐
│ ✍️ Submit a New Complaint                    │
│ [Textarea - 150px height]                    │
│ [📤 Submit Complaint Button]                 │
└───────────────────────────────────────────────┘

┌─ Complaints List ─────────────────────────────┐
│ 📌 Your Recent Complaints                    │
│                                              │
│ ┌─ Card 1 ──────────────────────────────────┐│
│ │ Issue: AC not cooling                    ││
│ │ Date: 05/20/2024                         ││
│ │              [Status Badge] [🗑️ Delete] ││
│ └─────────────────────────────────────────────┘│
│                                              │
│ ┌─ Card 2 ──────────────────────────────────┐│
│ │ Issue: WiFi connectivity issue           ││
│ │ Date: 05/18/2024                         ││
│ │              [Status Badge] [🗑️ Delete] ││
│ └─────────────────────────────────────────────┘│
└───────────────────────────────────────────────┘
```

## 🎭 Component States

### Status Badge States
```
┌─────────────┬──────────┬──────────────────┐
│ Status      │ Color    │ Background       │
├─────────────┼──────────┼──────────────────┤
│ Pending     │ #ea580c  │ #fff7ed (Orange)│
│ Resolved    │ #15803d  │ #dcfce7 (Green) │
│ In Progress │ #d97706  │ #fef3c7 (Yellow)│
│ Closed      │ #4f46e5  │ #e0e7ff (Blue)  │
└─────────────┴──────────┴──────────────────┘
```

### Button Variations
```
Primary Button
┌─────────────────────────────────┐
│ 📤 Submit Complaint             │ Gradient: #667eea → #764ba2
│                                 │ Text: White
│ On Hover: Lift + Shadow         │
└─────────────────────────────────┘

Secondary Button
┌─────────────────────────────────┐
│ 🔐 Change Password              │ Bg: #f8f9fa
│                                 │ Text: #2d3748
│ On Hover: Light Shadow          │
└─────────────────────────────────┘

Danger Button
┌─────────────────────────────────┐
│ 🗑️ Delete                       │ Bg: #fee2e2
│                                 │ Text: #dc2626
│ On Hover: Darker Red            │
└─────────────────────────────────┘
```

## 🎯 Spacing Guidelines

```
20px  - Component padding
30px  - Section padding
40px  - Page padding
15px  - Card spacing
10px  - Button gap

Line Height: 1.5 (normal text)
            1.6 (body text)
            1.2 (headings)
```

## 📐 Card & Container Sizes

```
Sidebar Width:        280px (fixed)
Main Margin:          280px (matches sidebar)
Max Container Width:  1000px - 1200px
Stat Card Width:      220px min, 1fr max
Button Height:        44px - 48px
Input Height:         40px - 48px
```

## 🔄 Animation Timings

```
Hover Effects:    0.3s ease
Button Click:     0.2s ease-out
Page Transition:  0.4s ease
Card Lift:        translateY(-5px)
Button Lift:      translateY(-2px)
```

## 📊 Grid System

```
Desktop Grid: 4 columns
Tablet Grid:  2-3 columns
Mobile Grid:  1 column (stack)

Auto-fit using: grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
```

## 🖱️ Interactive Elements

### Hover Effects
```
Cards:     Lift + Shadow + Border color change
Buttons:   Lift + Shadow change
Links:     Color change + Underline
Inputs:    Border color change + Shadow
```

### Focus States
```
All inputs: Blue border + Shadow
Buttons:    Outline visible
Links:      Underline visible
```

### Active States
```
Sidebar Nav: White background + Left border
Buttons:     Slight scale down
Checkboxes:  Filled + Checkmark
```

## 📋 Typography Hierarchy

```
H1: 32px / 28px / 24px / 20px (responsive)
H2: 28px / 24px / 20px / 18px
H3: 20px / 18px / 16px / 16px
H4: 16px / 16px / 14px / 14px
Body: 16px / 14px / 14px / 13px
Small: 12px / 12px / 11px / 11px
```

---

**Design System Version**: 1.0.0  
**Last Updated**: February 2026  
**Compatible Browsers**: Chrome, Firefox, Safari, Edge
