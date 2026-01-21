
import React from 'react';
import { Linkedin, Code2, Rocket, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn space-y-12 pb-12">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          About AI Career Navigator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Our mission is to democratize career counseling by providing students worldwide with AI-driven, 
          personalized roadmaps to reach their professional potential.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <Rocket className="text-indigo-500" />, title: "Vision", desc: "To see every student in their dream career." },
          { icon: <Code2 className="text-purple-500" />, title: "Technology", desc: "Powered by Gemini 3's advanced reasoning." },
          { icon: <Heart className="text-pink-500" />, title: "Personalized", desc: "Roadmaps tailored to your unique journey." }
        ].map((item, i) => (
          <div key={i} className="glass p-6 rounded-2xl text-center">
            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              {item.icon}
            </div>
            <h3 className="font-bold text-xl mb-2">{item.title}</h3>
            <p className="text-slate-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass p-10 rounded-[2.5rem] border-2 border-indigo-500/10 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <h3 className="text-2xl font-bold mb-6">Meet the Creator</h3>
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
            AS
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl font-black text-slate-800 dark:text-white">Made by Abhayjeet Singh</h4>
            <p className="text-indigo-600 font-medium">AI Engineer & Developer</p>
          </div>
          <p className="text-slate-500 max-w-md mx-auto mb-4">
            Passionate about building intelligent systems that solve real-world problems and empower the next generation of builders.
          </p>
          <a 
            href="https://www.linkedin.com/in/ai-engineer-abhayjeetsingh/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <Linkedin className="w-5 h-5" /> Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};
