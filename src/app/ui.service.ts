import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Language = 'en' | 'ta';
type ThemeMode = 'light' | 'dark';

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
    language: 'ta',
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
    this.state = {
      ...this.state,
      theme: this.state.theme === 'light' ? 'dark' : 'light'
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
      this.state = {
        language: parsed.language === 'en' ? 'en' : 'ta',
        theme: parsed.theme === 'dark' ? 'dark' : 'light'
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
