export type Event = {
  id: number;
  title: string;
  club: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  room: string;
  host: string;
  topic: string;
  description: string;
  image: string;
  tag: string;
  isPaid: boolean;
  price?: number;
  rsvpd: boolean;
  attendeesCount: number;
};

export type Club = {
  id: number;
  name: string;
  category: string;
  members: number;
  president: string;
  founded: string;
  description: string;
  meetingSchedule: string;
  image: string;
  requested: boolean;
  events: string[];
};

export type User = {
  username: string;
  password: string;
  name: string;
};

export const USERS: User[] = [
  { username: "manoj", password: "pass123", name: "Manoj Kumar" },
  { username: "priya", password: "pass123", name: "Priya Sharma" },
  { username: "admin", password: "admin123", name: "Admin User" },
];

export const EVENTS: Event[] = [
  {
    id: 1,
    title: "Neon Nights Hackathon",
    club: "Computer Science Society",
    date: "Oct 15, 2026",
    time: "6:00 PM",
    duration: "48 Hours",
    location: "Innovation Hub",
    room: "Block C, Room 201",
    host: "Prof. Arjun Mehta",
    topic: "AI-Powered Applications",
    description: "The most intense coding marathon of the year! Build AI-powered apps in 48 hours. Prizes worth ₹1,00,000. Free food and swag for all participants. Teams of 2-4.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    tag: "Technology",
    isPaid: false,
    rsvpd: false,
    attendeesCount: 142,
  },
  {
    id: 2,
    title: "Symphony Under the Stars",
    club: "Music & Arts Club",
    date: "Oct 18, 2026",
    time: "8:00 PM",
    duration: "3 Hours",
    location: "Campus Amphitheater",
    room: "Open Air Stage, South Campus",
    host: "Ms. Kavya Nair",
    topic: "Classical & Acoustic Fusion",
    description: "An enchanting evening of live acoustic and classical music. Students from Music & Arts Club perform original compositions under the open sky. Bring your blankets!",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
    tag: "Arts",
    isPaid: true,
    price: 150,
    rsvpd: false,
    attendeesCount: 89,
  },
  {
    id: 3,
    title: "AI & The Future of Education",
    club: "Debate Society",
    date: "Oct 22, 2026",
    time: "5:00 PM",
    duration: "2 Hours",
    location: "Main Auditorium",
    room: "Block A, Auditorium Hall",
    host: "Dr. Sneha Pillai",
    topic: "Should AI replace teachers?",
    description: "A structured Oxford-style debate on whether Artificial Intelligence should be embraced or restricted in modern classrooms. Open Q&A after the debate.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    tag: "Academic",
    isPaid: false,
    rsvpd: false,
    attendeesCount: 215,
  },
  {
    id: 4,
    title: "Photography Masterclass",
    club: "Photography Guild",
    date: "Oct 25, 2026",
    time: "10:00 AM",
    duration: "4 Hours",
    location: "Arts Block",
    room: "Block D, Studio Lab 1",
    host: "Mr. Rahul Verma",
    topic: "Composition & Lighting Techniques",
    description: "A hands-on photography workshop covering advanced composition rules, natural and studio lighting, and post-processing in Lightroom. Bring your DSLR or mirrorless camera.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    tag: "Creative",
    isPaid: true,
    price: 299,
    rsvpd: false,
    attendeesCount: 45,
  },
  {
    id: 5,
    title: "Startup Pitch Night",
    club: "FinTech Society",
    date: "Nov 2, 2026",
    time: "7:00 PM",
    duration: "3 Hours",
    location: "Business School",
    room: "Block B, Seminar Hall 2",
    host: "Mr. Vikram Rao",
    topic: "From Idea to Investor",
    description: "Present your startup idea to a panel of real investors and industry veterans. Top 3 teams win seed funding and mentorship. Register your team of 1-3.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    tag: "Business",
    isPaid: false,
    rsvpd: false,
    attendeesCount: 178,
  },
  {
    id: 6,
    title: "Robotics Battle Arena",
    club: "Robotics Alpha",
    date: "Nov 8, 2026",
    time: "2:00 PM",
    duration: "5 Hours",
    location: "Engineering Block",
    room: "Block E, Robotics Lab",
    host: "Prof. Anil Sharma",
    topic: "Combat Robotics & Automation",
    description: "Watch and participate in an epic robot battle competition. Build your bot before the event or come cheer for your favourite team. Snacks and merchandise available on-site.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    tag: "Technology",
    isPaid: true,
    price: 200,
    rsvpd: false,
    attendeesCount: 310,
  },
];

export const CLUBS: Club[] = [
  {
    id: 1,
    name: "Robotics Alpha",
    category: "Engineering",
    members: 340,
    president: "Ankit Joshi",
    founded: "2018",
    description: "We design, build and program cutting-edge robots. From line followers to combat bots and autonomous drones, we compete at national and international levels.",
    meetingSchedule: "Every Saturday, 3:00 PM – Block E, Robotics Lab",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    requested: false,
    events: ["Robotics Battle Arena"],
  },
  {
    id: 2,
    name: "Photography Guild",
    category: "Creative",
    members: 210,
    president: "Riya Desai",
    founded: "2020",
    description: "For those who see the world through a lens. We conduct shoots, workshops, exhibitions and photo walks. All skill levels welcome — from phone cameras to professional DSLRs.",
    meetingSchedule: "Every Wednesday, 5:00 PM – Block D, Studio Lab",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    requested: true,
    events: ["Photography Masterclass"],
  },
  {
    id: 3,
    name: "FinTech Society",
    category: "Business",
    members: 185,
    president: "Aryan Kapoor",
    founded: "2021",
    description: "Bridging finance and technology. We discuss crypto, stock markets, startup funding, and emerging fintech trends. Host the annual Startup Pitch Night on campus.",
    meetingSchedule: "Every Friday, 6:00 PM – Block B, Seminar Hall",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    requested: false,
    events: ["Startup Pitch Night"],
  },
  {
    id: 4,
    name: "Computer Science Society",
    category: "Technology",
    members: 520,
    president: "Meera Pillai",
    founded: "2015",
    description: "The largest tech club on campus. We run coding bootcamps, hackathons, open source contributions, competitive programming, and guest lectures from top engineers.",
    meetingSchedule: "Every Tuesday & Thursday, 7:00 PM – Block C, Lab 201",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    requested: false,
    events: ["Neon Nights Hackathon"],
  },
  {
    id: 5,
    name: "Debate Society",
    category: "Academic",
    members: 130,
    president: "Siddharth Bose",
    founded: "2017",
    description: "Sharpen your arguments and public speaking skills. We practice British Parliamentary, Oxford, and MUN formats. Regular inter-college competitions and an annual championship.",
    meetingSchedule: "Every Monday, 5:30 PM – Block A, Seminar Room 3",
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80",
    requested: false,
    events: ["AI & The Future of Education"],
  },
  {
    id: 6,
    name: "Music & Arts Club",
    category: "Arts",
    members: 275,
    president: "Kavya Nair",
    founded: "2016",
    description: "Express yourself through music, dance, painting, and theatre. We produce annual shows, participate in college fests, and host open-mic nights every month.",
    meetingSchedule: "Every Sunday, 4:00 PM – Amphitheater / Arts Block",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
    requested: false,
    events: ["Symphony Under the Stars"],
  },
];
