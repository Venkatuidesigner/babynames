import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../ui.service';
import { SeoService } from '../seo.service';

interface NameItem {
  id?: number;
  name?: string;
  tamil: string;
  english: string;
  meaning?: string;
  description?: string;
  category?: string[];
  tags?: string[];
  language?: string;
  religion?: string;
  gender?: 'boy' | 'girl' | 'unisex' | string;
  isPureTamil?: boolean;
  length?: string;
  startsWith?: string;
  slug?: string;
}

interface LetterOption {
  tamil: string;
  english: string;
  slug: string;
}

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit {
  allNames: NameItem[] = [];
  boyNames: NameItem[] = [];
  searchValue = '';
  activeLetter = 'அனைத்தும்';
  activeGender: 'girl' | 'boy' = 'girl';
  currentPage = 1;
  readonly pageSize = 20;

  letterOptions: LetterOption[] = [
    { tamil: 'அனைத்தும்', english: 'All', slug: 'All' },
    { tamil: 'அ', english: 'A', slug: 'a' },
    { tamil: 'ஆ', english: 'Aa', slug: 'aa' },
    { tamil: 'இ', english: 'I', slug: 'i' },
    { tamil: 'ஈ', english: 'Ii', slug: 'ii' },
    { tamil: 'உ', english: 'U', slug: 'u' },
    { tamil: 'ஊ', english: 'Uu', slug: 'uu' },
    { tamil: 'எ', english: 'E', slug: 'e' },
    { tamil: 'ஏ', english: 'Ee', slug: 'ee' },
    { tamil: 'ஐ', english: 'Ai', slug: 'ai' },
    { tamil: 'ஒ', english: 'O', slug: 'o' },
    { tamil: 'ஓ', english: 'Oo', slug: 'oo' },
    { tamil: 'ஒள', english: 'Au', slug: 'au' },
    { tamil: 'க', english: 'Ka', slug: 'ka' },
    { tamil: 'ச', english: 'Sa', slug: 'sa' },
    { tamil: 'ஞ', english: 'Nya', slug: 'nya' },
    { tamil: 'த', english: 'Tha', slug: 'tha' },
    { tamil: 'ந', english: 'Na', slug: 'na' },
    { tamil: 'ப', english: 'Pa', slug: 'pa' },
    { tamil: 'ம', english: 'Ma', slug: 'ma' },
    { tamil: 'ய', english: 'Ya', slug: 'ya' },
    { tamil: 'ர', english: 'Ra', slug: 'ra' },
    { tamil: 'ல', english: 'La', slug: 'la' },
    { tamil: 'வ', english: 'Va', slug: 'va' },
    { tamil: 'ஔ', english: 'Auu', slug: 'auu' }
  ];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private seo: SeoService,
    public ui: UiService
  ) {}

  ngOnInit(): void {
    this.loadTamilNames();
    this.loadBoyNames();

    this.route.paramMap.subscribe((params) => {
      const slug = params.get('letter');
      if (!slug || slug === 'all') {
        this.activeLetter = 'அனைத்தும்';
        return;
      }
      const match = this.letterOptions.find((option) => option.slug === slug);
      this.activeLetter = match ? match.tamil : 'அனைத்தும்';
      this.updateMeta();
    });

    this.route.queryParamMap.subscribe((params) => {
      const query = params.get('q');
      if (query !== null) {
        this.searchValue = query;
      }
      const category = params.get('category');
      if (category === 'boy') {
        this.activeGender = 'boy';
      }
      if (category === 'girl' || category === 'modern' || category === 'traditional') {
        this.activeGender = 'girl';
      }
      this.updateMeta();
    });
  }

  private updateMeta(): void {
    const letterOption = this.letterOptions.find((option) => option.tamil === this.activeLetter);
    const letterName = this.activeLetter === 'அனைத்தும்' ? 'All Letters' : letterOption?.english || this.activeLetter;
    const genderLabel = this.activeGender === 'boy' ? 'Boy' : 'Girl';
    const letterPath = letterOption && letterOption.slug !== 'All' ? `/${letterOption.slug}` : '';
    const categoryQuery = this.activeGender === 'boy' ? '?category=boy' : '';
    const hasSearchQuery = this.searchValue.trim().length > 0;

    this.seo.update({
      title: `${genderLabel} Tamil Baby Names with Meaning${letterName === 'All Letters' ? '' : ` Starting with ${letterName}`}`,
      description: `Browse ${genderLabel.toLowerCase()} Tamil baby names with meaning${letterName === 'All Letters' ? '' : ` starting with ${letterName}`}. Search by Tamil or English spelling and explore culturally rooted names.`,
      path: `/names${letterPath}${categoryQuery}`,
      keywords: `${genderLabel.toLowerCase()} Tamil baby names, Tamil names ${letterName}, baby names with meaning, Tamil name list`,
      robots: hasSearchQuery ? 'noindex, follow' : 'index, follow, max-image-preview:large',
      structuredData: {
        '@type': 'CollectionPage',
        name: `${genderLabel} Tamil Baby Names${letterName === 'All Letters' ? '' : ` - ${letterName}`}`,
        description: `A browsable collection of ${genderLabel.toLowerCase()} Tamil baby names with English pronunciation.`,
        url: this.seo.absoluteUrl(`/names${letterPath}${categoryQuery}`)
      }
    });
  }

  get filteredNames(): NameItem[] {
    const search = this.searchValue?.trim().toLowerCase();
    const hasLatin = !!search && /[a-z]/i.test(search);
    const source = this.activeGender === 'boy' ? this.boyNames : this.allNames;
    return source
      .filter((item) => {
        const matchesLetter =
          this.activeLetter === 'அனைத்தும்' ||
          hasLatin ||
          item.tamil?.startsWith(this.activeLetter);
        const searchFields = [
          item.name,
          item.tamil,
          item.english,
          item.meaning,
          item.description,
          ...(item.category || []),
          ...(item.tags || []),
          item.slug
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        const matchesSearch = !search || searchFields.includes(search);
        return matchesLetter && matchesSearch;
      })
      .sort((a, b) => a.tamil.localeCompare(b.tamil, 'ta'));
  }

  get pagedNames(): NameItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredNames.slice(start, start + this.pageSize);
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.filteredNames.length / this.pageSize));
  }

  get pageStart(): number {
    return this.filteredNames.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get pageEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredNames.length);
  }

  get currentTotal(): number {
    return this.activeGender === 'boy' ? this.boyNames.length : this.allNames.length;
  }

  get activeLetterLabel(): string {
    const option = this.letterOptions.find((item) => item.tamil === this.activeLetter);
    if (!option) {
      return this.activeLetter;
    }
    return this.ui.language === 'ta' ? option.tamil : option.english;
  }

  getLetterLabel(option: LetterOption): string {
    return this.ui.language === 'ta' ? option.tamil : option.english;
  }

  onLetter(option: LetterOption): void {
    this.currentPage = 1;
    this.activeLetter = option.tamil;
    if (option.slug === 'all') {
      this.router.navigate(['/names']);
      return;
    }
    this.router.navigate(['/names', option.slug]);
  }

  async loadTamilNames(): Promise<void> {
    try {
      const rawNames = await this.http.get<any[]>('assets/names.json').toPromise();
      this.allNames = (rawNames || []).map((entry, index) =>
        typeof entry === 'string'
          ? this.normalizeNameItem({ tamil: entry }, index, 'girl')
          : this.normalizeNameItem(entry, index, 'girl')
      );
    } catch (err) {
      console.error('Failed to load names.json from assets:', err);
      this.allNames = [
        this.normalizeNameItem({ tamil: 'அகல்விழி' }, 0, 'girl'),
        this.normalizeNameItem({ tamil: 'அருள்மொழிதேவி' }, 1, 'girl'),
        this.normalizeNameItem({ tamil: 'ஆராதனா' }, 2, 'girl')
      ];
    }
  }

  async loadBoyNames(): Promise<void> {
    try {
      const rawNames = await this.http.get<any[]>('assets/boy-names.json').toPromise();
      this.boyNames = (rawNames || []).map((entry, index) =>
        typeof entry === 'string'
          ? this.normalizeNameItem({ tamil: entry }, index, 'boy')
          : this.normalizeNameItem(entry, index, 'boy')
      );
    } catch (err) {
      console.error('Failed to load boy-names.json from assets:', err);
      this.boyNames = [];
    }
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  setGender(gender: 'girl' | 'boy'): void {
    this.activeGender = gender;
    this.currentPage = 1;
  }

  private normalizeNameItem(entry: any, index: number, defaultGender: 'girl' | 'boy'): NameItem {
    const tamil = entry?.tamil || entry?.name || '';
    const english = entry?.english || this.transliterateTamil(tamil);
    const name = entry?.name || tamil;
    const slug = entry?.slug || this.createSlug(english || tamil);
    const startsWith = entry?.startsWith || tamil.charAt(0) || '';
    const length = entry?.length || this.getLengthCategory(english || tamil);

    return {
      id: entry?.id ?? index + 1,
      name,
      tamil,
      english,
      meaning: entry?.meaning || '',
      description: entry?.description || '',
      category: Array.isArray(entry?.category) ? entry.category : [],
      tags: Array.isArray(entry?.tags) ? entry.tags : [],
      language: entry?.language || 'tamil',
      religion: entry?.religion || 'hindu',
      gender: entry?.gender || defaultGender,
      isPureTamil: entry?.isPureTamil ?? false,
      length,
      startsWith,
      slug
    };
  }

  private createSlug(value: string): string {
    return value
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private getLengthCategory(value: string): string {
    const length = value.replace(/\s+/g, '').length;
    if (length <= 4) {
      return 'short';
    }
    if (length <= 8) {
      return 'medium';
    }
    return 'long';
  }

  transliterateTamil(name: string): string {
    const vowels: Record<string, string> = {
      'அ': 'a',
      'ஆ': 'aa',
      'இ': 'i',
      'ஈ': 'ii',
      'உ': 'u',
      'ஊ': 'uu',
      'எ': 'e',
      'ஏ': 'ee',
      'ஐ': 'ai',
      'ஒ': 'o',
      'ஓ': 'oo',
      'ஔ': 'au'
    };

    const consonants: Record<string, string> = {
      'க': 'k',
      'ங': 'ng',
      'ச': 'ch',
      'ஞ': 'ny',
      'ட': 't',
      'ண': 'n',
      'த': 'th',
      'ந': 'n',
      'ப': 'p',
      'ம': 'm',
      'ய': 'y',
      'ர': 'r',
      'ல': 'l',
      'வ': 'v',
      'ழ': 'zh',
      'ள': 'l',
      'ற': 'r',
      'ன': 'n',
      'ஶ': 'sh',
      'ஜ': 'j',
      'ஹ': 'h'
    };

    const vowelSigns: Record<string, string> = {
      'ா': 'aa',
      'ி': 'i',
      'ீ': 'ii',
      'ு': 'u',
      'ூ': 'uu',
      'ெ': 'e',
      'ே': 'ee',
      'ை': 'ai',
      'ொ': 'o',
      'ோ': 'oo',
      'ௌ': 'au'
    };

    const virama = '்';
    const aytham = 'ஃ';

    let result = '';
    const chars = Array.from(name);
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      if (char === aytham) {
        result += 'h';
        continue;
      }

      if (vowels[char]) {
        result += vowels[char];
        continue;
      }

      if (consonants[char]) {
        const base = consonants[char];
        const next = chars[i + 1];
        if (next === virama) {
          result += base;
          i += 1;
          continue;
        }
        if (next && vowelSigns[next]) {
          result += base + vowelSigns[next];
          i += 1;
          continue;
        }
        result += base + 'a';
        continue;
      }

      result += char;
    }

    return result.replace(/ +/g, ' ').trim();
  }
}
