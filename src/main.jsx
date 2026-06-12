import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  Clipboard,
  CreditCard,
  ExternalLink,
  Facebook,
  GraduationCap,
  Instagram,
  Languages,
  Leaf,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sprout,
  SunMedium,
  Trees,
  Users,
  Wallet
} from 'lucide-react';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import './styles.css';

const env = import.meta.env;

const images = {
  logo: './assets/logo.webp',
  hero: './assets/drawing-child.jpeg',
  classroom: './assets/children-classroom.jpeg',
  table: './assets/children-table.jpeg',
  sun: './assets/sun-child.jpeg',
  playground: './assets/playground-child.jpeg',
  hearts: './assets/hearts-classroom.jpeg',
  damageInside: './assets/damage-inside.jpeg',
  damageYard: './assets/damage-yard.jpeg',
  brokenSlide: './assets/broken-slide.jpeg'
};

const wallets = [
  {
    id: 'usdt-erc20',
    asset: 'Tether USD',
    symbol: 'USDT',
    network: 'Ethereum ERC20',
    address: '0x4b1ab768a07c59068b988bc2fa9e0001cc2049ec',
    qrImage: './assets/qr-erc20.png',
    explorer: 'https://etherscan.io/address/'
  },
  {
    id: 'usdt-trc20',
    asset: 'Tether USD',
    symbol: 'USDT',
    network: 'Tron TRC20',
    address: 'TJQNSUSdMgd9eEX97NNkgbKaqm3TUdU4zW',
    qrImage: './assets/qr-trc20.png',
    explorer: 'https://tronscan.org/#/address/'
  },
  {
    id: 'usdt-bep20',
    asset: 'Tether USD',
    symbol: 'USDT',
    network: 'BNB Smart Chain BEP20',
    address: '0x4b1ab768a07c59068b988bc2fa9e0001cc2049ec',
    qrImage: './assets/qr-bep20.png',
    explorer: 'https://bscscan.com/address/'
  }
];

const checkoutLinks = [
  {
    id: 'stationery-10',
    icon: CreditCard,
    title: '$10 school stationery',
    titleAr: '10 دولار قرطاسية مدرسية',
    description: 'Direct payment for school stationery for one child.',
    descriptionAr: 'دفع مباشر لقرطاسية مدرسية لطفل واحد.',
    note: '$10 USD covers school stationery for one kid.',
    noteAr: '10 دولار توفر قرطاسية مدرسية لطفل واحد.',
    qrImage: './assets/nowpayments-10-usd.png',
    url: 'https://nowpayments.io/donation?api_key=8ee60387-8c76-4f31-a657-116e23c436af'
  },
  {
    id: 'direct-5',
    icon: CreditCard,
    title: '$5 USDT direct payment',
    titleAr: '5 USDT دفع مباشر',
    description: 'Direct NOWPayments checkout for a smaller contribution.',
    descriptionAr: 'رابط دفع مباشر عبر NOWPayments لمساهمة أصغر.',
    note: 'Add your name if you want us to list it on our social media updates.',
    noteAr: 'أضف اسمك إذا أردت ذكره في تحديثاتنا على وسائل التواصل.',
    qrImage: './assets/nowpayments-5-usdt.png',
    url: 'https://nowpayments.io/payment/?iid=6123186891'
  }
];

