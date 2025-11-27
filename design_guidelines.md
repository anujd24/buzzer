# Design Guidelines: Product Complaint & Purchase Landing Page

## Design Approach
**Hybrid Approach**: Drawing from clean SaaS/e-commerce patterns (Stripe's clarity + Shopify's approachability) with Material Design's form interaction principles. Focus on form usability, trust-building, and professional presentation.

## Typography System
**Font Stack**: Google Fonts via CDN
- **Primary (Headings)**: Inter (weights: 600, 700) - Clean, professional, excellent readability
- **Secondary (Body/Forms)**: Inter (weights: 400, 500) - Consistent family for cohesion

**Type Scale**:
- Hero/Product Title: text-4xl md:text-5xl font-bold
- Section Headings: text-2xl md:text-3xl font-semibold
- Form Labels: text-sm font-medium uppercase tracking-wide
- Body Text: text-base md:text-lg
- Input Text: text-base
- Button Text: text-base font-medium

## Layout & Spacing System
**Tailwind Spacing Units**: Consistent use of 4, 6, 8, 12, 16, 20, 24 for predictable rhythm

**Container Strategy**:
- Max width: max-w-6xl mx-auto px-6 md:px-8
- Form containers: max-w-2xl mx-auto for optimal form width
- Section padding: py-16 md:py-24 for generous breathing room

## Navigation Bar
**Structure**: Fixed top navbar with shadow on scroll
- Height: h-20
- Layout: Flex justify-between items-center
- Logo: h-10 w-auto (top-left)
- Nav Links: Gap of 8 units, hover underline effect
- Responsive: Hamburger menu on mobile (<768px)

## Home Page Layout

**Product Information Section**:
- Full-width hero-style section with centered content
- Heading + 2-3 paragraph description in max-w-3xl container
- Vertical spacing: space-y-6 between elements
- Padding: py-20 md:py-32

**Complaint Form Section**:
- Centered max-w-2xl container
- Section heading above form: "Submit Your Complaint" (text-3xl font-bold mb-12)
- Form grid: Single column, space-y-6
- Card treatment: Elevated container with p-8 md:p-12, rounded-lg shadow-lg

**Form Fields**:
- Labels: Above inputs, text-sm font-medium mb-2
- Input fields: w-full h-12 px-4 rounded-lg border focus:ring-2 focus:outline-none
- Complaint box: textarea h-32 resize-none
- Submit button: w-full md:w-auto px-8 h-12 rounded-lg font-medium

## Buy Our Product Page

**Purchase Form**:
- Centered layout matching complaint form styling
- Section heading: "Purchase Our Product" (text-3xl font-bold mb-12)
- Same form card treatment as home page
- Quantity input: Number input with +/- controls for better UX
- Buy Now button: Full-width on mobile, auto-width on desktop, prominent styling

## Component Specifications

**Input Fields**:
- Consistent height: h-12
- Padding: px-4
- Border radius: rounded-lg
- Focus state: Ring effect (ring-2)
- Error state: Red border indication
- Placeholder text with reduced opacity

**Buttons**:
- Primary action: h-12 px-8 rounded-lg
- Hover: Subtle transform scale-105 transition
- Active: scale-95 for tactile feedback
- Disabled state: Reduced opacity cursor-not-allowed

**Form Validation**:
- Inline error messages: text-sm text-red-600 mt-1
- Success messages: Green background banner at top of form
- Required field indicators: Asterisk after label

## Icons
**Library**: Heroicons (via CDN)
- Navigation menu icon (mobile)
- Form field icons (phone, user, etc.) - placed inside inputs on left
- Success/error indicators for form states

## Images Section

**Hero Image** (Home Page):
- Placement: Above or behind product information section
- Style: Professional product photography or lifestyle image showing product in use
- Treatment: Subtle gradient overlay for text readability if text overlaps
- Dimensions: Full-width, aspect ratio 16:9 on desktop, 4:3 on mobile
- Alternative: If no product image, use abstract geometric pattern or solid background

**No additional images needed** - Forms should be clean and distraction-free

## Responsive Behavior

**Mobile (<768px)**:
- Single column layouts throughout
- Full-width buttons
- Reduced padding (py-12 instead of py-24)
- Stacked navigation in hamburger menu

**Tablet (768px-1024px)**:
- Maintain centered layouts
- Moderate padding increases
- Keep forms at max-w-2xl for readability

**Desktop (>1024px)**:
- Full spacing implementation
- Forms remain centered, never exceed max-w-2xl
- Navigation inline, no hamburger

## Accessibility
- All inputs have associated labels
- Focus states clearly visible with ring effects
- Color contrast ratios meet WCAG AA standards
- Keyboard navigation fully supported
- Error messages announced to screen readers