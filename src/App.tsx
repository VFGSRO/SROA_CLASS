/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Sword, 
  Zap, 
  Flame, 
  Droplets, 
  Activity, 
  ChevronRight, 
  RotateCcw, 
  Share2, 
  ArrowLeft,
  Compass,
  Map,
  Users,
  Target,
  Gem,
  Skull,
  Wind,
  Eye,
  Heart,
  Coins,
  Star,
  Anchor,
  X,
  Link,
  Mail,
  Facebook,
  Twitter,
  MessageCircle,
  Code
} from 'lucide-react';

// --- Types ---
type WeaponType = '장검' | '단도' | '장창' | '대도' | '장궁';
type EnergyType = '빙계심법' | '뇌계심법' | '화계심법' | '기혈대법';
type FactionType = '대당맹장' | '녹림호걸';

interface Option {
  text: string;
  weapon: WeaponType;
  energy: EnergyType;
  faction?: FactionType;
}

interface Question {
  title: string;
  icon: React.ReactNode;
  options: Option[];
}

// --- Data ---
const JOBS: Record<WeaponType, Record<EnergyType, string>> = {
  "장검": { "빙계심법": "빙검무사", "뇌계심법": "뇌검검객", "화계심법": "염검검호", "기혈대법": "기혈검선" },
  "장창": { "빙계심법": "빙창수라", "뇌계심법": "뇌창파군", "화계심법": "화창맹장", "기혈대법": "기혈창의" },
  "단도": { "빙계심법": "빙도자객", "뇌계심법": "뇌도그림자", "화계심법": "화도혈쇄", "기혈대법": "기혈의원" },
  "대도": { "빙계심법": "빙도파괴자", "뇌계심법": "뇌도광전사", "화계심법": "염도폭군", "기혈대법": "기혈도성" },
  "장궁": { "빙계심법": "설한궁사", "뇌계심법": "뇌전궁수", "화계심법": "염궁사", "기혈대법": "기혈궁수" }
};

const DESCRIPTIONS: Record<string, string> = {
  "빙검무사": "비천검법의 정교함에 빙계심법의 냉기를 더해 적을 얼려버리는 검사입니다.",
  "뇌검검객": "빛보다 빠른 비천검법과 뇌계심법의 전격으로 전장을 휩쓰는 검객입니다.",
  "염검검호": "타오르는 화계심법의 기운을 검에 실어 모든 것을 베어버리는 호걸입니다.",
  "기혈검선": "기혈대법을 통해 자신과 아군을 보호하며 부드러운 검술을 펼치는 수호자입니다.",
  "빙창수라": "흑살창법의 파괴력과 빙계심법의 결빙으로 적의 진형을 무너뜨리는 수라입니다.",
  "뇌창파군": "천둥 같은 흑살창법으로 적의 방어를 관통하는 강력한 창술사입니다.",
  "화창맹장": "화계심법의 폭발적인 힘으로 적진 한복판을 돌파하는 용맹한 장수입니다.",
  "기혈창의": "흑살창법의 긴 사거리와 기혈대법의 치유력을 조합한 전장의 구원자입니다.",
  "빙도자객": "어둠 속에서 빙계심법의 차가운 칼날로 적의 숨통을 끊는 암살자입니다.",
  "뇌도그림자": "뇌계심법의 빠른 속도로 잔상을 남기며 적을 유린하는 그림자 자객입니다.",
  "화도혈쇄": "화계심법의 열기로 적의 상처를 헤집는 잔혹하고 치명적인 단도술사입니다.",
  "기혈의원": "기혈대법의 정수로 아군을 치료하며 보이지 않는 곳에서 적을 제압하는 의원입니다.",
  "빙도파괴자": "거대한 대도에 빙계심법을 실어 대지를 얼리고 파괴하는 거한입니다.",
  "뇌도광전사": "뇌계심법의 광기에 어린 힘으로 주변의 모든 것을 분쇄하는 전사입니다.",
  "염도폭군": "화계심법의 무자비한 화염과 대도의 무게로 전장을 공포로 몰아넣는 폭군입니다.",
  "기혈도성": "기혈대법의 내공을 대도에 실어 산도 가를 수 있는 일격을 가하는 도객입니다.",
  "설한궁사": "파천마궁의 화살에 빙계심법의 냉기를 담아 원거리에서 적을 봉쇄합니다.",
  "뇌전궁수": "파천마궁의 연사와 뇌계심법의 전격으로 순식간에 다수의 적을 제압합니다.",
  "염궁사": "화계심법의 폭발력을 화살 끝에 모아 전장을 불바다로 만드는 궁수입니다.",
  "기혈궁수": "기혈대법으로 기의 흐름을 조절하며 치명적인 약점을 꿰뚫는 유협입니다."
};