const cardPaymentLinks = [
  {
    id: 'alchemy-card',
    icon: CreditCard,
    title: 'Card, Google Pay, or Apple Pay',
    titleAr: 'بطاقة أو Google Pay أو Apple Pay',
    description: 'Use Alchemy Pay to buy USDT with a bank card, Google Pay, or Apple Pay.',
    descriptionAr: 'استخدم Alchemy Pay لشراء USDT ببطاقة بنكية أو Google Pay أو Apple Pay.',
    url: 'https://ramp.alchemypay.org/?crypto=USDT&network=TRX&appId=vn52E3md9v5614U0&sign=RJwzeBeu4WOVg2deuPmwwcPhbOdIyGHrtqmp11kgapI%2Bm%2FOKoK7FDDxCUmigXeEzjeG1IWifixMitYgLVYwUpolAnpNss9GtudybcMqu2IY%3D&address=TMbKvve2287WZRNfscWqGZGnwyVDyCQZHG&fiat=USD&fiatAmount=100.000000&callbackUrl=https://api.trustwallet.com/v1/payments/webhooks/alchemypay&merchantOrderNo=dfc66a51-4460-4d2f-a1b4-c72047e78d08'
  },
  {
    id: 'unlimit-card',
    icon: CreditCard,
    title: 'Alternative card payment',
    titleAr: 'خيار دفع بديل بالبطاقة',
    description: 'Use Unlimit Onramp as another hosted card payment option.',
    descriptionAr: 'استخدم Unlimit Onramp كخيار دفع مستضاف آخر بالبطاقة.',
    url: 'https://onramp.crypto.unlimit.com/?gtfTradeId=71b5ae89-a4ef-4ab6-ba89-16084a3665b4&merchantId=a20574e4-f67b-49b8-b4db-fd8894e10856&lang=en_US&ts=1779913540&device=3b946842cbd97b3d22c8e96dc6da6c04d92dc0af2d2bf61921f9f3f0fa9d5465&signature=2dc36578024234841ccd01abd7050aa057089ac7194a0bbcb9e066909c5fda3f'
  }
];

