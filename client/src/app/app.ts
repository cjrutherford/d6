import { Component, computed, effect, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TitleBar } from './title-bar/title-bar';

export declare type ColorSwatch = {
  code: string;
  description: string;
}

export declare type ThemeType = {
  name: string,
  light: ColorSwatch[]
  dark: ColorSwatch[]
}

export declare type MessageType = {
  content: string;
  type: 'info' | 'error' | 'success';
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, TitleBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[style.--background]': 'background()',
    '[style.--primary]': 'primary()',
    '[style.--secondary]': 'secondary()',
    '[style.--accent]': 'accent()',
    '[style.--text]': 'text()',
    '[style.--highlight]': 'highlight()',
    '[style.--bg-gradient]': 'bgGradient()',
    '[style.--shadow-gradient]': 'shadowGradient()',
  },
})
export class App {
  showThemePicker = signal(false);
  messages = signal<MessageType[]>([
  ]);
  themes: ThemeType[] = [ {
      name: "Sunny Day",
      light: [
        { code: "#F8F8F8", description: "Off-White Background" },
        { code: "#DEE5A2", description: "Khaki" },
        { code: "#CCB87C", description: "Pale Orange" },
        { code: "#AD6E6B", description: "Apple Red" },
        { code: "#B38759", description: "High Orange" },
        { code: "#D3B89F", description: "Nude" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#DEE5A2", description: "Khaki" },
        { code: "#CCB87C", description: "Pale Orange" },
        { code: "#AD6E6B", description: "Apple Red" },
        { code: "#B38759", description: "High Orange" },
        { code: "#D3B89F", description: "Nude" }
      ]
    },
    {
      name: "Earthen Whisper",
      light: [
        { code: "#FAFAF7", description: "Creamy White Background" },
        { code: "#266771", description: "Regal Teal" },
        { code: "#66CCAE", description: "Soft Turquiose" },
        { code: "#897B40", description: "Soft Brown" },
        { code: "#419431", description: "Hunter Green" },
        { code: "#A1D6A4", description: "Off Sea Foam" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#266771", description: "Regal Teal" },
        { code: "#66CCAE", description: "Soft Turquiose" },
        { code: "#897B40", description: "Soft Brown" },
        { code: "#419431", description: "Hunter Green" },
        { code: "#A1D6A4", description: "Off Sea Foam" }
      ]
    },
    {
      name: "Misty Morning",
      light: [
        { code: "#F5F7F9", description: "Cool Off-White Background" },
        { code: "#DDE2E7", description: "Light Cool Gray" },
        { code: "#AAB2BD", description: "Slate Gray" },
        { code: "#7C8D9E", description: "Medium Blue-Gray" },
        { code: "#526B7E", description: "Deep Indigo-Gray" },
        { code: "#BACDCD", description: "Muted Cyan Accent" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#23272B", description: "Dark Cool Gray" },
        { code: "#344D60", description: "Slate Gray" },
        { code: "#5E6F80", description: "Medium Blue-Gray" },
        { code: "#7C8D9E", description: "Indigo-Gray" },
        { code: "#9EB1B1", description: "Cyan Accent" }
      ]
    },
    {
      name: "Desert Bloom",
      light: [
        { code: "#FFFDFB", description: "Warm White Background" },
        { code: "#F5F0EB", description: "Pale Peach" },
        { code: "#E7D8CD", description: "Rosy Beige" },
        { code: "#CBA495", description: "Terracotta" },
        { code: "#98756A", description: "Burnt Sienna" },
        { code: "#D8C28F", description: "Soft Gold Accent" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#2C2320", description: "Dark Peach" },
        { code: "#4B3A35", description: "Rosy Beige" },
        { code: "#7A574C", description: "Terracotta" },
        { code: "#AD8677", description: "Burnt Sienna" },
        { code: "#BAA471", description: "Gold Accent" }
      ]
    },
    {
      name: "Forest Path",
      light: [
        { code: "#F9FCF8", description: "Very Light Greenish-White Background" },
        { code: "#E3EAE0", description: "Pale Mint" },
        { code: "#C1D5BF", description: "Soft Green" },
        { code: "#89A98A", description: "Dusky Green" },
        { code: "#587C5E", description: "Deep Forest Green" },
        { code: "#EDE0C8", description: "Cream Accent" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#1A2B1A", description: "Dark Mint" },
        { code: "#3A5E40", description: "Soft Green" },
        { code: "#6B8B6C", description: "Dusky Green" },
        { code: "#89A98A", description: "Forest Green" },
        { code: "#CFB9AC", description: "Cream Accent" }
      ]
    },
    {
      name: "Coastal Breeze",
      light: [
        { code: "#F6FCFD", description: "Light Aqua-White Background" },
        { code: "#E5F2F5", description: "Very Light Blue" },
        { code: "#C9E4E9", description: "Powder Blue" },
        { code: "#9DCED9", description: "Soft Sky Blue" },
        { code: "#6FA8B4", description: "Deep Ocean Blue" },
        { code: "#F0D8B4", description: "Sandy Beige Accent" }
      ],
      dark: [
        { code: "#252323", description: "Black Background" },
        { code: "#1A2326", description: "Dark Aqua" },
        { code: "#22313A", description: "Powder Blue" },
        { code: "#518A96", description: "Sky Blue" },
        { code: "#7FACC1", description: "Ocean Blue" },
        { code: "#D2BA96", description: "Sandy Accent" }
      ]
    },
      {
    name: "Azure Horizon",
    light: [
      { code: "#FFFFFF", description: "Background White" }, 
      { code: "#3F51B5", description: "Primary Blue" }, 
      { code: "#C5CAE9", description: "Secondary Light Blue" },
      { code: "#00BCD4", description: "Accent Cyan" }, 
      { code: "#212121", description: "Dark Text" }, 
      { code: "#757575", description: "Highlight Medium Gray" }, 
    ],
    dark: [
      { code: "#121212", description: "Dark Gray Background" }, 
      { code: "#7986CB", description: "Primary Blue" }, 
      { code: "#303F9F", description: "Secondary Dark Blue" }, 
      { code: "#4DD0E1", description: "Accent Cyan" }, 
      { code: "#E0E0E0", description: "Light Text" }, 
      { code: "#B0B0B0", description: "Highlight Medium Light Gray" }, 
    ],
  },
  {
    name: "Emerald Grove",
    light: [
      { code: "#FFFFFF", description: "Background White" },
      { code: "#4CAF50", description: "Primary Green" },
      { code: "#C8E6C9", description: "Secondary Light Green" },
      { code: "#FF4081", description: "Accent Pink" },
      { code: "#212121", description: "Dark Text" },
      { code: "#616161", description: "Highlight Medium Gray" },
    ],
    dark: [
      { code: "#1C1C1C", description: "Near Black Background" },
      { code: "#81C784", description: "Primary Green" },
      { code: "#388E3C", description: "Secondary Dark Green" },
      { code: "#FF80AB", description: "Accent Pink" },
      { code: "#E0E0E0", description: "Light Text" },
      { code: "#A0A0A0", description: "Highlight Medium Light Gray" },
    ],
  },
  {
    name: "Crimson Sunset",
    light: [
      { code: "#FFFFFF", description: "Background White" },
      { code: "#E53935", description: "Primary Red" },
      { code: "#FFCDD2", description: "Secondary Light Red" },
      { code: "#FFB300", description: "Accent Amber" },
      { code: "#212121", description: "Dark Text" },
      { code: "#757575", description: "Highlight Medium Gray" },
    ],
    dark: [
      { code: "#1C1515", description: "Dark Red-Gray Background" },
      { code: "#EF5350", description: "Primary Red" },
      { code: "#C62828", description: "Secondary Dark Red" },
      { code: "#FFD54F", description: "Accent Amber" },
      { code: "#F5F5F5", description: "Light Text" },
      { code: "#C0C0C0", description: "Highlight Medium Light Gray" },
    ],
  },
  {
    name: "Golden Sands",
    light: [
      { code: "#FFFFFF", description: "Background White" },
      { code: "#FF9800", description: "Primary Orange" },
      { code: "#FFE0B2", description: "Secondary Light Orange" },
      { code: "#795548", description: "Accent Brown" },
      { code: "#212121", description: "Dark Text" },
      { code: "#6D6D6D", description: "Highlight Medium Gray" },
    ],
    dark: [
      { code: "#1F1F1F", description: "Dark Gray Background" },
      { code: "#FFB74D", description: "Primary Orange" },
      { code: "#E65100", description: "Secondary Dark Orange" },
      { code: "#A1887F", description: "Accent Brown" },
      { code: "#F0F0F0", description: "Light Text" },
      { code: "#BDBDBD", description: "Highlight Medium Light Gray" },
    ],
  },{
    name: "Royal Grape",
    light: [
      { code: "#FFFFFF", description: "Background White" },
      { code: "#673AB7", description: "Primary Deep Purple" },
      { code: "#D1C4E9", description: "Secondary Light Purple" },
      { code: "#FFD740", description: "Accent Gold" }, // A700 equivalent
      { code: "#212121", description: "Dark Text" },
      { code: "#757575", description: "Highlight Medium Gray" },
    ],
    dark: [
      { code: "#1A142A", description: "Dark Purple-Gray Background" },
      { code: "#9575CD", description: "Primary Deep Purple" },
      { code: "#5E35B1", description: "Secondary Dark Purple" },
      { code: "#FFEB3B", description: "Accent Gold" }, // A400 equivalent
      { code: "#F5F5F5", description: "Light Text" },
      { code: "#C0C0C0", description: "Highlight Medium Light Gray" },
    ],
  },
  {
    name: "Charcoal Slate",
    light: [
      { code: "#FFFFFF", description: "Background White" },
      { code: "#607D8B", description: "Primary Blue Grey" },
      { code: "#CFD8DC", description: "Secondary Light Blue Grey" },
      { code: "#FF5252", description: "Accent Red" }, // A200
      { code: "#212121", description: "Dark Text" },
      { code: "#757575", description: "Highlight Medium Gray" },
    ],
    dark: [
      { code: "#263238", description: "Dark Blue Grey Background" },
      { code: "#90A4AE", description: "Primary Blue Grey" },
      { code: "#455A64", description: "Secondary Dark Blue Grey" },
      { code: "#FF8A80", description: "Accent Red" }, // A100
      { code: "#E0E0E0", description: "Light Text" },
      { code: "#B0B0B0", description: "Highlight Medium Light Gray" },
    ],
  },
  {
    name: "Spring Bloom",
    light: [
      { code: "#FFFFFF", description: "Background White" },
      { code: "#8BC34A", description: "Primary Light Green" },
      { code: "#DCEDC8", description: "Secondary Pale Green" },
      { code: "#673AB7", description: "Accent Deep Purple" },
      { code: "#212121", description: "Dark Text" },
      { code: "#757575", description: "Highlight Medium Gray" },
    ],
    dark: [
      { code: "#1A1A1A", description: "Dark Gray Background" },
      { code: "#AED581", description: "Primary Light Green" },
      { code: "#558B2F", description: "Secondary Dark Green" },
      { code: "#9575CD", description: "Accent Deep Purple" },
      { code: "#F5F5F5", description: "Light Text" },
      { code: "#C0C0C0", description: "Highlight Medium Light Gray" },
    ],
  },
  {
    name: "Mystic Teal",
    light: [
      { code: "#FFFFFF", description: "Background White" },
      { code: "#009688", description: "Primary Teal" },
      { code: "#B2DFDB", description: "Secondary Light Teal" },
      { code: "#FFC107", description: "Accent Amber" },
      { code: "#212121", description: "Dark Text" },
      { code: "#757575", description: "Highlight Medium Gray" },
    ],
    dark: [
      { code: "#142424", description: "Dark Teal-Gray Background" },
      { code: "#4DB6AC", description: "Primary Teal" },
      { code: "#00695C", description: "Secondary Dark Teal" },
      { code: "#FFD54F", description: "Accent Amber" },
      { code: "#E0E0E0", description: "Light Text" },
      { code: "#B0B0B0", description: "Highlight Medium Light Gray" },
    ],
  },
  {
    name: "Urban Cool",
    light: [
      { code: "#FFFFFF", description: "Background White" },
      { code: "#424242", description: "Primary Grey" },
      { code: "#EEEEEE", description: "Secondary Light Grey" },
      { code: "#2196F3", description: "Accent Blue" },
      { code: "#212121", description: "Dark Text" },
      { code: "#9E9E9E", description: "Highlight Medium Gray" },
    ],
    dark: [
      { code: "#1C1C1C", description: "Dark Grey Background" },
      { code: "#BDBDBD", description: "Primary Grey" },
      { code: "#616161", description: "Secondary Dark Grey" },
      { code: "#64B5F6", description: "Accent Blue" },
      { code: "#F5F5F5", description: "Light Text" },
      { code: "#C0C0C0", description: "Highlight Medium Light Gray" },
    ],
  },
  {
    name: "Vibrant Retro",
    light: [
      { code: "#FFFFFF", description: "Background White" },
      { code: "#FFEB3B", description: "Primary Yellow" },
      { code: "#FFF9C4", description: "Secondary Pale Yellow" },
      { code: "#E91E63", description: "Accent Pink" },
      { code: "#212121", description: "Dark Text" },
      { code: "#757575", description: "Highlight Medium Gray" },
    ],
    dark: [
      { code: "#1A1A1A", description: "Dark Gray Background" },
      { code: "#FFEA00", description: "Primary Yellow" },
      { code: "#FBC02D", description: "Secondary Dark Yellow" },
      { code: "#FF80AB", description: "Accent Pink" },
      { code: "#E0E0E0", description: "Light Text" },
      { code: "#A0A0A0", description: "Highlight Medium Light Gray" },
    ],
  },
  ];

  // Signals for theme state
  selectedTheme = signal<ThemeType>(this.themes[0]);
  themeMode = signal<'light' | 'dark'>('light');

  // Computed signal for current palette
  currentPalette = computed(() => this.selectedTheme()[this.themeMode()]);

  // Signals for color variables
  background = signal('');
  primary = signal('');
  secondary = signal('');
  accent = signal('');
  text = signal('');
  highlight = signal('');
  bgGradient = signal('');
  shadowGradient = signal('');

  toggleThemePicker() {
    this.showThemePicker.set(!this.showThemePicker());
  }

  removeMessage(index: number) {
    console.log("Removing message at index:", index);
  }
  
  constructor() {
    this.loadThemeSettings();
    // Effect to apply theme whenever selectedTheme or themeMode changes
    effect(() => {
      this.applyTheme();
    });
  }

  setTheme($event: ThemeType) {
    this.selectedTheme.set($event);
    this.saveThemeSettings();
  }

  toggleThemeMode() {
    this.themeMode.set(this.themeMode() === 'light' ? 'dark' : 'light');
    document.getElementsByTagName('body')[0].setAttribute('style', 'background:' + this.background() + ';');
    this.saveThemeSettings();
  }

  applyTheme() {
    const palette = this.currentPalette();
    const [background, primary, secondary, accent, text, highlight] = palette.map(swatch => swatch.code);
    this.background.set(background);
    this.primary.set(primary);
    this.secondary.set(secondary);
    this.accent.set(accent);
    this.text.set(text);
    this.highlight.set(highlight);
    this.bgGradient.set(`linear-gradient(135deg, ${primary} 0%, ${accent} 20%, ${secondary} 40%, ${highlight} 60%, ${background} 80%, ${background} 100%)`);
    this.shadowGradient.set(`linear-gradient(95deg, ${primary} 0%, ${accent} 20%, ${secondary} 40%, ${highlight} 60%, ${background} 80%, ${background} 100%)`);
    document.getElementsByTagName('body')[0].setAttribute('style', 'background:' + this.background() + ';');
  }

  saveThemeSettings() {
    localStorage.setItem('themeMode', this.themeMode());
    localStorage.setItem('themeName', this.selectedTheme().name);
  }

  loadThemeSettings() {
    const storedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    const storedName = localStorage.getItem('themeName');
    if (storedMode && (storedMode === 'light' || storedMode === 'dark')) {
      this.themeMode.set(storedMode);
    }
    if (storedName) {
      const found = this.themes.find(t => t.name === storedName);
      if (found) {
        this.selectedTheme.set(found);
      }
    }
  }

}
