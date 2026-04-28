import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Language = 'en' | 'ta';
type ThemeMode = 'light' | 'pink' | 'blue' | 'yellow' | 'midnight';

interface UiState {
  language: Language;
  theme: ThemeMode;
}

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private readonly storageKey = 'baby-names-ui';
  private state: UiState = {
    language: 'en',
    theme: 'light'
  };

  private stateSubject = new BehaviorSubject<UiState>(this.state);
  state$ = this.stateSubject.asObservable();

  constructor() {
    this.load();
    this.applyTheme();
  }

  get language(): Language {
    return this.state.language;
  }

  get theme(): ThemeMode {
    return this.state.theme;
  }

  toggleLanguage(): void {
    this.setLanguage(this.state.language === 'ta' ? 'en' : 'ta');
  }

  setLanguage(language: Language): void {
    this.state = {
      ...this.state,
      language
    };
    this.persist();
  }

  toggleTheme(): void {
    const themes: ThemeMode[] = ['light', 'pink', 'blue', 'yellow', 'midnight'];
    const currentIndex = themes.indexOf(this.state.theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    this.setTheme(nextTheme);
  }

  setTheme(theme: ThemeMode): void {
    this.state = {
      ...this.state,
      theme
    };
    this.persist();
    this.applyTheme();
  }

  private persist(): void {
    this.stateSubject.next(this.state);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch {
      // Ignore storage errors.
    }
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as Partial<UiState>;
      const storedTheme = parsed.theme as ThemeMode | 'dark' | undefined;
      this.state = {
        language: parsed.language === 'ta' ? 'ta' : 'en',
        theme:
          storedTheme === 'pink' ||
          storedTheme === 'blue' ||
          storedTheme === 'yellow' ||
          storedTheme === 'midnight' ||
          storedTheme === 'dark'
            ? storedTheme === 'dark'
              ? 'midnight'
              : storedTheme
            : 'light'
      };
      this.stateSubject.next(this.state);
    } catch {
      // Ignore parse errors.
    }
  }

  private applyTheme(): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.body.setAttribute('data-theme', this.state.theme);
  }
}