const copy = {
  en: {
    nav: ['Story', 'Donate', 'Reports', 'Updates', 'Verify'],
    donate: 'Donate Now',
    contact: 'Contact Organizers',
    updates: 'See Updates',
    heroKicker: 'Emergency education and rebuilding fund',
    heroTitle: 'Help Gaza children keep learning in safety and hope.',
    heroText:
      'This public, fundraising site supports a kindergarten of creativity in Gaza after severe damage to its learning and play spaces. Donations help rebuild classrooms, replace supplies, and keep teachers and workers paid.',
    children: 'children supported',
    target: 'rebuild target',
    verified: 'public wallet verification',
    aboutTitle: 'A kindergarten that still carries light',
    aboutText:
      'Before the destruction, this kindergarten of creativity was a safe and colorful place for drawing, singing, early reading, and play. The campaign is focused on restoring a protected space where children can return to learning and ordinary childhood routines.',
    conditions:
      'Current priorities include repairing the damaged place, replacing stationery and school supplies, and helping cover teacher, worker, and construction worker payments while the school rebuilds.',
    donationTitle: 'Choose a secure way to help',
    cryptoTitle: 'USDT deposit networks',
    cardTitle: 'Direct payments',
    reportsTitle: 'Transparency and reports',
    updatesTitle: 'Updates and news',
    contactTitle: 'Contact and verification',
    faqTitle: 'FAQ',
    securityTitle: 'Security notes',
    warning:
      'Verify wallet addresses carefully before sending funds. Never share private keys or seed phrases. This website never stores wallet private keys or payment card information.',
    verify:
      'Donations are sent directly to official public wallets or trusted hosted checkout pages. Every blockchain transaction can be independently verified on public explorers.',
    configured: 'Ready',
    notConfigured: 'Add official address',
    copy: 'Copy',
    copied: 'Copied',
    explorer: 'Explorer',
    unavailable: 'Add link before launch',
    report: 'Public report',
    footer: 'Restoring safety, learning, and play for children in Gaza.'
  },
  ar: {
    nav: ['القصة', 'تبرع', 'التقارير', 'التحديثات', 'التحقق'],
    donate: 'تبرع الآن',
    contact: 'تواصل مع المنظمين',
    updates: 'شاهد التحديثات',
    heroKicker: 'صندوق عاجل للتعليم وإعادة البناء',
    heroTitle: 'ساعد أطفال غزة على مواصلة التعلم بأمان وأمل.',
    heroText:
      'هذا الموقع العام لجمع التبرعات يعمل من الواجهة فقط لدعم روضة في غزة بعد تضرر مساحات التعلم واللعب. التبرعات تساعد في إعادة بناء الفصول، توفير المستلزمات، ودعم رواتب المعلمات والعاملين.',
    children: 'طفلا يتم دعمهم',
    target: 'هدف إعادة البناء',
    verified: 'تحقق عبر محافظ عامة',
    aboutTitle: 'روضة ما زالت تحمل الضوء',
    aboutText:
      'قبل الدمار، كانت الروضة مكانا آمنا وملونا للرسم والغناء والقراءة المبكرة واللعب. تركز الحملة على استعادة مساحة محمية يعود فيها الأطفال إلى التعلم وطقوس الطفولة اليومية.',
    conditions:
      'تشمل الأولويات الحالية إصلاح المكان المتضرر، توفير القرطاسية والمستلزمات المدرسية، والمساعدة في دفع مستحقات المعلمات والعاملين وعمال البناء أثناء إعادة البناء.',
    donationTitle: 'اختر طريقة آمنة للمساعدة',
    cryptoTitle: 'شبكات إيداع USDT',
    cardTitle: 'مدفوعات مباشرة',
    reportsTitle: 'الشفافية والتقارير',
    updatesTitle: 'الأخبار والتحديثات',
    contactTitle: 'التواصل والتحقق',
    faqTitle: 'أسئلة شائعة',
    securityTitle: 'ملاحظات الأمان',
    warning:
      'تحقق من عناوين المحافظ بعناية قبل إرسال الأموال. لا تشارك المفاتيح الخاصة أو عبارات الاسترداد أبدا. هذا الموقع لا يخزن مفاتيح المحافظ الخاصة أو معلومات بطاقات الدفع.',
    verify:
      'تصل التبرعات مباشرة إلى المحافظ الرسمية العامة أو إلى صفحات دفع مستضافة وموثوقة. يمكن التحقق من كل معاملة بلوكتشين عبر مستكشفات عامة.',
    configured: 'جاهز',
    notConfigured: 'أضف العنوان الرسمي',
    copy: 'نسخ',
    copied: 'تم النسخ',
    explorer: 'المستكشف',
    unavailable: 'أضف الرابط قبل النشر',
    report: 'تقرير عام',
    footer: 'استعادة الأمان والتعلم واللعب لأطفال غزة.'
  }
};

const budget = [
  { name: 'Rebuild the place', nameAr: 'إعادة بناء المكان', value: 20000, color: '#5da86e' },
  { name: 'Stationery and supplies', nameAr: 'قرطاسية ومستلزمات', value: 5000, color: '#f4be62' },
  { name: 'Teachers, workers, and construction workers', nameAr: 'المعلمات والعاملون وعمال البناء', value: 10000, color: '#db7f67' }
];

function App() {
  const [lang, setLang] = useState('en');
  const [copied, setCopied] = useState('');
  const isAr = lang === 'ar';
  const t = copy[lang];

  const dir = isAr ? 'rtl' : 'ltr';

  return (
    <div className="app" dir={dir}>
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} isAr={isAr} />
      <main>
        <About t={t} isAr={isAr} />
        <DonationSection
          t={t}
          isAr={isAr}
          copied={copied}
          setCopied={setCopied}
        />
        <Reports t={t} isAr={isAr} />
        <Updates t={t} isAr={isAr} />
        <Contact t={t} isAr={isAr} />
        <Security t={t} isAr={isAr} />
        <FAQ t={t} isAr={isAr} />
      </main>
      <Footer t={t} isAr={isAr} />
    </div>
  );
}

