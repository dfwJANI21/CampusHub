"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Star, Users, CheckCircle2, LogOut, Plus, Search, X } from "lucide-react";
import { EVENTS, CLUBS, Event, Club, User } from "./data";
import { EventModal } from "./EventModal";
import { ClubModal } from "./ClubModal";
import { AuthModal } from "./AuthModal";
import { CreateModal } from "./CreateModal";
import { Particles } from "./Particles";
import { Countdown } from "./Countdown";
import { ToastContainer, showToast } from "./Toast";

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const itemAnim  = { hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } } };

const TAGS = ["All", "Technology", "Arts", "Academic", "Creative", "Business", "Engineering"];
const TAG_BG: Record<string,string> = { Technology:"rgba(0,180,216,.15)", Arts:"rgba(157,78,221,.15)", Academic:"rgba(255,180,0,.12)", Creative:"rgba(255,0,110,.12)", Business:"rgba(0,255,110,.10)", Engineering:"rgba(255,120,0,.12)" };
const TAG_FG: Record<string,string> = { Technology:"#90e0ef", Arts:"#e0aaff", Academic:"#ffd60a", Creative:"#ff6b9d", Business:"#00ff6e", Engineering:"#ffb347" };

const TICKER_ITEMS = [
  "🚀 Neon Nights Hackathon — 142 students registered!",
  "🎵 Symphony Under the Stars — Only 11 spots left!",
  "🤖 Robotics Battle Arena — Registration open now",
  "🏆 Startup Pitch Night — Win seed funding!",
  "📸 Photography Masterclass — ₹299 entry · Limited seats",
  "🧠 AI & The Future — Free entry · All welcome",
];