const QUESTIONS: Question[] = [
  {
    title: "실크로드의 거대한 교역로에서 당신은 어떤 삶을 꿈꾸십니까?",
    icon: <Compass className="w-6 h-6 text-amber-500" />,
    options: [
      { text: "상단을 보호하고 질서를 수호하는 정의로운 삶", weapon: "장검", energy: "빙계심법", faction: "대당맹장" },
      { text: "자유를 만끽하며 부를 쟁취하는 거침없는 삶", weapon: "단도", energy: "기혈대법", faction: "녹림호걸" },
      { text: "강력한 무력으로 전설이 되는 명예로운 삶", weapon: "장창", energy: "화계심법", faction: "대당맹장" },
      { text: "누구에게도 얽매이지 않고 대륙을 누비는 방랑자의 삶", weapon: "장궁", energy: "뇌계심법", faction: "녹림호걸" }
    ]
  },
  {
    title: "전투가 시작되었습니다. 당신이 가장 먼저 취하는 행동은?",
    icon: <Sword className="w-6 h-6 text-red-500" />,
    options: [
      { text: "적의 공격을 완벽하게 막아내며 빈틈을 노린다.", weapon: "장검", energy: "빙계심법" },
      { text: "압도적인 힘으로 적의 기세를 단숨에 꺾어버린다.", weapon: "대도", energy: "화계심법" },
      { text: "빠른 속도로 적의 측면을 파고들어 기습한다.", weapon: "단도", energy: "뇌계심법" },
      { text: "멀리서 적의 움직임을 봉쇄하며 아군을 지원한다.", weapon: "장궁", energy: "기혈대법" }
    ]
  },
  {
    title: "동료가 부상을 입고 쓰러졌습니다. 당신의 선택은?",
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    options: [
      { text: "기혈대법의 치유력으로 동료를 즉시 회복시킨다.", weapon: "장창", energy: "기혈대법" },
      { text: "적을 빠르게 섬멸하여 동료가 안전하게 쉴 곳을 만든다.", weapon: "대도", energy: "화계심법" },
      { text: "방어막을 형성하여 동료에게 다가오는 적을 차단한다.", weapon: "장검", energy: "빙계심법" },
      { text: "후방에서 엄호 사격을 가하며 동료의 퇴로를 확보한다.", weapon: "장궁", energy: "뇌계심법" }
    ]
  },
  {
    title: "당신이 가장 신뢰하는 무공의 형태는 무엇입니까?",
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    options: [
      { text: "정교하고 화려한 연격의 '비천검법'", weapon: "장검", energy: "뇌계심법" },
      { text: "묵직하고 파괴적인 일격의 '흑살창법'", weapon: "장창", energy: "화계심법" },
      { text: "백발백중, 보이지 않는 곳에서의 '파천마궁'", weapon: "장궁", energy: "빙계심법" },
      { text: "생명력을 다루고 변칙적인 '기혈대법'", weapon: "단도", energy: "기혈대법" }
    ]
  },
  {
    title: "상단이 도적떼에게 포위당했습니다. 당신의 전략은?",
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    options: [
      { text: "규칙에 따라 대열을 유지하며 상인을 끝까지 보호한다.", weapon: "장창", energy: "빙계심법", faction: "대당맹장" },
      { text: "혼란을 틈타 도적의 우두머리만을 노려 암살한다.", weapon: "단도", energy: "기혈대법", faction: "녹림호걸" },
      { text: "화염의 기운으로 주변을 불바다로 만들어 적을 쫓아낸다.", weapon: "대도", energy: "화계심법", faction: "대당맹장" },
      { text: "지형지물을 이용해 적을 유인하고 각개격파한다.", weapon: "장궁", energy: "뇌계심법", faction: "녹림호걸" }
    ]
  },
  {
    title: "무기에 주입할 심법을 하나만 고른다면?",
    icon: <Flame className="w-6 h-6 text-orange-500" />,
    options: [
      { text: "적의 발을 묶고 방어력을 높이는 '빙계심법'", weapon: "장검", energy: "빙계심법" },
      { text: "신속한 이동과 마비를 선사하는 '뇌계심법'", weapon: "장궁", energy: "뇌계심법" },
      { text: "압도적인 파괴력과 화상을 입히는 '화계심법'", weapon: "대도", energy: "화계심법" },
      { text: "아군을 치유하고 생명력을 흡수하는 '기혈대법'", weapon: "장창", energy: "기혈대법" }
    ]
  },
  {
    title: "당신이 생각하는 '진정한 강함'이란 무엇입니까?",
    icon: <Star className="w-6 h-6 text-yellow-500" />,
    options: [
      { text: "흔들리지 않는 원칙과 질서를 지키는 힘", weapon: "장검", energy: "빙계심법", faction: "대당맹장" },
      { text: "누구에게도 굴복하지 않는 자유로운 영혼의 힘", weapon: "단도", energy: "기혈대법", faction: "녹림호걸" },
      { text: "전장을 지배하는 압도적인 무력과 카리스마", weapon: "대도", energy: "화계심법", faction: "대당맹장" },
      { text: "모두가 공평하게 대우받는 세상을 만드는 힘", weapon: "장궁", energy: "뇌계심법", faction: "녹림호걸" }
    ]
  },
  {
    title: "거대 보스와의 결전, 당신의 포지션은?",
    icon: <Target className="w-6 h-6 text-red-600" />,
    options: [
      { text: "최전방에서 보스의 공격을 온몸으로 받아낸다.", weapon: "대도", energy: "화계심법" },
      { text: "보스의 발밑에서 약점을 끊임없이 타격한다.", weapon: "단도", energy: "뇌계심법" },
      { text: "중간 거리에서 아군을 치유하며 전황을 살핀다.", weapon: "장창", energy: "기혈대법" },
      { text: "가장 먼 곳에서 보스의 눈을 노려 화살을 쏜다.", weapon: "장궁", energy: "빙계심법" }
    ]
  },
  {
    title: "사막 한가운데서 희귀한 보물을 발견했습니다. 어떻게 하시겠습니까?",
    icon: <Gem className="w-6 h-6 text-cyan-400" />,
    options: [
      { text: "국가에 헌납하여 공적을 쌓고 명예를 얻는다.", weapon: "장검", energy: "빙계심법", faction: "대당맹장" },
      { text: "시장에 팔아 막대한 부를 챙기고 자유를 즐긴다.", weapon: "단도", energy: "기혈대법", faction: "녹림호걸" },
      { text: "더 강한 무기를 만들기 위한 재료로 사용한다.", weapon: "대도", energy: "화계심법", faction: "대당맹장" },
      { text: "어려운 사람들에게 나누어 주어 공평을 실천한다.", weapon: "장궁", energy: "뇌계심법", faction: "녹림호걸" }
    ]
  },
  {
    title: "당신이 가장 선호하는 이동 수단은?",
    icon: <Wind className="w-6 h-6 text-slate-300" />,
    options: [
      { text: "위엄 있고 튼튼한 장갑을 두른 거대 낙타", weapon: "장창", energy: "빙계심법" },
      { text: "바람처럼 빠른 명마", weapon: "장검", energy: "뇌계심법" },
      { text: "은밀하게 움직일 수 있는 작은 나귀", weapon: "단도", energy: "기혈대법" },
      { text: "어디든 오를 수 있는 강인한 발을 가진 타조", weapon: "장궁", energy: "화계심법" }
    ]
  },
  {
    title: "비무 대회 결승전, 상대가 항복을 권유합니다. 당신의 반응은?",
    icon: <Activity className="w-6 h-6 text-purple-500" />,
    options: [
      { text: "무인의 도리를 지키며 끝까지 정정당당하게 싸운다.", weapon: "장검", energy: "빙계심법", faction: "대당맹장" },
      { text: "항복하는 척하며 기습하여 승리를 쟁취한다.", weapon: "단도", energy: "기혈대법", faction: "녹림호걸" },
      { text: "압도적인 무공으로 상대의 말을 잠재운다.", weapon: "대도", energy: "화계심법", faction: "대당맹장" },
      { text: "상대의 제안을 비웃으며 화살 한 발로 답한다.", weapon: "장궁", energy: "뇌계심법", faction: "녹림호걸" }
    ]
  },
  {
    title: "긴 여정의 끝, 당신은 어떤 전설로 기억되고 싶습니까?",
    icon: <Anchor className="w-6 h-6 text-blue-700" />,
    options: [
      { text: "실크로드의 평화를 지킨 위대한 수호자", weapon: "장창", energy: "기혈대법", faction: "대당맹장" },
      { text: "누구도 잡을 수 없었던 전설적인 의적", weapon: "단도", energy: "기혈대법", faction: "녹림호걸" },
      { text: "대륙 최강의 무력을 가졌던 무신", weapon: "대도", energy: "화계심법", faction: "대당맹장" },
      { text: "바람처럼 나타나 세상을 구한 이름 없는 유협", weapon: "장궁", energy: "뇌계심법", faction: "녹림호걸" }
    ]
  }
];