function Nav({ lang, setLang, t }) {
  return (
    <header className="nav-shell">
      <a className="brand" href="#top" aria-label="Kindergarten of creativity home">
        <img src={images.logo} alt="Kindergarten  of creativity" />
        <span>Kindergarten of creativity</span>
      </a>
      <nav aria-label="Primary navigation">
        {t.nav.map((item, index) => (
          <a key={item} href={['#story', '#donate', '#reports', '#updates', '#verify'][index]}>
            {item}
          </a>
        ))}
      </nav>
      <button className="icon-button lang-toggle" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>
        <Languages size={18} />
        <span>{lang === 'en' ? 'العربية' : 'English'}</span>
      </button>
    </header>
  );
}

function Hero({ t, isAr }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 90]);
  const totalNeeded = budget.reduce((sum, item) => sum + item.value, 0);

  return (
    <section id="top" className="hero">
      <motion.img style={{ y }} className="hero-bg" src={images.hero} alt="Child drawing in the kindergarten playground" />
      <div className="hero-overlay" />
      <NatureLayer />
      <div className="hero-content">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="kicker"><Sprout size={18} />{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#donate">{t.donate}<ArrowRight size={18} /></a>
            <a className="secondary-button" href="#verify">{t.contact}<MessageCircle size={18} /></a>
            <a className="ghost-button" href="#updates">{t.updates}<ChevronDown size={18} /></a>
          </div>
        </motion.div>
        <motion.div
          className="hero-panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="panel-heading">
            <span><BadgeCheck size={18} />{isAr ? 'احتياجات الحملة' : 'Campaign needs'}</span>
            <strong>${totalNeeded.toLocaleString()}</strong>
          </div>
          <div className="money-row">
            <div><small>{isAr ? 'المبلغ المطلوب' : 'Needed amount'}</small><strong>${totalNeeded.toLocaleString()}</strong></div>
            <div><small>{isAr ? 'تقرير ثابت' : 'Static report'}</small><strong>{isAr ? 'احتياجات فقط' : 'Needs only'}</strong></div>
          </div>
          <div className="impact-grid">
            <div><Users size={22} /><strong>120+</strong><span>{t.children}</span></div>
            <div><Building2 size={22} /><strong>$20k</strong><span>{t.target}</span></div>
            <div><ShieldCheck size={22} /><strong>100%</strong><span>{t.verified}</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NatureLayer() {
  return (
    <div className="nature-layer" aria-hidden="true">
      <span className="sun"><SunMedium /></span>
      <span className="cloud cloud-one" />
      <span className="cloud cloud-two" />
      <span className="leaf leaf-one"><Leaf /></span>
      <span className="leaf leaf-two"><Leaf /></span>
      <span className="leaf leaf-three"><Leaf /></span>
    </div>
  );
}

function About({ t, isAr }) {
  const storyCards = [
    { icon: BookOpen, title: isAr ? 'التعليم' : 'Education', text: isAr ? 'إعادة فتح مساحة تعلم آمنة.' : 'Reopen a safe learning space.' },
    { icon: Trees, title: isAr ? 'الأمان' : 'Safety', text: isAr ? 'إصلاح مناطق اللعب والفصول.' : 'Repair play areas and classrooms.' },
    { icon: GraduationCap, title: isAr ? 'العاملون' : 'Staff', text: isAr ? 'دعم المعلمات والعاملين.' : 'Support teachers and workers.' }
  ];

  return (
    <section id="story" className="section split-section">
      <div className="section-copy">
        <span className="section-kicker"><Leaf size={17} />{isAr ? 'القصة' : 'The story'}</span>
        <h2>{t.aboutTitle}</h2>
        <p>{t.aboutText}</p>
        <p>{t.conditions}</p>
        <div className="story-card-row">
          {storyCards.map(({ icon: Icon, title, text }) => (
            <div className="mini-card" key={title}>
              <Icon size={22} />
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="photo-story">
        <img className="photo-large" src={images.classroom} alt="Children standing in their classroom before the destruction" />
        <img className="photo-small one" src={images.playground} alt="Child smiling on a playground slide" />
        <img className="photo-small two" src={images.damageInside} alt="Damaged interior area after destruction" />
      </div>
    </section>
  );
}

function DonationSection({ t, isAr, copied, setCopied }) {
  async function copyAddress(wallet) {
    if (!wallet.address) return;
    await navigator.clipboard.writeText(wallet.address);
    setCopied(wallet.id);
    window.setTimeout(() => setCopied(''), 1500);
  }

  return (
    <section id="donate" className="section donation-section">
      <div className="section-header">
        <span className="section-kicker"><Wallet size={17} />{isAr ? 'التبرعات' : 'Donations'}</span>
        <h2>{t.donationTitle}</h2>
        <p>{t.warning}</p>
      </div>
      <div className="donation-stack">
        <div className="donation-column payment-column">
          <h3>{t.cardTitle}</h3>
          <p>{isAr ? 'استخدم هذه الروابط للدفع المباشر عبر NOWPayments.' : 'Use these links for direct payment through NOWPayments.'}</p>
          <div className="checkout-list">
            {checkoutLinks.map(({ id, icon: Icon, title, titleAr, description, descriptionAr, note, noteAr, qrImage, url }) => (
              <a
                key={id}
                className="checkout-card direct-payment-card"
                href={url || '#donate'}
                target={url ? '_blank' : undefined}
                rel="noreferrer"
              >
                <img src={qrImage} alt={`${isAr ? titleAr : title} QR code`} />
                <span>
                  <strong><Icon size={21} />{isAr ? titleAr : title}</strong>
                  <small>{url ? (isAr ? descriptionAr : description) : t.unavailable}</small>
                  <em>{isAr ? noteAr : note}</em>
                </span>
                <ExternalLink size={18} />
              </a>
            ))}
          </div>
          <p className="small-note">
            {isAr
              ? 'ملاحظة صغيرة: أضف اسمك أثناء الدفع إذا أردت إدراجه في منشورات الشكر والتحديثات على وسائل التواصل الاجتماعي.'
              : 'Small note: add your name during payment if you want it listed in our thank-you and update posts on social media.'}
          </p>
        </div>
        <div className="donation-column card-payment-column">
          <h3>{isAr ? 'الدفع بالبطاقة أو Google Pay أو Apple Pay' : 'Pay by card, Google Pay, or Apple Pay'}</h3>
          <p>
            {isAr
              ? 'إذا كنت تفضل الدفع بالبطاقة، سيتم توجيهك إلى صفحة دفع مستضافة وآمنة. هذا الموقع لا يعالج أو يخزن بيانات البطاقة.'
              : 'If you prefer to pay by card, you will be redirected to a secure hosted payment page. This website does not process or store card details.'}
          </p>
          <div className="card-ramp-list">
            {cardPaymentLinks.map(({ id, icon: Icon, title, titleAr, description, descriptionAr, url }) => (
              <a className="card-ramp-card" href={url} key={id} target="_blank" rel="noreferrer">
                <Icon size={24} />
                <span>
                  <strong>{isAr ? titleAr : title}</strong>
                  <small>{isAr ? descriptionAr : description}</small>
                </span>
                <ExternalLink size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className="donation-column">
          <h3>{t.cryptoTitle}</h3>
          <p>{isAr ? 'إذا كنت تفضل الدفع بطريقتك الخاصة، انسخ العنوان الصحيح للشبكة التي ستستخدمها.' : 'If you prefer to pay in your own way, copy the correct address for the network you will use.'}</p>
          <div className="wallet-grid">
            {wallets.map((wallet) => {
              const configured = Boolean(wallet.address);
              return (
                <article className="wallet-card" key={wallet.id}>
                  <div className="wallet-top">
                    <div>
                      <strong>{wallet.symbol}</strong>
                      <span>{wallet.network}</span>
                    </div>
                    <em className={configured ? 'ready' : 'pending'}>
                      {configured ? t.configured : t.notConfigured}
                    </em>
                  </div>
                  <div className="qr-image-box">
                    <img src={wallet.qrImage} alt={`${wallet.network} USDT deposit QR code`} />
                  </div>
                  <code>{wallet.address}</code>
                  <div className="wallet-actions">
                    <button disabled={!configured} onClick={() => copyAddress(wallet)}>
                      {copied === wallet.id ? <Check size={16} /> : <Clipboard size={16} />}
                      {copied === wallet.id ? t.copied : t.copy}
                    </button>
                    <a
                      className={!configured ? 'disabled-link' : ''}
                      href={configured ? `${wallet.explorer}${wallet.address}` : '#donate'}
                      target={configured ? '_blank' : undefined}
                      rel="noreferrer"
                    >
                      <ExternalLink size={16} />{t.explorer}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="notice-card">
            <AlertTriangle size={22} />
            <span>{t.warning}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reports({ t, isAr }) {
  const total = budget.reduce((sum, item) => sum + item.value, 0);
  return (
    <section id="reports" className="section reports-section">
      <div className="section-header">
        <span className="section-kicker"><ShieldCheck size={17} />{t.report}</span>
        <h2>{t.reportsTitle}</h2>
        <p>{isAr ? 'يعرض هذا القسم المبالغ المطلوبة فقط لكل بند من بنود الحملة.' : 'This section shows the needed amounts only for each campaign priority.'}</p>
      </div>
      <div className="reports-grid">
        <div className="chart-card">
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie data={budget} dataKey="value" nameKey={isAr ? 'nameAr' : 'name'} innerRadius={70} outerRadius={105} paddingAngle={4}>
                {budget.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <strong>${total.toLocaleString()} {isAr ? 'هدف الحملة' : 'campaign target'}</strong>
        </div>
        <div className="expense-list">
          {budget.map((item) => (
            <div className="expense-card" key={item.name}>
              <span style={{ background: item.color }} />
              <div>
                <strong>{isAr ? item.nameAr : item.name}</strong>
                <small>${item.value.toLocaleString()}</small>
              </div>
              <div className="expense-bar"><i style={{ width: `${(item.value / total) * 100}%`, background: item.color }} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Updates({ t, isAr }) {
  const facebookUrl = env.VITE_FACEBOOK_URL || 'https://www.facebook.com/roda.alebda3.altarbawy';
  return (
    <section id="updates" className="section updates-section">
      <div className="section-header">
        <span className="section-kicker"><Facebook size={17} />{isAr ? 'تحديثات الحملة' : 'Campaign updates'}</span>
        <h2>{t.updatesTitle}</h2>
        <p>
          {isAr
            ? 'إذا أردت مشاهدة التحديثات والصور والأخبار، ستجد كل التحديثات على صفحة فيسبوك الرسمية.'
            : 'If you want to see updates, photos, and news, all updates will be shared on our Facebook page.'}
        </p>
      </div>
      <div className="facebook-update-card">
        <img src={images.hearts} alt="Children in the kindergarten classroom" />
        <div>
          <h3>{isAr ? 'تابع كل التحديثات على فيسبوك' : 'Follow all updates on Facebook'}</h3>
          <p>
            {isAr
              ? 'سننشر هناك أخبار الحملة، صور التقدم، وقوائم الشكر للمتبرعين الذين يضيفون أسماءهم.'
              : 'We will post campaign news, progress photos, and thank-you name lists for donors who add their names.'}
          </p>
          <a className="primary-button" href={facebookUrl} target="_blank" rel="noreferrer">
            Facebook <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact({ t, isAr }) {
  const contacts = [
    { icon: MessageCircle, label: 'WhatsApp', value: env.VITE_WHATSAPP_URL || 'https://wa.me/972599834486' },
    { icon: MessageCircle, label: 'Telegram', value: env.VITE_TELEGRAM_URL || '#temp' },
    { icon: Mail, label: 'Email', value: env.VITE_EMAIL ? `mailto:${env.VITE_EMAIL}` : 'khalil3533565@gmail.com' },
    { icon: Instagram, label: 'Instagram', value: env.VITE_INSTAGRAM_URL || '#temp' },
    { icon: Facebook, label: 'Facebook', value: env.VITE_FACEBOOK_URL || 'https://www.facebook.com/roda.alebda3.altarbawy' }
  ];

  return (
    <section id="verify" className="section contact-section">
      <div className="section-header">
        <span className="section-kicker"><BadgeCheck size={17} />{isAr ? 'تحقق' : 'Verification'}</span>
        <h2>{t.contactTitle}</h2>
        <p>{t.verify}</p>
      </div>
      <div className="contact-grid">
        <div className="organizer-card">
          <img src={images.logo} alt="Kindergarten of creativity" />
          <h3>{isAr ? 'فريق المبادرة' : 'Initiative organizers'}</h3>
          <p>{isAr ? 'تواصل مباشرة للتحقق من المحافظ، التقارير، وآخر احتياجات الروضة.' : 'Contact directly to verify wallets, reports, and the kindergarten current needs.'}</p>
        </div>
        <div className="contact-list">
          {contacts.map(({ icon: Icon, label, value }) => (
            <a href={value} key={label} target={value.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <Icon size={21} />
              <span>{label}</span>
              <ExternalLink size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Security({ t, isAr }) {
  return (
    <section className="section security-section">
      <div className="security-card">
        <ShieldCheck size={38} />
        <div>
          <span className="section-kicker">{t.securityTitle}</span>
          <h2>{isAr ? 'تبرع بأمان وثقة' : 'Donate with careful confidence'}</h2>
          <p>{t.warning}</p>
          <p>{t.verify}</p>
        </div>
      </div>
    </section>
  );
}

function FAQ({ t, isAr }) {
  const items = [
    {
      q: isAr ? 'هل يعالج الموقع بيانات البطاقات؟' : 'Does this website process card data?',
      a: isAr ? 'لا. يتم توجيه المتبرع إلى صفحات دفع مستضافة مثل NOWPayments.' : 'No. Donors are redirected to hosted processors such as NOWPayments.'
    },
    {
      q: isAr ? 'هل أحتاج إلى قاعدة بيانات؟' : 'Is a backend database required?',
      a: isAr ? 'لا. الموقع يعمل من الواجهة فقط ويمكنه قراءة بيانات عامة من مستكشفات البلوكتشين.' : 'No. The site is frontend-only and can read public data from blockchain explorers.'
    },
    {
      q: isAr ? 'كيف يتم تحديث التقارير؟' : 'How are reports updated?',
      a: isAr ? 'يمكن تعديل بيانات التقارير والتحديثات في ملفات الواجهة أو ربطها لاحقا بمصدر عام.' : 'Reports can be edited in the frontend files or later connected to a public source.'
    }
  ];
  return (
    <section className="section faq-section">
      <div className="section-header">
        <span className="section-kicker"><MessageCircle size={17} />{t.faqTitle}</span>
        <h2>{isAr ? 'أسئلة مهمة للمتبرعين' : 'Important donor questions'}</h2>
      </div>
      <div className="faq-grid">
        {items.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer({ t, isAr }) {
  return (
    <footer>
      <div>
        <img src={images.logo} alt="" />
        <strong>Hope Kindergarten Gaza Relief</strong>
        <p>{t.footer}</p>
      </div>
      <div className="footer-wallets">
        {wallets.map((wallet) => (
          <span key={wallet.id}>{wallet.symbol} · {wallet.network}</span>
        ))}
      </div>
      <a href="#top">{isAr ? 'العودة للأعلى' : 'Back to top'}</a>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