function LiveTicker() {
  return (
    <div style={{ background:"rgba(157,78,221,.08)", borderBottom:"1px solid rgba(157,78,221,.2)", padding:"0.45rem 0", overflow:"hidden", position:"relative", zIndex:150 }}>
      <div style={{ display:"flex", animation:"ticker 30s linear infinite", whiteSpace:"nowrap", gap:"4rem" }}>
        {[...TICKER_ITEMS,...TICKER_ITEMS].map((t,i)=>(
          <span key={i} style={{ color:"#e0aaff", fontSize:"0.8rem", fontWeight:500, flexShrink:0 }}>{t}</span>
        ))}
      </div>
      <style>{`@keyframes ticker{ from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

export default function Home() {
  const [events, setEvents]   = useState<Event[]>(EVENTS);
  const [clubs, setClubs]     = useState<Club[]>(CLUBS);
  const [activeEvent, setActiveEvent] = useState<Event|null>(null);
  const [activeClub,  setActiveClub]  = useState<Club|null>(null);
  const [showAuth,    setShowAuth]    = useState(false);
  const [showCreate,  setShowCreate]  = useState<"event"|"club"|null>(null);
  const [user,        setUser]        = useState<User|null>(null);
  const [search,      setSearch]      = useState("");
  const [activeTag,   setActiveTag]   = useState("All");

  const scrollTo = (id:string) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  const requireAuth = (cb:()=>void) => { if(!user){setShowAuth(true);showToast("Please log in first","info");} else cb(); };

  const handleRSVP = (id:number) => requireAuth(()=>{
    setEvents(ev=>ev.map(e=>e.id===id?{...e,rsvpd:!e.rsvpd,attendeesCount:e.rsvpd?e.attendeesCount-1:e.attendeesCount+1}:e));
    setActiveEvent(prev=>prev?.id===id?{...prev,rsvpd:!prev.rsvpd,attendeesCount:prev.rsvpd?prev.attendeesCount-1:prev.attendeesCount+1}:prev);
    const ev=events.find(e=>e.id===id);
    showToast(ev?.rsvpd?`Cancelled RSVP for "${ev.title}"`:`You're going to "${ev?.title}"! 🎉`,"success");
  });

  const handleClubToggle = (id:number) => requireAuth(()=>{
    setClubs(cl=>cl.map(c=>c.id===id?{...c,requested:!c.requested}:c));
    setActiveClub(prev=>prev?.id===id?{...prev,requested:!prev.requested}:prev);
    const cl=clubs.find(c=>c.id===id);
    showToast(cl?.requested?`Withdrew request from "${cl.name}"`:`Join request sent to "${cl?.name}"! 🎯`,"success");
  });

  const handleAdd = (newItem:Event|Club) => {
    if(showCreate==="event"){ setEvents(ev=>[...ev,newItem as Event]); showToast(`Event "${(newItem as Event).title}" posted! 🚀`,"success"); }
    else { setClubs(cl=>[...cl,newItem as Club]); showToast(`Club "${(newItem as Club).name}" created! 🎯`,"success"); }
  };

  const filteredEvents = useMemo(()=>events.filter(e=>{
    const matchTag = activeTag==="All"||e.tag===activeTag;
    const matchSearch = !search||e.title.toLowerCase().includes(search.toLowerCase())||e.club.toLowerCase().includes(search.toLowerCase())||e.host.toLowerCase().includes(search.toLowerCase());
    return matchTag&&matchSearch;
  }),[events,activeTag,search]);

  const cardStyle = { cursor:"pointer", borderRadius:"1.25rem", overflow:"hidden", background:"linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.01))", border:"1px solid rgba(255,255,255,.08)", boxShadow:"0 8px 32px rgba(0,0,0,.3)", display:"flex", flexDirection:"column" as const };

  return (
    <>
      <Particles />
      <ToastContainer />
      <main style={{position:"relative",zIndex:1}}>

        {/* NAVBAR */}
        <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:"rgba(3,0,20,.75)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
          <div style={{maxWidth:1300,margin:"0 auto",padding:"0.85rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div className="text-gradient" style={{fontSize:"1.4rem",fontWeight:800}}>CampusHub</div>
            <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
              <button style={{background:"none",border:"none",color:"#adb5bd",fontWeight:500,cursor:"pointer",fontSize:"0.9rem",fontFamily:"inherit"}} onClick={()=>scrollTo("events")}>Events</button>
              <button style={{background:"none",border:"none",color:"#adb5bd",fontWeight:500,cursor:"pointer",fontSize:"0.9rem",fontFamily:"inherit"}} onClick={()=>scrollTo("clubs")}>Clubs</button>
              {user&&<>
                <button onClick={()=>setShowCreate("event")} className="btn btn-secondary" style={{padding:"0.4rem 0.9rem",fontSize:"0.82rem",display:"flex",alignItems:"center",gap:"0.3rem"}}><Plus size={14}/>Post Event</button>
                <button onClick={()=>setShowCreate("club")} className="btn btn-secondary" style={{padding:"0.4rem 0.9rem",fontSize:"0.82rem",display:"flex",alignItems:"center",gap:"0.3rem"}}><Plus size={14}/>New Club</button>
              </>}
              {user?(
                <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
                  <span style={{padding:"0.4rem 0.9rem",background:"rgba(157,78,221,.12)",border:"1px solid rgba(157,78,221,.3)",borderRadius:"9999px",color:"#e0aaff",fontWeight:600,fontSize:"0.85rem"}}>{user.name.split(" ")[0]}</span>
                  <button onClick={()=>{setUser(null);showToast("Logged out","info");}} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"50%",width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",color:"#adb5bd",cursor:"pointer"}}><LogOut size={15}/></button>
                </div>
              ):(
                <button className="btn btn-primary" style={{padding:"0.45rem 1.4rem",fontSize:"0.88rem"}} onClick={()=>setShowAuth(true)}>Log In</button>
              )}
            </div>
          </div>
        </nav>

        {/* TICKER */}
        <div style={{paddingTop:"57px"}}><LiveTicker/></div>

        {/* HERO */}
        <section style={{minHeight:"92vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"4rem 2rem 3rem",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:"20%",left:"15%",width:500,height:500,background:"radial-gradient(circle,rgba(157,78,221,.18),transparent 65%)",filter:"blur(60px)",zIndex:0,pointerEvents:"none",animation:"pulse 8s ease-in-out infinite alternate"}}/>
          <div style={{position:"absolute",bottom:"15%",right:"10%",width:400,height:400,background:"radial-gradient(circle,rgba(0,180,216,.12),transparent 65%)",filter:"blur(60px)",zIndex:0,pointerEvents:"none",animation:"pulse 10s ease-in-out infinite alternate-reverse"}}/>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9}} style={{position:"relative",zIndex:1,maxWidth:900}}>
            <span className="badge badge-primary" style={{marginBottom:"1.5rem",display:"inline-flex",gap:"0.4rem"}}><Star size={13}/> 2026–27 · {events.length} Events Live · {clubs.length} Active Clubs</span>
            <h1 style={{fontSize:"clamp(3rem,8vw,5.8rem)",fontWeight:900,lineHeight:1.05,letterSpacing:"-0.04em",marginBottom:"1.5rem"}}>
              Your Campus,<br/><span className="text-gradient">Reimagined.</span>
            </h1>
            <p style={{fontSize:"clamp(1rem,2vw,1.25rem)",color:"#adb5bd",maxWidth:620,margin:"0 auto 2.5rem",lineHeight:1.7}}>
              RSVP to jaw-dropping events, join elite clubs, and post your own — all in one beautifully animated campus space.
            </p>
            <div style={{display:"flex",justifyContent:"center",gap:"1rem",flexWrap:"wrap"}}>
              <button className="btn btn-primary" onClick={()=>scrollTo("events")} style={{fontSize:"1rem",padding:"0.9rem 2.5rem"}}>Explore Events <ArrowRight size={18}/></button>
              <button className="btn btn-secondary" onClick={()=>scrollTo("clubs")} style={{fontSize:"1rem",padding:"0.9rem 2.5rem"}}>Browse Clubs</button>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:"3rem",marginTop:"3.5rem"}}>
              {[{v:events.length,l:"Events"},{v:clubs.reduce((a,c)=>a+c.members,0).toLocaleString(),l:"Students"},{v:clubs.length,l:"Clubs"}].map(s=>(
                <div key={s.l} style={{textAlign:"center"}}>
                  <div style={{fontSize:"2.2rem",fontWeight:800,background:"linear-gradient(135deg,#e0aaff,#00b4d8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{s.v}</div>
                  <div style={{color:"#adb5bd",fontSize:"0.85rem"}}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* EVENTS */}
        <section id="events" style={{padding:"2rem 0 5rem"}}>
          <div style={{maxWidth:1300,margin:"0 auto",padding:"0 2rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
              <div>
                <h2 className="section-heading" style={{marginBottom:"0.3rem"}}>Trending <span className="text-gradient">Events</span></h2>
                <p style={{color:"#adb5bd",fontSize:"0.88rem"}}>{filteredEvents.length} of {events.length} events · Click any card for full details</p>
              </div>
              <button className="btn btn-primary" style={{display:"flex",alignItems:"center",gap:"0.4rem",padding:"0.6rem 1.4rem",fontSize:"0.88rem"}} onClick={()=>requireAuth(()=>setShowCreate("event"))}><Plus size={16}/>Post Event</button>
            </div>

            {/* Search + Filter */}
            <div style={{display:"flex",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap",alignItems:"center"}}>
              <div style={{position:"relative",flex:1,minWidth:220}}>
                <Search size={16} style={{position:"absolute",left:"0.9rem",top:"50%",transform:"translateY(-50%)",color:"#6c757d"}}/>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search events, clubs, hosts…" style={{width:"100%",padding:"0.7rem 0.9rem 0.7rem 2.5rem",borderRadius:"9999px",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"white",fontSize:"0.9rem",fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>
                {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:"0.75rem",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#6c757d",cursor:"pointer",display:"flex"}}><X size={15}/></button>}
              </div>
              <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
                {TAGS.map(tag=>(
                  <button key={tag} onClick={()=>setActiveTag(tag)} style={{padding:"0.4rem 1rem",borderRadius:"9999px",fontSize:"0.8rem",fontWeight:600,cursor:"pointer",border:"none",fontFamily:"inherit",transition:"all 0.25s",background:activeTag===tag?"linear-gradient(135deg,var(--primary),#7b2cbf)":"rgba(255,255,255,.06)",color:activeTag===tag?"white":"#adb5bd",boxShadow:activeTag===tag?"0 4px 12px rgba(157,78,221,.4)":"none"}}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filteredEvents.length===0?(
                <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{textAlign:"center",padding:"4rem",color:"#6c757d"}}>
                  <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🔍</div>
                  <div style={{fontSize:"1.2rem",fontWeight:600,color:"#adb5bd",marginBottom:"0.5rem"}}>No events found</div>
                  <div style={{fontSize:"0.9rem"}}>Try a different search or category</div>
                </motion.div>
              ):(
                <motion.div key="grid" variants={container} initial="hidden" animate="visible"
                  style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"1.75rem"}}>
                  {filteredEvents.map(event=>(
                    <motion.div key={event.id} variants={itemAnim} onClick={()=>setActiveEvent(event)}
                      style={cardStyle}
                      whileHover={{y:-8,boxShadow:"0 20px 50px rgba(157,78,221,.25)",borderColor:"rgba(157,78,221,.4)"}}>
                      {/* Image */}
                      <div style={{position:"relative",height:195,flexShrink:0}}>
                        <img src={event.image} alt={event.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(3,0,20,1) 0%,rgba(3,0,20,.5) 50%,transparent 100%)"}}/>
                        <div style={{position:"absolute",top:"0.75rem",left:"0.75rem",right:"0.75rem",display:"flex",justifyContent:"space-between"}}>
                          <span style={{padding:"0.28rem 0.65rem",borderRadius:"9999px",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",background:TAG_BG[event.tag]||"rgba(255,255,255,.1)",color:TAG_FG[event.tag]||"white",border:`1px solid ${TAG_FG[event.tag]||"white"}40`,backdropFilter:"blur(10px)"}}>{event.tag}</span>
                          {event.isPaid&&<span style={{padding:"0.28rem 0.65rem",borderRadius:"9999px",fontSize:"0.68rem",fontWeight:800,background:"rgba(255,180,0,.2)",color:"#ffd60a",border:"1px solid rgba(255,180,0,.4)",backdropFilter:"blur(10px)"}}>₹{event.price}</span>}
                        </div>
                        <div style={{position:"absolute",bottom:0,padding:"0.75rem 1rem"}}>
                          <h3 style={{fontSize:"1.1rem",fontWeight:700,color:"white",lineHeight:1.3,marginBottom:"0.15rem"}}>{event.title}</h3>
                          <p style={{fontSize:"0.78rem",color:"var(--primary)",fontWeight:600}}>{event.club}</p>
                        </div>
                      </div>
                      {/* Body */}
                      <div style={{padding:"0.9rem 1.1rem 1.1rem",flex:1,display:"flex",flexDirection:"column",gap:"0.4rem"}}>
                        <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap",color:"#adb5bd",fontSize:"0.78rem"}}>
                          <span style={{display:"flex",alignItems:"center",gap:"0.25rem"}}><Calendar size={12} color="var(--primary)"/>{event.date}</span>
                          <span style={{display:"flex",alignItems:"center",gap:"0.25rem"}}><Clock size={12} color="#ffd60a"/>{event.time} · {event.duration}</span>
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:"0.25rem",color:"#adb5bd",fontSize:"0.78rem"}}><MapPin size={12} color="var(--secondary)"/>{event.location} · {event.room}</div>

                        {/* Countdown */}
                        <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginTop:"0.25rem"}}>
                          <span style={{fontSize:"0.7rem",color:"#6c757d",fontWeight:500}}>Starts in</span>
                          <Countdown date={event.date}/>
                        </div>

                        <div style={{marginTop:"auto",paddingTop:"0.75rem",borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span style={{color:"#6c757d",fontSize:"0.78rem"}}><Users size={12} style={{display:"inline",marginRight:"0.25rem",color:"var(--primary)"}}/>{event.attendeesCount} attending</span>
                          <button onClick={e=>{e.stopPropagation();handleRSVP(event.id);}} style={{padding:"0.38rem 1rem",borderRadius:"8px",fontSize:"0.8rem",fontWeight:700,cursor:"pointer",border:"none",fontFamily:"inherit",transition:"all .2s",
                            ...(event.rsvpd?{background:"rgba(157,78,221,.15)",color:"#e0aaff",border:"1px solid rgba(157,78,221,.35)"}:event.isPaid?{background:"linear-gradient(135deg,var(--accent),#c9184a)",color:"white",boxShadow:"0 4px 10px rgba(255,0,110,.3)"}:{background:"linear-gradient(135deg,var(--primary),#7b2cbf)",color:"white",boxShadow:"0 4px 10px rgba(157,78,221,.3)"})}}>
                            {event.rsvpd?"RSVP'd ✓":event.isPaid?`₹${event.price} RSVP`:"RSVP Free"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* CLUBS */}
        <section id="clubs" style={{padding:"2rem 0 7rem"}}>
          <div style={{maxWidth:1300,margin:"0 auto",padding:"0 2rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2.5rem",flexWrap:"wrap",gap:"1rem"}}>
              <div>
                <h2 className="section-heading" style={{marginBottom:"0.3rem"}}>Elite <span className="text-gradient-club">Clubs</span></h2>
                <p style={{color:"#adb5bd",fontSize:"0.88rem"}}>{clubs.length} clubs active · Click any club to learn more</p>
              </div>
              <button className="btn btn-accent" style={{display:"flex",alignItems:"center",gap:"0.4rem",padding:"0.6rem 1.4rem",fontSize:"0.88rem"}} onClick={()=>requireAuth(()=>setShowCreate("club"))}><Plus size={16}/>New Club</button>
            </div>
            <motion.div variants={container} initial="hidden" animate="visible"
              style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.75rem"}}>
              {clubs.map(club=>(
                <motion.div key={club.id} variants={itemAnim} onClick={()=>setActiveClub(club)}
                  style={{cursor:"pointer",borderRadius:"1.25rem",background:"linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.01))",border:"1px solid rgba(255,255,255,.08)",padding:"2rem 1.5rem",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,.3)"}}
                  whileHover={{y:-8,boxShadow:"0 20px 50px rgba(255,0,110,.2)",borderColor:"rgba(255,0,110,.35)"}}>
                  <div style={{width:88,height:88,borderRadius:"50%",padding:3,background:"linear-gradient(135deg,var(--primary),var(--accent))",marginBottom:"1rem",flexShrink:0}}>
                    <img src={club.image} alt={club.name} style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover",border:"3px solid #030014"}}/>
                  </div>
                  <span style={{padding:"0.25rem 0.65rem",borderRadius:"9999px",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",background:TAG_BG[club.category]||"rgba(255,255,255,.05)",color:TAG_FG[club.category]||"#adb5bd",border:`1px solid ${TAG_FG[club.category]||"#adb5bd"}40`,marginBottom:"0.75rem"}}>{club.category}</span>
                  <h3 style={{fontSize:"1.25rem",fontWeight:700,color:"white",marginBottom:"0.3rem"}}>{club.name}</h3>
                  <p style={{color:"#adb5bd",fontSize:"0.82rem",marginBottom:"0.2rem"}}>{club.members.toLocaleString()} Members</p>
                  <p style={{color:"#6c757d",fontSize:"0.78rem",marginBottom:"1.5rem"}}>Led by {club.president}</p>
                  <button onClick={e=>{e.stopPropagation();handleClubToggle(club.id);}} style={{width:"100%",padding:"0.65rem",borderRadius:"9999px",fontSize:"0.88rem",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",border:"none",transition:"all .3s",
                    ...(club.requested?{background:"rgba(0,255,110,.1)",color:"#00ff6e",border:"1px solid rgba(0,255,110,.3)"}:{background:"linear-gradient(135deg,var(--accent),#c9184a)",color:"white",boxShadow:"0 4px 15px rgba(255,0,110,.3)"})}}>
                    {club.requested?<><CheckCircle2 size={16}/>Requested</>:"Join Club"}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {activeEvent&&<EventModal event={activeEvent} onClose={()=>setActiveEvent(null)} onRSVP={handleRSVP}/>}
        {activeClub &&<ClubModal  club={activeClub}   onClose={()=>setActiveClub(null)}  onToggle={handleClubToggle}/>}
        {showAuth   &&<AuthModal  onClose={()=>setShowAuth(false)} onLogin={u=>{setUser(u);showToast(`Welcome back, ${u.name.split(" ")[0]}! 👋`,"success");}}/>}
        {showCreate &&<CreateModal mode={showCreate} onClose={()=>setShowCreate(null)} onAdd={handleAdd} currentEvents={events.length} currentClubs={clubs.length}/>}
      </AnimatePresence>
    </>
  );
}
