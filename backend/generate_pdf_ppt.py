from fpdf import FPDF

class Presentation(FPDF):
    def footer(self):
        self.set_y(-15)
        self.set_text_color(150, 150, 150)
        self.set_font('helvetica', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

    def add_title_slide(self, title, subtitle, presenters):
        self.add_page()
        self.set_fill_color(9, 9, 11)
        self.rect(0, 0, 297, 210, 'F')
        
        self.set_text_color(250, 250, 250)
        self.set_y(60)
        self.set_font('helvetica', 'B', 32)
        self.cell(0, 20, title, align='C', ln=1)
        
        self.set_font('helvetica', '', 16)
        self.cell(0, 15, subtitle, align='C', ln=1)
        
        self.set_y(120)
        self.set_font('helvetica', 'I', 14)
        self.cell(0, 10, "Presented by:", align='C', ln=1)
        self.set_font('helvetica', 'B', 14)
        self.cell(0, 10, presenters, align='C', ln=1)

    def add_content_slide(self, title, bullet_points):
        self.add_page()
        self.set_fill_color(24, 24, 27)
        self.rect(0, 0, 297, 210, 'F')
        
        self.set_text_color(139, 92, 246)
        self.set_y(20)
        self.set_font('helvetica', 'B', 24)
        self.cell(0, 15, title, align='L', ln=1)
        self.ln(10)
        
        self.set_text_color(250, 250, 250)
        self.set_font('helvetica', '', 16)
        for point in bullet_points:
            self.cell(10, 10, "-", align='R')
            self.multi_cell(0, 10, point)
            self.ln(5)

pdf = Presentation(orientation='L', unit='mm', format='A4')
pdf.set_auto_page_break(auto=True, margin=15)

# Slide 1
pdf.add_title_slide(
    "Campus Event & Club Hub", 
    "A Centralized Platform for College Clubs and Events", 
    "Chavda Pruthviraj, Jainam Jani, Pansare Dhruv, Gaurav Sengar"
)

# Slide 2
pdf.add_content_slide(
    "The Problem", 
    [
        "Campus life can be disconnected and chaotic.",
        "Students often miss out on events because information is scattered.",
        "Clubs struggle to reach the student body effectively.",
        "Reliance on noisy WhatsApp groups and easily ignored bulletin boards."
    ]
)

# Slide 3
pdf.add_content_slide(
    "Our Solution", 
    [
        "Introducing the Campus Event & Club Hub:",
        "A modern, unified web application dedicated entirely to campus activities.",
        "Bridges the communication gap between clubs and students.",
        "Provides a single source of truth for what's happening on campus."
    ]
)

# Slide 4
pdf.add_content_slide(
    "Key Features (For Students)", 
    [
        "Discover upcoming events easily through a beautiful, masonry-style feed.",
        "Get detailed information: Time, Location, Host Club, and full Descriptions.",
        "Explore all active clubs on campus in a dedicated directory.",
        "Stay engaged with campus life without the FOMO (Fear Of Missing Out)."
    ]
)

# Slide 5
pdf.add_content_slide(
    "Key Features (For Clubs)", 
    [
        "Easy-to-use 'Post Event' form to announce activities instantly.",
        "Direct outreach to a broader, targeted student audience.",
        "Dedicated branding and visibility within the centralized hub.",
        "Increase event attendance and club membership."
    ]
)

# Slide 6
pdf.add_content_slide(
    "Technology Stack", 
    [
        "Backend: Python with the Flask Framework.",
        "Database: SQLite with SQLAlchemy ORM for relational data management.",
        "Frontend: HTML5, CSS3, and Vanilla JavaScript with Jinja2 Templating.",
        "Design System: Custom Dark Theme utilizing Glassmorphism UI."
    ]
)

# Slide 7
pdf.add_content_slide(
    "System Architecture", 
    [
        "Built using the MVC (Model-View-Controller) Pattern:",
        "Model: SQLAlchemy handles database schemas (Club, Event) and queries.",
        "View: Jinja2 templates render dynamic, data-driven HTML pages.",
        "Controller: Flask routes process incoming HTTP requests and logic."
    ]
)

# Slide 8
pdf.add_content_slide(
    "Database Schema", 
    [
        "Relational database structure ensuring data integrity:",
        "Club Model: ID (PK), Name, Description, Logo URL.",
        "Event Model: ID (PK), Title, Date, Time, Location, Description, Club ID (FK).",
        "Relationship: One-to-Many (One Club can host Many Events)."
    ]
)

# Slide 9
pdf.add_content_slide(
    "Future Enhancements", 
    [
        "User Authentication for personalized student profiles and admin dashboards.",
        "Integrated RSVP and Event Ticketing System.",
        "Email and Push Notifications for event reminders and club updates.",
        "Calendar integration for seamless scheduling."
    ]
)

# Slide 10
pdf.add_content_slide(
    "Conclusion", 
    [
        "The Campus Event & Club Hub modernizes how students interact with their college.",
        "Enhancing campus life through better connectivity, beautiful design, and utility.",
        "Thank You!",
        "Any Questions?"
    ]
)

pdf.output("Campus_Hub_Presentation.pdf")
print("PDF Presentation generated successfully at Campus_Hub_Presentation.pdf")
