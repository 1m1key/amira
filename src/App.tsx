/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, PanInfo, AnimatePresence } from 'motion/react';
import { Heart, Moon, Star, ChevronRight, ChevronLeft, Sparkles, Music, Volume2, VolumeX } from 'lucide-react';

// Helper to get direct Google Drive image link
const getDriveLink = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

interface Slide {
  id: number;
  content: React.ReactNode;
  stickerId?: string;
  isArabic?: boolean;
}

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selection, setSelection] = useState<'surprise' | 'gift' | null>(null);
  const [generatedNumber, setGeneratedNumber] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMusicRetry, setShowMusicRetry] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const startExperience = () => {
    setHasStarted(true);
    setIsMusicPlaying(true);
    
    if (audioRef.current) {
      audioRef.current.play().catch(e => {
        console.log("Initial play blocked:", e);
        setShowMusicRetry(true);
      });
    }
  };

  const handleRetryPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setShowMusicRetry(false);
        setIsMusicPlaying(true);
      }).catch(e => console.log("Retry failed:", e));
    }
  };

  const nextSlide = useCallback(() => {
    // Total slides is 19 (index 0 to 18)
    if (currentSlide < 18) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 30;
    if (info.offset.x < -swipeThreshold) {
      if (currentSlide !== 17 && currentSlide < 18) nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  const generateNumber = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedNumber(20);
      setIsGenerating(false);
    }, 1500);
  }, []);

  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  }, [isMusicPlaying]);

  // Static slide content to avoid re-creating the whole array on state changes
  const slides: Slide[] = useMemo(() => [
    {
      id: 1,
      content: (
        <div className="text-center space-y-4 w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-full max-w-[180px] mx-auto"
          >
            <img 
              src={getDriveLink('1JU4xhW9JtV5o0ouaezRqptwwNWO1Mta9')} 
              alt="Birthday Cake" 
              className="w-full h-auto block drop-shadow-xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <h1 className="text-2xl font-cursive font-bold text-primary px-4">
            Happy Birthday to my beautiful princess, my moon, Amira 🤍🤎
          </h1>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <p className="text-lg text-center leading-relaxed italic px-2">
          "I don’t just celebrate the day you were born… I celebrate the day the world received the most beautiful soul I’ve ever known."
        </p>
      ),
      stickerId: "1717137426646686750",
    },
    {
      id: 3,
      content: (
        <p className="text-lg text-center leading-relaxed px-2">
          You changed my life in ways I never expected. You brought peace to my chaos, light to my dark days, and love to places in my heart I didn’t even know existed.
        </p>
      ),
    },
    {
      id: 4,
      content: (
        <p className="text-lg text-center leading-relaxed italic px-2">
          If I could give you one thing today, it would be the ability to see yourself through my eyes — because then you would understand how incredibly special you are.
        </p>
      ),
      stickerId: "7434725076202300361",
    },
    {
      id: 5,
      content: (
        <p className="text-lg text-center leading-relaxed px-2">
          I love you more than words will ever be able to explain. Before you, I didn’t understand what it meant to truly care for someone.
        </p>
      ),
      stickerId: "16367512710564552301",
    },
    {
      id: 6,
      isArabic: true,
      content: (
        <div className="space-y-2 text-center scale-90 sm:scale-100 w-full">
          <img 
            src={getDriveLink('1zfnGOXUKw9nheK_yDDSQl-jzJm0Deq5y')} 
            alt="Eyes" 
            className="w-full max-w-[160px] mx-auto rounded-xl object-contain shadow-md mb-2 bg-white/20"
            referrerPolicy="no-referrer"
          />
          <div className="font-serif text-lg leading-snug space-y-1">
            <p>في بحر عينيك هامت كل أشواقي</p>
            <p>يا ربة الحسن هل تنوين إغراقي</p>
            <p>ما كنت أومن بالعيون وفعلها</p>
            <p>حتى دهتني في الهوى عيناك!</p>
            <p>عيناك بحر تاهت به سفني</p>
            <p>وتزعزعت به نبضات قلبي وأنفاسي</p>
            <p>انا الذي لا يهزني برق ولا رعد</p>
            <p>أعينين متلألئة تهزم ثباتي ؟</p>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      isArabic: true,
      content: (
        <div className="font-serif text-lg leading-snug text-center space-y-1 px-2">
          <p>وإذا رأيتك تضحكين تبسماً</p>
          <p>ذهبت هموم مشاغلي وعنائي</p>
          <p>كأن نور الشمس فاض بوجهك</p>
          <p>وأضاء ليلي في صباح رجائي</p>
          <p>ما كنت مثل العابرين فإنهم</p>
          <p>مروا علي وأنت سرت خلالي</p>
        </div>
      ),
    },
    {
      id: 8,
      isArabic: true,
      content: (
        <div className="font-serif text-xl leading-relaxed text-center">
          <p>ورميت سهم الحب اقصدها</p>
          <p>فمر من فوقها لقصرها</p>
        </div>
      ),
      stickerId: "12447423504329871494",
    },
    {
      id: 9,
      isArabic: true,
      content: (
        <p className="font-serif text-2xl text-center">مزيحة يا كتكوتتي</p>
      ),
      stickerId: "13839123340833141788",
    },
    {
      id: 10,
      content: (
        <div className="text-center space-y-3">
          <p className="text-base opacity-60">the truth is ....</p>
          <p className="text-lg italic">I don’t know what tomorrow holds.</p>
          <p className="text-lg italic">I don’t pretend to control it.</p>
          <p className="text-lg italic">I don’t promise forever .</p>
        </div>
      ),
      stickerId: "13555747940236673731",
    },
    {
      id: 11,
      content: (
        <div className="text-center space-y-3">
          <p className="text-lg">Maybe we are not a story written in stone.</p>
          <p className="text-lg font-bold">Maybe we are a season.</p>
        </div>
      ),
      stickerId: "2505603330472600940",
    },
    {
      id: 12,
      content: (
        <p className="text-xl text-center italic px-4">But even seasons leave marks on the earth.</p>
      ),
    },
    {
      id: 13,
      content: (
        <p className="text-lg text-center px-4">And you have left something in me that will never disappear with time.</p>
      ),
      stickerId: "18147025",
    },
    {
      id: 14,
      content: (
        <p className="text-lg text-center px-4">I believe in building something strong enough that forever doesn’t feel impossible.</p>
      ),
      stickerId: "26291098",
    },
    {
      id: 15,
      content: (
        <div className="text-center space-y-3">
          <p className="text-lg">Maybe love isn’t about knowing the ending.</p>
          <p className="text-lg italic">Maybe it’s about believing the story is worth continuing.</p>
        </div>
      ),
      stickerId: "6621688772003659952",
    },
    {
      id: 16,
      isArabic: true,
      content: (
        <div className="font-serif text-lg leading-snug text-center space-y-3 scale-95">
          <p className="text-base opacity-50">و في الاخير</p>
          <p>الحب دعاء والدعاء حب</p>
          <p>فمن أحبك دعا لك ومن دعا لك فقده أبلغ في محبتك</p>
          <p className="text-primary font-bold">- وقلبي بالدعاء يرعاك -</p>
        </div>
      ),
      stickerId: "13632121",
    },
    {
      id: 17,
      isArabic: true,
      content: (
        <div className="font-serif text-lg leading-snug text-center space-y-3 px-4">
          <p>أسأل الله أن يحفظكِ أينما كنتِ،</p>
          <p>وأن يكتب لكِ من السعادة أوسعها،</p>
          <p>ومن الطمأنينة أعمقها.</p>
          <p className="text-2xl text-primary font-bold mt-4">كل عام وأنتِ بخير</p>
        </div>
      ),
    },
    {
      id: 18,
      content: (
        <div className="text-center space-y-6">
          <h2 className="text-xl font-cursive">Pick your choice...</h2>
          <div className="flex flex-col gap-3 items-center">
            <button
              onClick={() => { setSelection('surprise'); nextSlide(); }}
              className="w-48 py-3 bg-primary text-white rounded-full shadow-md hover:scale-105 transition-transform"
            >
              Surprise 🤎
            </button>
            <button
              onClick={() => { setSelection('gift'); nextSlide(); }}
              className="w-48 py-3 bg-white border-2 border-primary text-primary rounded-full shadow-md hover:scale-105 transition-transform"
            >
              Gift 🤍
            </button>
          </div>
        </div>
      ),
      stickerId: "4744117645076411056",
    },
    {
      id: 19,
      content: (
        <div className="text-center space-y-4 w-full">
          <div className="bg-white/60 p-4 rounded-2xl shadow-inner">
            <h3 className="text-base font-medium mb-1">You picked:</h3>
            <p className="text-2xl font-cursive text-primary capitalize">{selection}</p>
          </div>
          
          <div className="space-y-3">
            {!generatedNumber ? (
              <button
                onClick={generateNumber}
                disabled={isGenerating}
                className="px-6 py-3 bg-accent text-white rounded-xl shadow-lg hover:bg-accent/90 transition-colors flex items-center gap-2 mx-auto disabled:opacity-50 text-sm"
              >
                {isGenerating ? <Sparkles className="animate-spin size-4" /> : <Sparkles className="size-4" />}
                Generate a number from 1 to 20
              </button>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="space-y-4"
              >
                <div className="text-5xl font-bold text-primary bg-white w-20 h-20 flex items-center justify-center rounded-full mx-auto shadow-xl border-4 border-accent">
                  {generatedNumber}
                </div>
                <div className="space-y-2">
                  <p className="font-serif text-xl text-primary">مع الاسف مش خاتم تع ديامون</p>
                  <p className="text-[10px] opacity-50 uppercase tracking-widest">(Screenshot & send! 📸)</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      ),
      stickerId: "13495297881520512547",
    },
  ], []); // Empty dependency array for slides

  // Dynamic content for the last slide
  const lastSlideContent = useMemo(() => (
    <div className="text-center space-y-4 w-full">
      <div className="bg-white/60 p-4 rounded-2xl shadow-inner">
        <h3 className="text-base font-medium mb-1">You picked:</h3>
        <p className="text-2xl font-cursive text-primary capitalize">{selection || '...'}</p>
      </div>
      
      <div className="space-y-3">
        {!generatedNumber ? (
          <button
            onClick={generateNumber}
            disabled={isGenerating}
            className="px-6 py-3 bg-accent text-white rounded-xl shadow-lg hover:bg-accent/90 transition-colors flex items-center gap-2 mx-auto disabled:opacity-50 text-sm"
          >
            {isGenerating ? <Sparkles className="animate-spin size-4" /> : <Sparkles className="size-4" />}
            Generate a number from 1 to 20
          </button>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="space-y-4"
          >
            <div className="text-5xl font-bold text-primary bg-white w-20 h-20 flex items-center justify-center rounded-full mx-auto shadow-xl border-4 border-accent">
              {generatedNumber}
            </div>
            <div className="space-y-2">
              <p className="font-serif text-xl text-primary">مع الاسف مش خاتم تع ديامون</p>
              <p className="text-[10px] opacity-50 uppercase tracking-widest">(Screenshot & send! 📸)</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  ), [selection, generatedNumber, isGenerating, generateNumber]);

  // Update the last slide's content dynamically
  const currentSlides = useMemo(() => {
    const newSlides = [...slides];
    if (newSlides[18]) {
      newSlides[18] = { ...newSlides[18], content: lastSlideContent };
    }
    return newSlides;
  }, [slides, lastSlideContent]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-bg-soft touch-none overflow-hidden">
      {/* Entry Screen */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            key="entry-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-soft p-6 text-center"
          >
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
              <div className="absolute top-20 left-10 rotate-12"><Heart size={100} fill="currentColor" /></div>
              <div className="absolute bottom-20 right-10 -rotate-12"><Heart size={120} fill="currentColor" /></div>
            </div>
            
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-8"
            >
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                <Heart size={60} className="text-accent fill-accent animate-pulse" />
              </div>
            </motion.div>
            
            <h1 className="text-3xl font-cursive font-bold text-primary mb-2">For Amira 🤍</h1>
            <p className="text-sm text-primary/60 mb-8 tracking-widest uppercase">A little something for your birthday</p>
            
            <button
              onClick={startExperience}
              className="group relative px-12 py-4 bg-primary text-white rounded-full shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 font-bold tracking-widest">OPEN 🤎</span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-10 left-10 rotate-12"><Heart size={150} fill="currentColor" /></div>
        <div className="absolute bottom-20 right-10 -rotate-12"><Moon size={120} fill="currentColor" /></div>
        <div className="absolute top-1/2 right-1/4"><Star size={80} fill="currentColor" /></div>
      </div>

      {/* Music Control */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {showMusicRetry && hasStarted && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleRetryPlay}
              className="px-4 py-2 bg-accent text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg animate-bounce flex items-center gap-2"
            >
              <Music size={14} />
              Tap to Play Music
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={toggleMusic}
          className={`p-3 rounded-full shadow-lg transition-all duration-500 flex items-center gap-2 ${
            isMusicPlaying ? 'bg-accent text-white scale-110' : 'bg-white text-primary'
          }`}
        >
          {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span className="text-[10px] font-bold uppercase tracking-widest pr-1">
            {isMusicPlaying ? 'Music On' : 'Play Music'}
          </span>
        </button>
        
        {/* Hidden Audio Player - Using the user's custom music link */}
        <audio
          ref={audioRef}
          src="https://files.catbox.moe/hive2y.mp3"
          loop
          preload="auto"
          playsInline
        />
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-sm h-[75vh] overflow-hidden px-4 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                x: direction > 0 ? '100%' : '-100%',
                opacity: 0,
                scale: 0.95
              }),
              center: {
                zIndex: 1,
                x: 0,
                opacity: 1,
                scale: 1
              },
              exit: (direction: number) => ({
                zIndex: 0,
                x: direction < 0 ? '100%' : '-100%',
                opacity: 0,
                scale: 0.95
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            style={{ willChange: 'transform, opacity' }}
            className="absolute w-[calc(100%-2rem)] h-full flex flex-col items-center justify-center p-6 bg-white/50 backdrop-blur-md rounded-[40px] shadow-xl border border-white/80 cursor-grab active:cursor-grabbing"
          >
            <div className={`w-full flex-1 flex flex-col items-center justify-center ${currentSlides[currentSlide].isArabic ? 'rtl' : ''}`}>
              {currentSlides[currentSlide].content}
            </div>

            {/* Sticker Area */}
            {currentSlides[currentSlide].stickerId && (
              <div className="w-full h-32 flex items-center justify-center mt-4 overflow-hidden rounded-xl bg-white/30">
                <iframe
                  src={`https://tenor.com/embed/${currentSlides[currentSlide].stickerId}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title={`Sticker ${currentSlides[currentSlide].id}`}
                  className="pointer-events-none"
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Indicators */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex gap-1.5 flex-wrap justify-center max-w-[80vw]">
          {currentSlides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-4 bg-primary' : 'w-1 bg-primary/20'
              }`}
            />
          ))}
        </div>
        <p className="text-[10px] text-primary/40 uppercase tracking-[0.2em] animate-pulse">
          Swipe to navigate
        </p>
      </div>

      {/* Manual Buttons for Desktop */}
      <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-10 pointer-events-none">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-4 rounded-full bg-white/50 shadow-lg text-primary disabled:opacity-0 pointer-events-auto transition-all hover:bg-white"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1 || currentSlide === 17}
          className="p-4 rounded-full bg-white/50 shadow-lg text-primary disabled:opacity-0 pointer-events-auto transition-all hover:bg-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
