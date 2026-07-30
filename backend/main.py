from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

import models, schemas
from models import Base, engine, get_db, User, Event, Club, RSVP, JoinRequest

# ── Init ──────────────────────────────────────────────────────────────────────
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CampusHub API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "campushub_super_secret_2026"
ALGORITHM  = "HS256"
TOKEN_EXP  = 60 * 24  # 24 hours

import bcrypt as _bcrypt
oauth2    = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=False)


# ── Helpers ───────────────────────────────────────────────────────────────────
def hash_pw(pw: str) -> str:      return _bcrypt.hashpw(pw.encode(), _bcrypt.gensalt()).decode()
def verify_pw(pw: str, hashed: str) -> bool: return _bcrypt.checkpw(pw.encode(), hashed.encode())

def create_token(data: dict) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=TOKEN_EXP)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2), db: Session = Depends(get_db)) -> Optional[User]:
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if not username:
            return None
    except JWTError:
        return None
    return db.query(User).filter(User.username == username).first()

def require_user(user: Optional[User] = Depends(get_current_user)) -> User:
    if not user:
        raise HTTPException(status_code=401, detail="Please log in first")
    return user


# ── Seed data (runs once on startup) ──────────────────────────────────────────
@app.on_event("startup")
def seed():
    db = next(get_db())
    if db.query(User).count() == 0:
        db.add(User(username="manoj",  name="Manoj Kumar",  password=hash_pw("pass123")))
        db.add(User(username="priya",  name="Priya Sharma", password=hash_pw("pass123")))
        db.add(User(username="admin",  name="Admin User",   password=hash_pw("admin123"), role="admin"))
        db.commit()

    if db.query(Event).count() == 0:
        events = [
            Event(title="Neon Nights Hackathon",      club="Computer Science Society", date="Oct 15, 2026", time="6:00 PM", duration="48 Hours", location="Innovation Hub",     room="Block C, Room 201",            host="Prof. Arjun Mehta",  topic="AI-Powered Applications",         description="The most intense coding marathon of the year! Build AI apps in 48 hours. Prizes worth ₹1,00,000.", image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", tag="Technology", is_paid=False),
            Event(title="Symphony Under the Stars",   club="Music & Arts Club",        date="Oct 18, 2026", time="8:00 PM", duration="3 Hours",  location="Campus Amphitheater", room="Open Air Stage, South Campus", host="Ms. Kavya Nair",     topic="Classical & Acoustic Fusion",     description="An enchanting evening of live acoustic and classical music under the open sky.",               image="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80", tag="Arts",       is_paid=True,  price=150),
            Event(title="AI & The Future of Education", club="Debate Society",          date="Oct 22, 2026", time="5:00 PM", duration="2 Hours",  location="Main Auditorium",     room="Block A, Auditorium Hall",     host="Dr. Sneha Pillai",   topic="Should AI replace teachers?",    description="A structured Oxford-style debate on AI in classrooms. Open Q&A after.",                       image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80", tag="Academic",   is_paid=False),
            Event(title="Photography Masterclass",    club="Photography Guild",        date="Oct 25, 2026", time="10:00 AM",duration="4 Hours",  location="Arts Block",          room="Block D, Studio Lab 1",        host="Mr. Rahul Verma",    topic="Composition & Lighting",          description="Hands-on workshop covering advanced composition, lighting, and Lightroom post-processing.",   image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", tag="Creative",   is_paid=True,  price=299),
            Event(title="Startup Pitch Night",        club="FinTech Society",          date="Nov 2, 2026",  time="7:00 PM", duration="3 Hours",  location="Business School",     room="Block B, Seminar Hall 2",      host="Mr. Vikram Rao",     topic="From Idea to Investor",           description="Present your startup to real investors. Top 3 teams win seed funding and mentorship.",        image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80", tag="Business",   is_paid=False),
            Event(title="Robotics Battle Arena",      club="Robotics Alpha",           date="Nov 8, 2026",  time="2:00 PM", duration="5 Hours",  location="Engineering Block",   room="Block E, Robotics Lab",        host="Prof. Anil Sharma",  topic="Combat Robotics & Automation",   description="Watch and participate in an epic robot battle. Build your bot or cheer for your favourite!",  image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80", tag="Technology", is_paid=True,  price=200),
        ]
        db.add_all(events); db.commit()

    if db.query(Club).count() == 0:
        clubs = [
            Club(name="Robotics Alpha",        category="Engineering", president="Ankit Joshi",   founded="2018", description="We design, build and program cutting-edge robots. From line followers to combat bots and autonomous drones.",   meeting_schedule="Every Saturday, 3:00 PM – Block E, Robotics Lab",    image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"),
            Club(name="Photography Guild",     category="Creative",    president="Riya Desai",    founded="2020", description="For those who see the world through a lens. Workshops, exhibitions and photo walks. All skill levels welcome.", meeting_schedule="Every Wednesday, 5:00 PM – Block D, Studio Lab",      image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"),
            Club(name="FinTech Society",       category="Business",    president="Aryan Kapoor",  founded="2021", description="Bridging finance and technology. We discuss crypto, markets, startup funding and emerging fintech trends.",      meeting_schedule="Every Friday, 6:00 PM – Block B, Seminar Hall",       image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80"),
            Club(name="Computer Science Society", category="Technology", president="Meera Pillai", founded="2015", description="The largest tech club on campus. Coding bootcamps, hackathons, open source and competitive programming.",     meeting_schedule="Every Tue & Thu, 7:00 PM – Block C, Lab 201",        image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"),
            Club(name="Debate Society",        category="Academic",    president="Siddharth Bose", founded="2017", description="Sharpen your arguments and public speaking. British Parliamentary, Oxford and MUN formats practiced weekly.", meeting_schedule="Every Monday, 5:30 PM – Block A, Seminar Room 3",     image="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80"),
            Club(name="Music & Arts Club",     category="Arts",        president="Kavya Nair",    founded="2016", description="Express yourself through music, dance, painting and theatre. Annual shows and monthly open-mic nights.",        meeting_schedule="Every Sunday, 4:00 PM – Amphitheater / Arts Block",   image="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80"),
        ]
        db.add_all(clubs); db.commit()


# ── AUTH routes ───────────────────────────────────────────────────────────────
@app.post("/auth/register", response_model=schemas.Token)
def register(body: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == body.username).first():
        raise HTTPException(400, "Username already taken")
    user = User(username=body.username, name=body.name, password=hash_pw(body.password))
    db.add(user); db.commit(); db.refresh(user)
    token = create_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer", "user": user}

@app.post("/auth/login", response_model=schemas.Token)
def login(body: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == body.username).first()
    if not user or not verify_pw(body.password, user.password):
        raise HTTPException(401, "Invalid username or password")
    token = create_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer", "user": user}

@app.get("/auth/me", response_model=schemas.UserOut)
def me(user: User = Depends(require_user)):
    return user


# ── EVENT routes ──────────────────────────────────────────────────────────────
@app.get("/events", response_model=list[schemas.EventOut])
def list_events(db: Session = Depends(get_db), user: Optional[User] = Depends(get_current_user)):
    events = db.query(Event).order_by(Event.created_at.asc()).all()
    result = []
    for e in events:
        rsvpd = bool(user and db.query(RSVP).filter_by(user_id=user.id, event_id=e.id).first())
        result.append(schemas.EventOut(
            **{c.name: getattr(e, c.name) for c in Event.__table__.columns},
            attendees_count=len(e.rsvps), rsvpd=rsvpd
        ))
    return result

@app.post("/events", response_model=schemas.EventOut)
def create_event(body: schemas.EventCreate, db: Session = Depends(get_db), user: User = Depends(require_user)):
    ev = Event(**body.model_dump())
    db.add(ev); db.commit(); db.refresh(ev)
    return schemas.EventOut(**{c.name: getattr(ev, c.name) for c in Event.__table__.columns}, attendees_count=0, rsvpd=False)

@app.delete("/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db), user: User = Depends(require_user)):
    ev = db.query(Event).filter(Event.id == event_id).first()
    if not ev: raise HTTPException(404, "Event not found")
    db.delete(ev); db.commit()
    return {"message": "Deleted"}

@app.post("/events/{event_id}/rsvp")
def toggle_rsvp(event_id: int, db: Session = Depends(get_db), user: User = Depends(require_user)):
    existing = db.query(RSVP).filter_by(user_id=user.id, event_id=event_id).first()
    if existing:
        db.delete(existing); db.commit()
        return {"rsvpd": False, "message": "RSVP cancelled"}
    db.add(RSVP(user_id=user.id, event_id=event_id)); db.commit()
    return {"rsvpd": True, "message": "RSVP confirmed"}

@app.get("/events/{event_id}/attendees", response_model=list[schemas.UserOut])
def get_attendees(event_id: int, db: Session = Depends(get_db)):
    rsvps = db.query(RSVP).filter_by(event_id=event_id).all()
    return [r.user for r in rsvps]


# ── CLUB routes ───────────────────────────────────────────────────────────────
@app.get("/clubs", response_model=list[schemas.ClubOut])
def list_clubs(db: Session = Depends(get_db), user: Optional[User] = Depends(get_current_user)):
    clubs = db.query(Club).order_by(Club.created_at.asc()).all()
    result = []
    for c in clubs:
        requested = bool(user and db.query(JoinRequest).filter_by(user_id=user.id, club_id=c.id).first())
        result.append(schemas.ClubOut(
            **{col.name: getattr(c, col.name) for col in Club.__table__.columns},
            members_count=len(c.members), requested=requested
        ))
    return result

@app.post("/clubs", response_model=schemas.ClubOut)
def create_club(body: schemas.ClubCreate, db: Session = Depends(get_db), user: User = Depends(require_user)):
    cl = Club(**body.model_dump())
    db.add(cl); db.commit(); db.refresh(cl)
    return schemas.ClubOut(**{col.name: getattr(cl, col.name) for col in Club.__table__.columns}, members_count=0, requested=False)

@app.post("/clubs/{club_id}/join")
def toggle_join(club_id: int, db: Session = Depends(get_db), user: User = Depends(require_user)):
    existing = db.query(JoinRequest).filter_by(user_id=user.id, club_id=club_id).first()
    if existing:
        db.delete(existing); db.commit()
        return {"requested": False, "message": "Request withdrawn"}
    db.add(JoinRequest(user_id=user.id, club_id=club_id)); db.commit()
    return {"requested": True, "message": "Join request sent"}

@app.get("/clubs/{club_id}/members", response_model=list[schemas.JoinRequestOut])
def get_members(club_id: int, db: Session = Depends(get_db)):
    return db.query(JoinRequest).filter_by(club_id=club_id).all()


# ── Health check ──────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "CampusHub API is running 🚀", "docs": "/docs"}
