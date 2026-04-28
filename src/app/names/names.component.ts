import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { UiService } from '../ui.service';

interface NameItem {
  tamil: string;
  english: string;
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
    private title: Title,
    private meta: Meta,
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
    const letter = this.activeLetter === 'அனைத்தும்' ? 'All letters' : this.activeLetter;
    this.title.setTitle(`Tamil Baby Names with Meaning | ${letter}`);
    this.meta.updateTag({
      name: 'description',
      content: `Browse Tamil baby names with meaning for ${letter}. Search, filter by letter, and find cultural insights.`
    });
  }

  get filteredNames(): NameItem[] {
    const search = this.searchValue?.trim().toLowerCase();
    const hasLatin = !!search && /[a-z]/i.test(search);
    const source = this.activeGender === 'boy' ? this.boyNames : this.allNames;
    return source
      .filter((item) => {
        const matchesLetter = this.activeLetter === 'அனைத்தும்' || hasLatin || item.tamil.startsWith(this.activeLetter);
        const matchesSearch =
          !search ||
          item.tamil.includes(search) ||
          item.english.toLowerCase().includes(search);
        return matchesLetter && matchesSearch;
      })
      .sort((a, b) => a.tamil.localeCompare(b.tamil, 'ta'));
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
    this.activeLetter = option.tamil;
    if (option.slug === 'all') {
      this.router.navigate(['/names']);
      return;
    }
    this.router.navigate(['/names', option.slug]);
  }

  async loadTamilNames(): Promise<void> {
    try {
      const rawNames = await this.http.get<string[]>('assets/names.json').toPromise();
      this.allNames = (rawNames || []).map((tamilName) => ({
        tamil: tamilName,
        english: this.transliterateTamil(tamilName)
      }));
    } catch (err) {
      console.error('Failed to load names.json from assets:', err);
      this.allNames = [
        { tamil: 'அகல்விழி', english: 'Akalvizhi' },
        { tamil: 'அருள்மொழிதேவி', english: 'Arulmothadevi' },
        { tamil: 'ஆராதனா', english: 'Aaradhana' }
      ];
    }
  }

  async loadBoyNames(): Promise<void> {
    try {
      const rawNames = await this.http.get<string[]>('assets/boy-names.json').toPromise();
      this.boyNames = (rawNames || []).map((tamilName) => ({
        tamil: tamilName,
        english: this.transliterateTamil(tamilName)
      }));
    } catch (err) {
      console.error('Failed to load boy-names.json from assets:', err);
      this.boyNames = [];
    }
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
