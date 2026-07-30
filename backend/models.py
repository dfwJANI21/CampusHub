from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import datetime

DATABASE_URL = "sqlite:///./campushub.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id       = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    name     = Column(String, nullable=False)
    password = Column(String, nullable=False)  # hashed
    role     = Column(String, default="student")  # student | admin
    rsvps    = relationship("RSVP", back_populates="user")
    requests = relationship("JoinRequest", back_populates="user")


class Event(Base):
    __tablename__ = "events"
    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String, nullable=False)
    club        = Column(String, nullable=False)
    date        = Column(String, nullable=False)
    time        = Column(String, nullable=False)
    duration    = Column(String, nullable=False)
    location    = Column(String, nullable=False)
    room        = Column(String, nullable=False)
    host        = Column(String, nullable=False)
    topic       = Column(String, nullable=False)
    description = Column(String, default="")
    image       = Column(String, default="")
    tag         = Column(String, default="Academic")
    is_paid     = Column(Boolean, default=False)
    price       = Column(Float, nullable=True)
    created_at  = Column(DateTime, default=datetime.datetime.utcnow)
    rsvps       = relationship("RSVP", back_populates="event")


class Club(Base):
    __tablename__ = "clubs"
    id               = Column(Integer, primary_key=True, index=True)
    name             = Column(String, nullable=False)
    category         = Column(String, nullable=False)
    president        = Column(String, nullable=False)
    founded          = Column(String, default="2026")
    description      = Column(String, default="")
    meeting_schedule = Column(String, default="")
    image            = Column(String, default="")
    created_at       = Column(DateTime, default=datetime.datetime.utcnow)
    members          = relationship("JoinRequest", back_populates="club")


class RSVP(Base):
    __tablename__ = "rsvps"
    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"))
    event_id   = Column(Integer, ForeignKey("events.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    user       = relationship("User", back_populates="rsvps")
    event      = relationship("Event", back_populates="rsvps")


class JoinRequest(Base):
    __tablename__ = "join_requests"
    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"))
    club_id    = Column(Integer, ForeignKey("clubs.id"))
    status     = Column(String, default="pending")  # pending | approved | rejected
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    user       = relationship("User", back_populates="requests")
    club       = relationship("Club", back_populates="members")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
