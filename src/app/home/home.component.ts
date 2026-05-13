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
