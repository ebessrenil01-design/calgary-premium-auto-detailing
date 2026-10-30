/**
 * Calgary Premium Auto Detailing - Legal & Compliance Information
 * Studio Location: Near Padil Junction, Bypass Road, Padil, Mangaluru, Karnataka 575007, India
 *
 * IMPORTANT NOTICE:
 * This documentation is prepared as an operational, plain-language draft for review by the
 * business owner and an Indian legal professional. It is aligned with the Digital Personal
 * Data Protection Act, 2023 (DPDP Act), Information Technology Act, 2000, and the Consumer
 * Protection (E-Commerce) Rules, 2020.
 *
 * Items requiring specific owner verification or legal confirmation are marked with [OWNER APPROVAL NEEDED].
 */

export interface LegalSection {
  id: string;
  title: string;
  shortSummary: string;
  lastUpdated: string;
  content: string[];
  ownerReviewItems?: string[];
}

export const LEGAL_DOCUMENTS: Record<string, LegalSection> = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    shortSummary: 'Plain-language explanation of what data is collected, why it is used, how WhatsApp handles communication, and your rights under the DPDP Act 2023.',
    lastUpdated: 'October 2026 (Draft for Review)',
    content: [
      '### 1. Introduction & Who We Are',
      'Calgary Premium Auto Detailing ("Calgary", "we", "us", or "our") operates an automotive detailing studio located near Padil Junction, Bypass Road, Padil, Mangaluru, Karnataka 575007, India.',
      'This Privacy Policy describes how we handle personal information collected through our website (calgary-detailing.com), our step-by-step inquiry wizard, direct WhatsApp messaging, and phone inquiries.',
      '**Legal Status Notice**: This document is a plain-language operational policy drafted for transparency and customer clarity. It is subject to formal review by an Indian legal practitioner to ensure ongoing compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable rules.',

      '### 2. Information We Collect & Why',
      'We practice strict data minimization. We only collect the minimal personal data necessary to provide accurate detailing consultations, estimate preparation, and appointment scheduling:',
      '• **Customer Contact Details**: Name and 10-digit mobile phone number. Purpose: To address you respectfully and communicate with you directly regarding your vehicle treatment.',
      '• **Vehicle Information**: Make, model, manufacturing year (if provided), vehicle segment (hatchback, sedan, SUV), and current vehicle condition. Purpose: Automotive detailing quotes depend on surface square footage, paint clearcoat thickness, and defect severity.',
      '• **Service & Diagnostic Preferences**: Selected treatments (e.g. ceramic coating, paint correction, interior extraction), observed defects (swirl marks, water spots), parking environment (covered vs open coastal air), and interior upholstery type. Purpose: To formulate an appropriate technical treatment plan before your car enters our studio bay.',
      '• **Locality in Mangaluru**: General neighborhood (e.g. Padil, Kadri, Bejai, Surathkal). Purpose: To coordinate appointment logistics and estimate travel/drop-off windows.',
      '• **Client Notes & Questions**: Any specific requests or damage observations entered by you in the inquiry form.',

      '### 3. What We Do NOT Collect',
      '• **No Financial Data**: We do NOT collect credit card numbers, bank account details, or UPI PINs on this website.',
      '• **No Sensitive Personal Data**: We do NOT collect Aadhaar numbers, biometric data, health records, or religious information.',
      '• **No Advertising Tracking**: We do NOT run tracking pixels (such as Meta Pixel, TikTok pixel) or third-party behavioral advertising scripts on this website.',
      '• **No File/Image Uploads on Website**: We do not store photographs on our website servers. Any photographs or videos you choose to share are transmitted directly within your private WhatsApp conversation with our studio.',

      '### 4. How Your Data Is Processed & Stored',
      '• **Client-Side Local Storage**: When you complete our inquiry wizard, your inquiry details and a generated reference ID (e.g., CLG-2026-XXXX) are stored locally inside your own browser using HTML5 LocalStorage (`calgary_customer_inquiries_v1`). This allows you to track past inquiries using the "Track My Inquiries" drawer. This data remains on your physical device and is not synchronized to an external cloud database by us.',
      '• **Third-Party Messaging (WhatsApp)**: When you click "Send to Studio WhatsApp" or "Chat on WhatsApp", you are redirected to WhatsApp (operated by WhatsApp LLC / Meta Platforms). The text you drafted is passed into your WhatsApp chat input. WhatsApp handles message delivery subject to its own privacy policy and end-to-end encryption.',
      '• **Website Hosting**: Our static website files are served through Google Cloud / Run infrastructure. Standard web server access logs (such as IP address, browser user-agent, and request timestamp) may be automatically logged for server security and denial-of-service prevention.',

      '### 5. Lawful Basis for Processing (DPDP Act 2023)',
      'Under the Digital Personal Data Protection Act, 2023, we process your personal data on the basis of:',
      '1. **Consent & Specified Purpose**: You voluntarily enter your details into our inquiry form for the specific purpose of seeking automotive detailing services, quotes, and scheduling consultations.',
      '2. **Legitimate Uses**: Taking necessary steps prior to entering into a detailing service agreement at your request.',

      '### 6. Data Retention & Erasure',
      '• **Local Storage**: Inquiry records stored in your browser can be cleared by you at any time with one click using the "Cookie & Storage Preferences" tool on our website or by clearing your browser cache.',
      '• **Studio WhatsApp Records**: Communications held within WhatsApp are retained only as long as necessary to coordinate your appointment, honor warranty commitments (such as our 3-year/5-year ceramic coating records and monthly maintenance wash tracking), and satisfy tax or accounting obligations under Indian law.',

      '### 7. Your Rights as a Data Principal',
      'Under Indian privacy laws, you have the right to:',
      '• **Right to Access & Summary**: Ask us what personal data we hold about you and your vehicle.',
      '• **Right to Correction & Updating**: Request correction of inaccurate or outdated contact or vehicle details.',
      '• **Right to Erasure**: Request that we delete your contact records from our active messaging lists, subject to ongoing legal or accounting requirements.',
      '• **Right to Nominate**: Nominate an individual to exercise your rights in the event of death or incapacity.',
      '• **Right of Grievance Redressal**: Lodge a privacy complaint directly with our studio (see Section 8 below).',

      '### 8. Contact & Grievance Redressal',
      'If you have any questions about this Privacy Policy, wish to exercise your data rights, or have a grievance:',
      '• **Business Name**: Calgary Premium Auto Detailing',
      '• **Studio Address**: Near Padil Junction, Bypass Road, Padil, Mangaluru, Karnataka 575007, India',
      '• **Primary Phone & WhatsApp**: +91 97456 03303',
      '• **Studio Email**: calgary.mangalore@gmail.com [OWNER APPROVAL NEEDED: Confirm preferred official email]',
      '• **Designated Grievance Contact**: Studio Manager, Calgary Detailing [OWNER APPROVAL NEEDED: Designate formal officer name]'
    ],
    ownerReviewItems: [
      'Confirm preferred official email address for data protection queries.',
      'Designate formal Grievance Officer name as required under DPDP Rules.',
      'Confirm whether customer contact details are manually logged into any external spreadsheet or billing software upon studio arrival.'
    ]
  },

  cookies: {
    id: 'cookies',
    title: 'Cookie & Data Storage Policy',
    shortSummary: 'Honest, factual breakdown of local storage, font CDNs, and outbound links. Zero third-party advertising cookies.',
    lastUpdated: 'October 2026 (Draft for Review)',
    content: [
      '### 1. Our Honest Stance on Cookies & Tracking',
      'Calgary Premium Auto Detailing believes in zero digital clutter and total transparency. We do NOT use invasive advertising cookies, cross-site trackers, or third-party marketing pixels on this website.',

      '### 2. Breakdown of Technologies Used on This Website',
      'We categorize the storage technologies on calgary-detailing.com as follows:',

      '#### Category A: Strictly Necessary & Functional Local Storage',
      '• **Technology**: HTML5 LocalStorage (`calgary_customer_inquiries_v1`)',
      '• **Provider**: First-party (stored strictly on your personal device browser)',
      '• **Purpose**: Enables the "Track My Inquiries" feature. When you submit an inquiry wizard, it saves your reference number (e.g., CLG-2026-4821), vehicle model, and timestamp so you can review what you asked for if you revisit our website.',
      '• **Lifespan**: Persistent until cleared by you or until browser storage is cleared. Maximum 25 recent inquiries.',
      '• **Is it shared?**: No. It never leaves your device and is not sent to advertising networks.',

      '#### Category B: Content Delivery & Typography Assets',
      '• **Technology**: Google Fonts CDN (`fonts.googleapis.com` & `fonts.gstatic.com`)',
      '• **Provider**: Google LLC',
      '• **Purpose**: Serves our modern editorial typography (Kanit typeface) efficiently with low page-load latency.',
      '• **Data Processed**: Your browser sends a standard HTTP request including your IP address to Google servers to download the font stylesheet and font files. Google states that Google Fonts APIs do not set cookies.',

      '#### Category C: External Outbound Services',
      '• **WhatsApp Direct Link (`wa.me`)**: Clicking our WhatsApp chat button opens WhatsApp web or application on your device. WhatsApp operates independently under its own cookie and privacy notices.',
      '• **Google Maps Navigation**: Clicking "Get Directions" opens Google Maps in a new tab. Google Maps handles your location and navigation data under Google’s privacy policy.',
      '• **Instagram & Justdial Links**: Outbound links to our verified profiles. No embedded widgets or background tracking scripts from these platforms are active on our site.',

      '#### Category D: Advertising & Marketing Cookies',
      '• **Status**: **NONE**. We do not deploy Meta Pixel, Google Ads remarketing tags, TikTok pixel, or third-party ad retargeting.',

      '### 3. How You Can Manage Your Preferences',
      'You are always in complete control of your data:',
      '1. **Use our built-in Storage Manager**: Click "Cookie & Storage Settings" in our website footer at any time to view your saved inquiry count and delete all locally saved records in 1 click.',
      '2. **Browser Controls**: You can configure your browser to block local storage, clear site data, or browse in Incognito/Private mode. Blocking local storage will not break the website, but you will not be able to retrieve past inquiries via "Track My Inquiries".'
    ],
    ownerReviewItems: [
      'Confirm whether Google Analytics (GA4) or Google Search Console tracking will be added in the future. (Currently completely absent).'
    ]
  },

  terms: {
    id: 'terms',
    title: 'Terms & Conditions of Website Use',
    shortSummary: 'Rules for using our website, distinction between inquiries and confirmed bookings, surface inspection protocol, and intellectual property.',
    lastUpdated: 'October 2026 (Draft for Review)',
    content: [
      '### 1. Agreement to Terms',
      'Welcome to Calgary Premium Auto Detailing ("Calgary", "we", "our"). By accessing or using our website (calgary-detailing.com) and associated digital inquiry tools, you agree to comply with and be bound by these Terms and Conditions.',
      'If you do not agree with these terms, please refrain from using our digital services.',

      '### 2. Website Purpose & Detailing Scope',
      'This website is designed to showcase our craftsmanship, educate vehicle owners regarding professional detailing standards in Mangaluru’s coastal climate, and facilitate direct customer inquiries via phone and WhatsApp.',
      'We are exclusively an **automotive detailing and vehicle appearance care studio**. We do not provide mechanical repairs, engine rebuilds, body shell fabrication, or residential/interior building cleaning.',

      '### 3. Inquiries vs. Confirmed Studio Bookings',
      '**CRITICAL DISTINCTION**:',
      '• Completing our online inquiry form or clicking "Send to Studio WhatsApp" **does NOT constitute a confirmed booking or reservation of a detailing bay**.',
      '• An online inquiry is an expression of interest and technical information exchange.',
      '• A booking is **only confirmed** after our detailing management has reviewed bay availability, agreed upon a drop-off schedule with you via phone or WhatsApp, and (where applicable) recorded an advance appointment slot.',

      '### 4. Service Descriptions & Custom Quotes',
      '• All service descriptions, turnaround times, and process steps published on this website are indicative of standard studio protocols.',
      '• Automotive detailing is personalized craftsmanship. Every vehicle has distinct clearcoat hardness, paint thickness, scratch depth, and upholstery condition.',
      '• **Final service pricing and timelines are confirmed only after our technicians inspect your vehicle physically in our Padil studio bay** using digital paint depth gauges and high-CRI inspection lights.',

      '### 5. Intellectual Property Rights',
      'All text, brand assets, logos, design layouts, graphics, and photographs displayed on this website are the property of Calgary Premium Auto Detailing or are used with proper authorization.',
      'You may not copy, reproduce, republish, download, or distribute any content from this site for commercial purposes without prior written consent from Calgary Detailing.',

      '### 6. User Conduct & Acceptable Use',
      'You agree not to:',
      '• Submit fraudulent inquiries, impersonate others, or input fictitious phone numbers.',
      '• Attempt to disrupt, scrape, or reverse-engineer our web infrastructure.',
      '• Transmit any harmful code, viruses, or spam through our communication channels.',

      '### 7. External Third-Party Links',
      'Our website contains links to external platforms including WhatsApp, Google Maps, Instagram, and Justdial. We do not control these third-party platforms and are not responsible for their availability, content, or privacy practices.',

      '### 8. Limitation of Liability',
      'While we strive to ensure that all information on this website is accurate and current:',
      '• We provide this website on an "as-is" and "as-available" basis without warranties of any kind.',
      '• Calgary Detailing shall not be liable for any indirect, incidental, or consequential damages resulting from your use of or inability to access this website.',
      '• Nothing in these terms excludes or limits any consumer rights that cannot be excluded under the Consumer Protection Act, 2019 or other applicable Indian law.',

      '### 9. Governing Law & Jurisdiction',
      'These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with this website shall be subject to the exclusive jurisdiction of the competent courts in Mangaluru (Dakshina Kannada), Karnataka, India.'
    ],
    ownerReviewItems: [
      'Verify registered firm name and jurisdiction clause with legal advisor.'
    ]
  },

  serviceBooking: {
    id: 'serviceBooking',
    title: 'Service, Booking, Cancellation & Refund Policy',
    shortSummary: 'Practical studio procedures regarding bay scheduling, vehicle drop-offs, pre-existing defect sign-offs, cancellations, and the monthly maintenance wash benefit.',
    lastUpdated: 'October 2026 (Draft for Review)',
    content: [
      '### 1. Booking Workflow & Bay Scheduling',
      'Because our multi-stage paint correction and ceramic/PPF installations require clean, climate-timed studio bays and hours of dedicated machine work, we strictly limit the number of vehicles admitted per day.',
      '1. **Initial Inquiry**: Customer submits vehicle details through our inquiry wizard, phone, or WhatsApp.',
      '2. **Studio Consultation & Surface Inspection**: We inspect paint thickness and clearcoat health at our Padil studio and provide an itemized written quote.',
      '3. **Schedule Confirmation**: An arrival date and drop-off window are mutually agreed upon.',
      '4. **Advance Deposits**: [OWNER APPROVAL NEEDED: Specify if an advance booking deposit is required for multi-day ceramic/PPF bookings, e.g. "An advance deposit of 10–20% may be requested to reserve dedicated bay slots for full ceramic or PPF installations"].',

      '### 2. Vehicle Intake, Inspection & Belongings',
      '• **Valuables Removal**: Customers are requested to remove all personal belongings, cash, electronics, jewelry, and loose items from the vehicle prior to handover.',
      '• **Pre-Service Inspection Sheet**: Before commencing work, our team inspects the car alongside the owner. Pre-existing dents, deep scratches penetrating clearcoat, cracked glass, torn leather, or repainted body panels will be documented.',
      '• **Discovery of Hidden Defect**: If severe paint thinning, failing clearcoat, or hidden electrical issues are discovered after washing and decontaminating the car, our team will halt work on that section and contact the owner for approval before proceeding.',

      '### 3. Rescheduling & Cancellations',
      'We understand that plans change. We request courtesy notice so we can reallocate our detailing technicians:',
      '• **Notice Period**: Please notify us at least [OWNER APPROVAL NEEDED: E.g., "24 hours prior to your scheduled drop-off window"] if you need to reschedule or cancel.',
      '• **Rescheduling**: We will gladly transfer your appointment to the next mutually convenient bay opening at no additional penalty.',
      '• **Missed Appointments / No-Shows**: If a vehicle is not dropped off and no notice is provided, reserved bay space is lost and future priority scheduling may require an advance booking commitment.',

      '### 4. Payments, Refunds & Service Completion',
      '• **Final Payment**: Full payment is due upon vehicle completion and joint inspection before the car leaves our Padil studio.',
      '• **Accepted Payment Methods**: UPI (Google Pay, PhonePe, Paytm), Cash, Net Banking, and major Debit/Credit cards.',
      '• **Refunds**: Automotive detailing is a labor-intensive, irreversible craftsmanship service involving consumable chemicals and hours of manual skill. As such, cash refunds are generally not offered once physical work has been executed. If you have concerns about any area of your vehicle, please notify our lead detailer immediately during vehicle handover so we can rectify it on the spot.',

      '### 5. Ceramic Coating & PPF Maintenance Wash Terms',
      'For clients who purchase our eligible **Nano-Ceramic Coating** or **Paint Protection Film (PPF)** packages:',
      '• **Benefit**: Includes **1 complimentary professional maintenance wash once every month** at our Padil studio.',
      '• **Scope of Maintenance Wash**: Includes pH-neutral snow foam soak, two-bucket grit-guarded hand wash, wheel barrel iron purge, streak-free glass clean, and ceramic hydrophobic booster spray wipe.',
      '• **Scheduling Requirement**: Monthly washes must be scheduled in advance via WhatsApp or phone. They cannot be accumulated or rolled over across months.',
      '• **Voiding Conditions**: Harsh roadside acid washes, abrasive dry wiping, or unapproved compounding done outside Calgary Detailing may compromise coating hydrophobicity and warranty coverage.'
    ],
    ownerReviewItems: [
      'Approve deposit policy (yes/no and amount/percentage).',
      'Approve cancellation notice window (e.g. 24 hours vs 48 hours).',
      'Confirm any formal warranty terms for specific ceramic brands applied.'
    ]
  },

  disclaimer: {
    id: 'disclaimer',
    title: 'Service Estimate Disclaimer',
    shortSummary: 'Clarification that digital estimates are indicative and final pricing requires physical surface assessment.',
    lastUpdated: 'October 2026 (Draft for Review)',
    content: [
      '### 1. Nature of Online Estimates',
      'Any pricing indications, turnaround durations, and package descriptions communicated through this website, our inquiry wizard, or introductory WhatsApp messages are **indicative estimates only** and do not constitute a binding legal quotation.',
      'Service duration and vehicle collection depend on the selected service and the vehicle\'s condition. Contact Calgary Premium Auto Detailing for a personalised quotation and scheduling.',

      '### 2. Why Physical Studio Inspection Is Mandatory',
      'Unlike routine automated mechanical servicing, aesthetic detailing and paint restoration cannot be assessed accurately purely through online forms or photographs. Factors that alter work scope include:',
      '• **Clearcoat Thickness**: Measured in microns using digital paint gauges to ensure safe compounding margins.',
      '• **Scratch Depth**: Swirl marks can be polished out, but scratches through the basecoat require paint touch-up.',
      '• **Paint History**: Repainted panels often have softer or uneven clearcoat requiring specialized pads and compounds.',
      '• **Interior Contamination**: Heavy mold, water logging, smoke residue, or pet hair requires extra extraction cycles.',

      '### 3. No Unilateral Extra Charges',
      'We operate with complete financial transparency:',
      '• Our technicians will never perform extra billable work without your prior explanation and verbal or WhatsApp consent.',
      '• Walk-in inspections and digital paint depth checks at our Padil studio are always **100% complimentary and zero-obligation**.'
    ],
    ownerReviewItems: [
      'Review wording with studio team to ensure standard workflow aligns.'
    ]
  },

  grievance: {
    id: 'grievance',
    title: 'Privacy Requests & Grievance Redressal',
    shortSummary: 'Direct contact pathways to exercise your data rights, request data deletion, or resolve customer complaints.',
    lastUpdated: 'October 2026 (Draft for Review)',
    content: [
      '### 1. Consumer Grievance & Privacy Mechanism',
      'In accordance with the Digital Personal Data Protection Act, 2023 and the Consumer Protection (E-Commerce) Rules, 2020, Calgary Premium Auto Detailing provides clear, accessible channels for customer communication, privacy inquiries, and complaint redressal.',

      '### 2. How to Submit a Privacy or Service Request',
      'You may reach out to us through any of the following channels:',
      '• **In-Person Visit**: Calgary Premium Auto Detailing, Near Padil Junction, Bypass Road, Padil, Mangaluru, Karnataka 575007',
      '• **Telephone / WhatsApp**: +91 97456 03303 (Direct studio line, Mon–Sat: 9:00 AM – 7:30 PM)',
      '• **Email**: calgary.mangalore@gmail.com [OWNER APPROVAL NEEDED: Official email address]',

      '### 3. Types of Requests We Handle',
      '1. **Data Access & Summary Request**: Receive a summary of inquiry details retained under your phone number.',
      '2. **Data Correction Request**: Update an incorrect phone number, vehicle model, or address.',
      '3. **Data Erasure Request**: Request deletion of your contact records from our messaging logs.',
      '4. **Service Quality Feedback**: Discuss any concerns regarding work performed on your vehicle.',

      '### 4. Response & Resolution Timelines',
      '• **Acknowledgment**: Within 48 hours of receipt.',
      '• **Resolution / Response**: We endeavor to address and resolve all legitimate inquiries or complaints within 15 to 30 business days, in compliance with applicable statutory timelines.'
    ],
    ownerReviewItems: [
      'Designate specific personnel responsible for monitoring privacy emails.',
      'Confirm official grievance escalation protocol.'
    ]
  }
};
