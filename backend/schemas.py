from pydantic import BaseModel
from typing import Optional
import datetime


# ── Auth ──────────────────────────────────────────────
class UserCreate(BaseModel):
    username: str
    name: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    name: str
    role: str
    class Config: from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut


# ── Events ────────────────────────────────────────────
class EventCreate(BaseModel):
    title: str
    club: str
    date: str
    time: str
    duration: str
    location: str
    room: str
    host: str
    topic: str
    description: Optional[str] = ""
    image: Optional[str] = ""
    tag: Optional[str] = "Academic"
    is_paid: Optional[bool] = False
    price: Optional[float] = None

class EventOut(BaseModel):
    id: int
    title: str
    club: str
    date: str
    time: str
    duration: str
    location: str
    room: str
    host: str
    topic: str
    description: str
    image: str
    tag: str
    is_paid: bool
    price: Optional[float]
    attendees_count: int
    rsvpd: bool = False
    created_at: datetime.datetime
    class Config: from_attributes = True


# ── Clubs ─────────────────────────────────────────────
class ClubCreate(BaseModel):
    name: str
    category: str
    president: str
    founded: Optional[str] = "2026"
    description: Optional[str] = ""
    meeting_schedule: Optional[str] = ""
    image: Optional[str] = ""

class ClubOut(BaseModel):
    id: int
    name: str
    category: str
    president: str
    founded: str
    description: str
    meeting_schedule: str
    image: str
    members_count: int
    requested: bool = False
    created_at: datetime.datetime
    class Config: from_attributes = True


# ── RSVP / Join ───────────────────────────────────────
class RSVPOut(BaseModel):
    event_id: int
    user_id: int
    class Config: from_attributes = True

class JoinRequestOut(BaseModel):
    club_id: int
    user_id: int
    status: str
    class Config: from_attributes = True
