import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from '../ui.service';

type CategoryItem = {
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  slug: string;
  mark: string;
};

type ShowcaseName = {
  tamil: string;
  english: string;
  meaning: string;
  meaningTa: string;
  category: string;
  categoryTa: string;
};

type SeoGuideItem = {
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchValue = '';
  savedNames = new Set<string>();
  copiedName = '';

  categories: CategoryItem[] = [
    {
      title: 'Girl Names',
      titleTa: 'பெண் பெயர்கள்',
      description: 'Soft, strong, and meaningful names with a graceful Tamil identity.',
      descriptionTa: 'மென்மை, வலிமை, அர்த்தம் ஆகியவை இணையும் பெண் பெயர்கள்.',
      slug: 'girl',
      mark: 'பெ'
    },
    {
      title: 'Boy Names',
      titleTa: 'ஆண் பெயர்கள்',
      description: 'Rooted names with confidence, clarity, and modern sound.',
      descriptionTa: 'தன்னம்பிக்கை, தெளிவு, நவீன ஒலி கொண்ட ஆண் பெயர்கள்.',
      slug: 'boy',
      mark: 'ஆ'
    },
    {
      title: 'Modern Tamil',
      titleTa: 'நவீன தமிழ்',
      description: 'Short, memorable choices for global Tamil families.',
      descriptionTa: 'உலகத் தமிழ் குடும்பங்களுக்கு குறுகிய, நினைவில் நிற்கும் பெயர்கள்.',
      slug: 'modern',
      mark: 'மோ'
    },
    {
      title: 'Traditional',
      titleTa: 'மரபு',
      description: 'Names that carry family memory, literature, and cultural depth.',
      descriptionTa: 'குடும்ப நினைவு, இலக்கியம், கலாச்சார ஆழம் கொண்ட பெயர்கள்.',
      slug: 'traditional',
      mark: 'ம'
    },
    {
      title: 'Nakshatra',
      titleTa: 'நட்சத்திரம்',
      description: 'Explore names through birth stars, sounds, and auspicious syllables.',
      descriptionTa: 'நட்சத்திரம், ஒலி, சுப எழுத்துகள் வழியாக பெயர்களை கண்டறியுங்கள்.',
      slug: 'nakshatra',
      mark: 'ந'
    },
    {
      title: 'Rare Collection',
      titleTa: 'அரிய தொகுப்பு',
      description: 'Uncommon Tamil names that still feel elegant and usable.',
      descriptionTa: 'அரியதாய் இருந்தாலும் எளிதாக பயன்படும் அழகான தமிழ் பெயர்கள்.',
      slug: 'rare',
      mark: 'ரே'
    }
  ];

  trendingNames: ShowcaseName[] = [
    { tamil: 'ஆதிரா', english: 'Aathira', meaning: 'Moonlight, gentle radiance', meaningTa: 'நிலவொளி, மென்மையான பிரகாசம்', category: 'Girl', categoryTa: 'பெண்' },
    { tamil: 'கவின்', english: 'Kavin', meaning: 'Beauty, poet, elegance', meaningTa: 'அழகு, கவிஞன், நயம்', category: 'Boy', categoryTa: 'ஆண்' },
    { tamil: 'இனியா', english: 'Iniya', meaning: 'Sweet, pleasant, kind', meaningTa: 'இனிமை, மகிழ்ச்சி, கருணை', category: 'Girl', categoryTa: 'பெண்' },
    { tamil: 'நிலன்', english: 'Nilan', meaning: 'Moon, calm presence', meaningTa: 'நிலவு, அமைதியான இருப்பு', category: 'Boy', categoryTa: 'ஆண்' },
    { tamil: 'யாழினி', english: 'Yaazhini', meaning: 'Musical, graceful', meaningTa: 'இசை நயம், அழகிய தன்மை', category: 'Girl', categoryTa: 'பெண்' }
  ];

  seoGuides: SeoGuideItem[] = [
    {
      title: 'Tamil baby girl names with meaning',
      titleTa: 'அர்த்தமுள்ள தமிழ் பெண் குழந்தை பெயர்கள்',
      description: 'Browse modern and traditional girl names with Tamil spelling, English pronunciation, and short meaning notes for quick comparison.',
      descriptionTa: 'தமிழ் எழுத்து, ஆங்கில உச்சரிப்பு, சுருக்கமான அர்த்த குறிப்புகளுடன் பெண் பெயர்களை ஒப்பிடுங்கள்.'
    },
    {
      title: 'Tamil baby boy names by starting letter',
      titleTa: 'முதல் எழுத்து வழியாக ஆண் குழந்தை பெயர்கள்',
      description: 'Filter boy names by Tamil letters like அ, க, ச, த, ந, ம, ர, ல, and வ to match family sound preferences.',
      descriptionTa: 'அ, க, ச, த, ந, ம, ர, ல, வ போன்ற எழுத்துகள் வழியாக ஆண் பெயர்களை தேர்வு செய்யுங்கள்.'
    },
    {
      title: 'Modern Tamil names for global families',
      titleTa: 'உலகத் தமிழ் குடும்பங்களுக்கு நவீன பெயர்கள்',
      description: 'Find names that feel rooted in Tamil culture while staying short, memorable, and easy to pronounce internationally.',
      descriptionTa: 'தமிழ் வேருடன் உலகளவில் எளிதாக உச்சரிக்கப்படும் குறுகிய, நினைவில் நிற்கும் பெயர்களை கண்டறியுங்கள்.'
    }
  ];

  faqs: SeoGuideItem[] = [
    {
      title: 'How do I choose a Tamil baby name?',
      titleTa: 'தமிழ் குழந்தை பெயரை எப்படி தேர்வு செய்வது?',
      description: 'Start with meaning, pronunciation, family tradition, starting letter, and how the name sounds in both Tamil and English.',
      descriptionTa: 'அர்த்தம், உச்சரிப்பு, குடும்ப மரபு, முதல் எழுத்து, தமிழ் மற்றும் ஆங்கிலத்தில் ஒலி ஆகியவற்றைப் பார்த்து தேர்வு செய்யலாம்.'
    },
    {
      title: 'Can I search by Tamil letter?',
      titleTa: 'தமிழ் எழுத்து வழியாக தேட முடியுமா?',
      description: 'Yes. Use the Tamil A-Z section to browse names by starting sound and letter.',
      descriptionTa: 'ஆம். தமிழ் அ-ஔ பகுதியை பயன்படுத்தி முதல் ஒலி மற்றும் எழுத்து வழியாக பெயர்களை பார்க்கலாம்.'
    },
    {
      title: 'Are modern Tamil names included?',
      titleTa: 'நவீன தமிழ் பெயர்களும் உள்ளதா?',
      description: 'Yes. The collection includes traditional, modern, rare, short, and culturally rooted Tamil baby names.',
      descriptionTa: 'ஆம். மரபு, நவீன, அரிய, குறுகிய, கலாச்சார வேருடைய தமிழ் பெயர்கள் உள்ளன.'
    }
  ];

  letters = [
    { tamil: 'அ', slug: 'a', label: 'A' },
    { tamil: 'ஆ', slug: 'aa', label: 'Aa' },
    { tamil: 'இ', slug: 'i', label: 'I' },
    { tamil: 'ஈ', slug: 'ii', label: 'Ii' },
    { tamil: 'உ', slug: 'u', label: 'U' },
    { tamil: 'ஊ', slug: 'uu', label: 'Uu' },
    { tamil: 'எ', slug: 'e', label: 'E' },
    { tamil: 'ஏ', slug: 'ee', label: 'Ee' },
    { tamil: 'ஐ', slug: 'ai', label: 'Ai' },
    { tamil: 'ஒ', slug: 'o', label: 'O' },
    { tamil: 'ஓ', slug: 'oo', label: 'Oo' },
    { tamil: 'ஔ', slug: 'au', label: 'Au' },
    { tamil: 'க', slug: 'ka', label: 'Ka' },
    { tamil: 'ச', slug: 'sa', label: 'Sa' },
    { tamil: 'த', slug: 'tha', label: 'Tha' },
    { tamil: 'ந', slug: 'na', label: 'Na' },
    { tamil: 'ம', slug: 'ma', label: 'Ma' },
    { tamil: 'ர', slug: 'ra', label: 'Ra' },
    { tamil: 'ல', slug: 'la', label: 'La' },
    { tamil: 'வ', slug: 'va', label: 'Va' }
  ];

  constructor(private router: Router, public ui: UiService) {}

  getCategoryTitle(item: CategoryItem): string {
    return this.ui.language === 'ta' ? item.titleTa : item.title;
  }

  getCategoryDescription(item: CategoryItem): string {
    return this.ui.language === 'ta' ? item.descriptionTa : item.description;
  }

  getNameMeaning(item: ShowcaseName): string {
    return this.ui.language === 'ta' ? item.meaningTa : item.meaning;
  }

  getNameCategory(item: ShowcaseName): string {
    return this.ui.language === 'ta' ? item.categoryTa : item.category;
  }

  getGuideTitle(item: SeoGuideItem): string {
    return this.ui.language === 'ta' ? item.titleTa : item.title;
  }

  getGuideDescription(item: SeoGuideItem): string {
    return this.ui.language === 'ta' ? item.descriptionTa : item.description;
  }

  onSearch(): void {
    const query = this.searchValue.trim();
    if (!query) {
      return;
    }
    this.router.navigate(['/names'], { queryParams: { q: query } });
  }

  toggleSaved(name: string): void {
    if (this.savedNames.has(name)) {
      this.savedNames.delete(name);
      return;
    }
    this.savedNames.add(name);
  }

  copyName(name: string): void {
    this.copiedName = name;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(name).catch(() => undefined);
    }
    window.setTimeout(() => {
      if (this.copiedName === name) {
        this.copiedName = '';
      }
    }, 1400);
  }

  whatsappUrl(item: ShowcaseName): string {
    return `https://wa.me/?text=${encodeURIComponent(`${item.tamil} (${item.english}) - ${item.meaning}`)}`;
  }
}
