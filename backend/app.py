from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///campus_hub.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class Club(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    logo_url = db.Column(db.String(200), nullable=True)
    events = db.relationship('Event', backref='club', lazy=True)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    club_id = db.Column(db.Integer, db.ForeignKey('club.id'), nullable=False)

# Seed database for development if empty
def seed_data():
    if Club.query.count() == 0:
        club1 = Club(name="Computer Science Society", description="For all things tech and coding.", logo_url="https://api.dicebear.com/7.x/shapes/svg?seed=cs")
        club2 = Club(name="Art & Design Club", description="Unleash your creativity.", logo_url="https://api.dicebear.com/7.x/shapes/svg?seed=art")
        db.session.add(club1)
        db.session.add(club2)
        db.session.commit()
        
        event1 = Event(title="Hackathon Kickoff 2026", date="Oct 15", time="6:00 PM", location="Main Auditorium", description="Join us for the opening ceremony and team formation.", club=club1)
        event2 = Event(title="UI/UX Workshop", date="Oct 18", time="4:00 PM", location="Design Lab 3", description="Learn the principles of modern interface design.", club=club2)
        db.session.add(event1)
        db.session.add(event2)
        db.session.commit()

# Create tables within app context
with app.app_context():
    db.create_all()
    seed_data()

# Routes
@app.route('/')
def index():
    events = Event.query.all()
    clubs = Club.query.all()
    return render_template('index.html', events=events, clubs=clubs)

@app.route('/post_event', methods=['POST'])
def post_event():
    title = request.form.get('title')
    club_id = request.form.get('club_id')
    date = request.form.get('date')
    time = request.form.get('time')
    location = request.form.get('location')
    description = request.form.get('description')
    
    if title and club_id and date and time and location:
        new_event = Event(
            title=title,
            club_id=club_id,
            date=date,
            time=time,
            location=location,
            description=description
        )
        db.session.add(new_event)
        db.session.commit()
        
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