// --- Components ---

export default function App() {
  const [view, setView] = useState<'start' | 'quiz' | 'result'>('start');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<{
    weapon: Record<WeaponType, number>;
    energy: Record<EnergyType, number>;
    faction: Record<FactionType, number>;
  }>({
    weapon: { "장검": 0, "단도": 0, "장창": 0, "대도": 0, "장궁": 0 },
    energy: { "빙계심법": 0, "뇌계심법": 0, "화계심법": 0, "기혈대법": 0 },
    faction: { "대당맹장": 0, "녹림호걸": 0 }
  });
  const [history, setHistory] = useState<Option[]>([]);

  const handleStart = () => setView('quiz');

  const handleSelect = (option: Option) => {
    const newScores = { ...scores };
    newScores.weapon[option.weapon]++;
    newScores.energy[option.energy]++;
    if (option.faction) {
      newScores.faction[option.faction]++;
    }
    setScores(newScores);
    setHistory([...history, option]);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setView('result');
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      const lastOption = history[history.length - 1];
      const newScores = { ...scores };
      newScores.weapon[lastOption.weapon]--;
      newScores.energy[lastOption.energy]--;
      if (lastOption.faction) {
        newScores.faction[lastOption.faction]--;
      }
      setScores(newScores);
      setHistory(history.slice(0, -1));
      setCurrentIdx(currentIdx - 1);
    } else {
      setView('start');
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScores({
      weapon: { "장검": 0, "단도": 0, "장창": 0, "대도": 0, "장궁": 0 },
      energy: { "빙계심법": 0, "뇌계심법": 0, "화계심법": 0, "기혈대법": 0 },
      faction: { "대당맹장": 0, "녹림호걸": 0 }
    });
    setHistory([]);
    setView('start');
  };

  const result = useMemo(() => {
    if (view !== 'result') return null;

    const topWeapon = (Object.keys(scores.weapon) as WeaponType[]).reduce((a, b) => 
      scores.weapon[a] >= scores.weapon[b] ? a : b
    );
    const topEnergy = (Object.keys(scores.energy) as EnergyType[]).reduce((a, b) => 
      scores.energy[a] >= scores.energy[b] ? a : b
    );
    const topFaction = (Object.keys(scores.faction) as FactionType[]).reduce((a, b) => 
      scores.faction[a] >= scores.faction[b] ? a : b
    );

    const martialArt = topWeapon === '장검' ? '비천검법' : topWeapon === '장창' ? '흑살창법' : topWeapon === '장궁' ? '파천마궁' : '고유무공';
    const jobName = JOBS[topWeapon][topEnergy];
    
    return {
      name: jobName,
      weapon: topWeapon,
      energy: topEnergy,
      faction: topFaction,
      martialArt: martialArt,
      description: DESCRIPTIONS[jobName]
    };
  }, [view, scores]);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('링크가 복사되었습니다!');
    });
  };

  const shareUrl = useMemo(() => {
    const origin = window.location.origin;
    if (origin.includes('-dev-')) {
      return origin.replace('-dev-', '-pre-');
    }
    return origin;
  }, []);
  
  const shareTitle = "실크로드 직업 성향 테스트";

  const socialPlatforms = [
    { 
      name: 'Facebook', 
      icon: <Facebook className="w-6 h-6" />, 
      color: 'bg-[#1877F2] text-white',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
    },
    { 
      name: 'X', 
      icon: <Twitter className="w-6 h-6" />, 
      color: 'bg-black text-white border border-white/20',
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank')
    },
    { 
      name: 'WhatsApp', 
      icon: <MessageCircle className="w-6 h-6" />, 
      color: 'bg-[#25D366] text-white',
      action: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank')
    },
    { 
      name: '이메일', 
      icon: <Mail className="w-6 h-6" />, 
      color: 'bg-white/10 text-white',
      action: () => window.open(`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`, '_blank')
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0502] text-white font-sans selection:bg-amber-500/30 overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-lg mx-auto min-h-screen flex flex-col p-6">
        <AnimatePresence mode="wait">
          {view === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="space-y-2">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.2 }}
                  className="text-[10px] uppercase tracking-[0.3em] font-semibold text-amber-500"
                >
                  Silkroad Online Simulation
                </motion.span>
                <h1 className="text-5xl font-serif font-bold tracking-tighter leading-none">
                  실크로드<br />
                  <span className="text-amber-500">직업 성향</span> 테스트
                </h1>
              </div>
              
              <p className="text-sm text-white/50 leading-relaxed max-w-[280px]">
                거대한 사막의 모래바람을 뚫고 당신은 어떤 전설이 될 것인가? 12개의 질문을 통해 당신의 운명을 확인하세요.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="group relative px-12 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  여정 시작하기 <ChevronRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col pt-12"
            >
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={handleBack}
                  className="p-2 -ml-2 text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Progress</span>
                  <div className="text-xl font-serif font-bold text-amber-500">
                    {String(currentIdx + 1).padStart(2, '0')} <span className="text-white/20 text-sm">/ 12</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-12">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    {QUESTIONS[currentIdx].icon}
                  </div>
                  <h2 className="text-2xl font-serif font-medium leading-snug">
                    {QUESTIONS[currentIdx].title}
                  </h2>
                </div>

                <div className="grid gap-3">
                  {QUESTIONS[currentIdx].options.map((option, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.08)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(option)}
                      className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                          {option.text}
                        </span>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-amber-500 transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mt-8 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-amber-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIdx + 1) / 12) * 100}%` }}
                />
              </div>
            </motion.div>
          )}

          {view === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-12"
            >
              <div className="space-y-8 w-full">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-500/60">Your Destiny</span>
                  <h3 className="text-sm text-white/40">당신의 운명적인 직업은...</h3>
                </div>

                <div className="relative py-12">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="absolute inset-0 bg-amber-500/10 blur-[80px] rounded-full"
                  />
                  <h1 className="relative text-6xl font-serif font-black tracking-tighter text-amber-500">
                    {result.name}
                  </h1>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                    <Users className="w-3 h-3 text-indigo-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{result.faction}</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                    <Sword className="w-3 h-3 text-amber-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{result.martialArt}</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                    <Shield className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{result.weapon}</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{result.energy}</span>
                  </div>
                </div>

                <div className="max-w-[300px] mx-auto">
                  <p className="text-sm text-white/70 leading-relaxed italic">
                    "{result.description}"
                  </p>
                </div>

                <div className="pt-12 grid grid-cols-2 gap-3 w-full">
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 py-4 bg-white text-black font-bold rounded-2xl hover:bg-amber-500 transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> 결과 공유
                  </button>
                  <button
                    onClick={handleRestart}
                    className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 font-bold rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" /> 다시 하기
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-6 w-full text-center pointer-events-none opacity-20">
        <span className="text-[8px] uppercase tracking-[0.5em] font-bold">Silkroad Online Legacy</span>
      </footer>

      {/* YouTube Style Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[450px] bg-[#212121] rounded-xl z-[101] overflow-hidden shadow-2xl border border-white/5"
            >
              <div className="p-4 flex items-center justify-between border-b border-white/10">
                <h3 className="text-lg font-medium">공유</h3>
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Social Icons Row */}
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {socialPlatforms.map((platform, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[64px]">
                      <button 
                        onClick={platform.action}
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${platform.color} hover:opacity-90 transition-opacity cursor-pointer`}
                      >
                        {platform.icon}
                      </button>
                      <span className="text-[11px] text-white/70">{platform.name}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4">
                  {/* URL Copy Box */}
                  <div className="bg-black/40 border border-white/10 rounded-lg p-3 flex items-center justify-between gap-3">
                  <div className="text-sm text-white/90 truncate font-mono">
                    {shareUrl}
                  </div>
                  <button 
                    onClick={() => copyToClipboard(shareUrl)}
                    className="bg-[#3EA6FF] hover:bg-[#65B8FF] text-black px-4 py-1.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap"
                  >
                    복사
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
