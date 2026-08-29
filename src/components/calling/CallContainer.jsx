import React, { useEffect, useRef, useState } from "react";
import { 
  PhoneOff, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Camera, 
  ShieldCheck, 
  Maximize2,
  Minimize2,
  Sparkles
} from "lucide-react";

const CallContainer = ({
  roomID,
  userID,
  userName,
  companionName = "Companion",
  companionPhoto,
  callType = "video",
  onEndCall,
}) => {
  const [currentCallType, setCurrentCallType] = useState(callType);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === "audio");
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [hasMediaPermission, setHasMediaPermission] = useState(true);
  const [permissionError, setPermissionError] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  // Live Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize Media Stream (WebRTC)
  useEffect(() => {
    let isMounted = true;

    const startLocalStream = async () => {
      try {
        const constraints = {
          audio: true,
          video: currentCallType === "video" && !isVideoOff,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        localStreamRef.current = stream;
        if (localVideoRef.current && currentCallType === "video") {
          localVideoRef.current.srcObject = stream;
        }
        setHasMediaPermission(true);
        setPermissionError(null);
      } catch (err) {
        console.warn("Media access warning:", err.message);
        // Fallback to audio-only if video fails (e.g. no camera attached)
        try {
          const audioOnlyStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          if (!isMounted) {
            audioOnlyStream.getTracks().forEach((track) => track.stop());
            return;
          }
          localStreamRef.current = audioOnlyStream;
          setHasMediaPermission(true);
        } catch (audioErr) {
          setHasMediaPermission(false);
          setPermissionError("Please allow microphone/camera access for the call.");
        }
      }
    };

    startLocalStream();

    return () => {
      isMounted = false;
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [currentCallType]);

  // Toggle Mute / Mic
  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  // Toggle Camera / Video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks.forEach((track) => {
          track.enabled = !track.enabled;
        });
        setIsVideoOff(!isVideoOff);
      } else {
        // If switching to video from audio mode
        setCurrentCallType("video");
        setIsVideoOff(false);
      }
    } else {
      setIsVideoOff(!isVideoOff);
    }
  };

  const isVideoMode = currentCallType === "video" && !isVideoOff;

  const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop";
  const avatarUrl = companionPhoto || defaultAvatar;

  return (
    <div className="fixed inset-0 z-[600] bg-[#0c1317] text-white flex flex-col justify-between select-none overflow-hidden animate-in fade-in">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER (WHATSAPP CALL BAR)                                        */}
      {/* ========================================================================= */}
      <div className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden ring-2 ring-[#00a884]">
            <img
              src={avatarUrl}
              alt={companionName}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>{companionName}</span>
              <span className="flex h-2 w-2 rounded-full bg-[#00a884] animate-pulse" />
            </h3>
            <p className="text-xs font-semibold text-[#00a884] flex items-center gap-1.5">
              <span>{formatTimer(callDuration)}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/80 font-normal">
                {isVideoMode ? "WhatsApp Video Call" : "WhatsApp Voice Call"}
              </span>
            </p>
          </div>
        </div>

        {/* Security Pill */}
        <div className="hidden sm:inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] text-white/80 font-medium">
          <ShieldCheck size={14} className="text-[#00a884]" />
          <span>End-to-end encrypted</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN CALL VIEW                                                         */}
      {/* ========================================================================= */}
      <div className="relative flex-1 flex items-center justify-center w-full h-full overflow-hidden">
        {isVideoMode ? (
          /* VIDEO CALL VIEW */
          <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
            {/* Remote Companion Video (Simulated / Live Stream) */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={avatarUrl}
                alt={companionName}
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
              
              {/* Companion Live Indicator Badge */}
              <div className="absolute bottom-28 left-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/10">
                <span className="h-2 w-2 rounded-full bg-[#00a884] animate-pulse" />
                <span className="text-xs font-bold text-white">{companionName}</span>
              </div>
            </div>

            {/* Picture-in-Picture (PiP) Self Video in Top-Right Corner */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 w-28 sm:w-40 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border-2 border-white/30 shadow-2xl transition-transform hover:scale-105">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
              <div className="absolute bottom-1.5 left-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-bold text-white/90">
                You
              </div>
            </div>
          </div>
        ) : (
          /* AUDIO CALL VIEW (WHATSAPP SIGNATURE PULSING AVATAR) */
          <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95">
            {/* Pulsing Avatar with Waves */}
            <div className="relative flex items-center justify-center">
              <div className="absolute h-48 w-48 sm:h-56 sm:w-56 rounded-full bg-[#00a884]/20 animate-ping duration-1000 pointer-events-none" />
              <div className="absolute h-40 w-40 sm:h-48 sm:w-48 rounded-full bg-[#00a884]/30 animate-pulse pointer-events-none" />
              <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden ring-4 ring-[#00a884] shadow-2xl">
                <img
                  src={avatarUrl}
                  alt={companionName}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Companion Name & Calling Info */}
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {companionName}
              </h2>
              <p className="text-base font-extrabold text-[#00a884] tracking-wider font-mono">
                {formatTimer(callDuration)}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-white/60 font-medium">
                <ShieldCheck size={13} className="text-[#00a884]" />
                End-to-end encrypted voice call
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM FLOATING WHATSAPP CONTROL BAR                                   */}
      {/* ========================================================================= */}
      <div className="relative z-30 pb-8 sm:pb-10 pt-4 flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 sm:gap-6 bg-[#1f2c34]/90 backdrop-blur-xl px-6 sm:px-8 py-3.5 rounded-full border border-white/10 shadow-2xl">
          
          {/* Speaker Button */}
          <button
            type="button"
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`cursor-pointer flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full transition-all active:scale-95 ${
              isSpeakerOn
                ? "bg-[#374248] text-white hover:bg-[#4a575f]"
                : "bg-white/10 text-white/50 hover:bg-white/20"
            }`}
            title={isSpeakerOn ? "Speaker On" : "Speaker Off"}
          >
            {isSpeakerOn ? <Volume2 size={22} /> : <VolumeX size={22} />}
          </button>

          {/* Switch to Video / Camera Toggle */}
          <button
            type="button"
            onClick={toggleVideo}
            className={`cursor-pointer flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full transition-all active:scale-95 ${
              isVideoMode
                ? "bg-[#00a884] text-white hover:bg-[#008f6f]"
                : "bg-[#374248] text-white hover:bg-[#4a575f]"
            }`}
            title={isVideoMode ? "Turn Camera Off" : "Turn Video On"}
          >
            {isVideoMode ? <Video size={22} /> : <VideoOff size={22} />}
          </button>

          {/* Mic Mute / Unmute */}
          <button
            type="button"
            onClick={toggleMute}
            className={`cursor-pointer flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full transition-all active:scale-95 ${
              isMuted
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/50 hover:bg-rose-500/30"
                : "bg-[#374248] text-white hover:bg-[#4a575f]"
            }`}
            title={isMuted ? "Unmute Mic" : "Mute Mic"}
          >
            {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
          </button>

          {/* End Call Button (Big Red WhatsApp Button) */}
          <button
            type="button"
            onClick={() => {
              if (onEndCall) onEndCall();
            }}
            className="cursor-pointer flex h-13 w-13 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#ea0038] hover:bg-[#c80030] text-white shadow-xl shadow-rose-600/40 transition-all hover:scale-110 active:scale-90 ml-1 sm:ml-2"
            title="End Call 🔴"
          >
            <PhoneOff size={26} />
          </button>

        </div>
      </div>

    </div>
  );
};

export default CallContainer;
