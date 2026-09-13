# Design Styles & Color Palettes (`design-styles-palettes.md`)

This guide defines the aesthetic design tokens, color systems, typography pairings, glassmorphism card parameters, and decorative styling for high-end web wedding invitations.

---

## 1. Aesthetic Themes & Color Tokens

### Theme 1: Carmesí & Imperial Gold (Bordó / Borgoña Lujo)
Inspired by classic high-luxury invitations with deep wine tones, gold leaf trims, and creamy cotton paper backgrounds.
Category: Clásico / Dark Luxury

```css
:root {
  /* Primary Tones */
  --color-primary: #6B1D2F;          /* Deep Crimson / Carmesí */
  --color-primary-dark: #4A0E17;     /* Dark Wine */
  --color-primary-light: #8E2B40;    /* Muted Rosewine */
  
  /* Accent & Metallic */
  --color-accent: #D4AF37;      /* Metallic Gold */
  --color-accent-gold-light: #F3E5AB;/* Soft Champagne Gold */
  --accent-gradient: linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%);
  
  /* Backgrounds & Textures */
  --color-bg-base: #FDFBF7;         /* Warm Cotton Cream Paper */
  --color-bg-card: #FFFFFF;         /* Pure Card White */
  --color-bg-translucent: rgba(253, 251, 247, 0.85);
  
  /* Text & Borders */
  --color-text-headline: #2B181C;   /* Deep Dark Wine Gray */
  --color-text-body: #554347;       /* Muted Warm Dark Gray */
  --color-border-accent: rgba(212, 175, 55, 0.4);
  --color-shadow: rgba(74, 14, 23, 0.08);
}
```

---

### Theme 2: Botanical Emerald & Olive (Verde Oliva & Eucalipto)
Inspired by Tuscan vineyard weddings, organic eucalyptus foliage, and natural sage green hues.
Category: Rústico / Clásico

```css
:root {
  /* Primary Tones */
  --color-primary: #3B4E38;          /* Deep Forest Olive */
  --color-primary-dark: #263424;     /* Dark Moss */
  --color-primary-light: #5A7356;    /* Muted Eucalyptus */
  
  /* Accent Tones */
  --color-accent: #C5A059;      /* Vintage Antique Gold */
  --accent-gradient: linear-gradient(135deg, #C5A059 0%, #F3E5AB 50%, #9E7D3B 100%);
  
  /* Backgrounds */
  --color-bg-base: #F4F1EA;         /* Natural Cream Linen */
  --color-bg-card: rgba(255, 255, 255, 0.9);
  --color-bg-translucent: rgba(244, 241, 234, 0.88);
  
  /* Text & Borders */
  --color-text-headline: #1C261B;   /* Deep Moss Black */
  --color-text-body: #485446;       /* Soft Olive Charcoal */
  --color-border-accent: rgba(197, 160, 89, 0.35);
  --color-shadow: rgba(38, 52, 36, 0.08);
}
```

---

### Theme 3: Luxury Dark Marble & Kintsugi (Negro Noche & Mármol Dorado)
Inspired by modern nocturnal luxury galas, black marble textures, and gold vein accents.
Category: Dark Luxury / Moderno

```css
:root {
  /* Primary Tones */
  --color-primary: #E5C158;          /* Vibrant Gold Leaf */
  --color-primary-dark: #B89332;     /* Antique Gold */
  --color-primary-light: #FAF0CA;    /* Soft Gold Glow */
  
  /* Accent Tones */
  --color-accent: #E5C158;
  --color-bg-base: #121212;         /* Obsidian Black */
  --color-bg-card: rgba(26, 26, 26, 0.75); /* Dark Glassmorphism */
  --color-bg-translucent: rgba(18, 18, 18, 0.9);
  --accent-gradient: linear-gradient(135deg, #E5C158 0%, #FFF2B2 30%, #C79C2E 70%, #8A6818 100%);
  
  /* Text & Borders */
  --color-text-headline: #FFFFFF;   /* Crisp White */
  --color-text-body: #D1D1D1;       /* Light Warm Gray */
  --color-border-accent: rgba(229, 193, 88, 0.4);
  --color-shadow: rgba(0, 0, 0, 0.6);
}
```

---

### Theme 4: Pastel Watercolor Lavender & Peony (Acuarela Romántica)
Inspired by soft floral watercolours, lilacs, powder blue, and delicate pink blossoms.
Category: Romántico / Fairy Tale

```css
:root {
  /* Primary Tones */
  --color-primary: #7B68EE;          /* Medium Slate Blue / Violet */
  --color-primary-dark: #4B0082;     /* Indigo Violet */
  --color-primary-light: #C5B4E3;    /* Powder Lavender */
  
  /* Accent Tones */
  --color-accent: #D4AF37;      /* Warm Gold Foil Accent */
  --accent-gradient: linear-gradient(135deg, #D4AF37 0%, #F9E79F 100%);
  
  /* Backgrounds */
  --color-bg-base: #FCFAF9;         /* Snow White Watercolor */
  --color-bg-card: rgba(255, 255, 255, 0.75); /* Frosted Glass */
  --color-bg-translucent: rgba(252, 250, 249, 0.85);
  
  /* Text & Borders */
  --color-text-headline: #362943;   /* Deep Eggplant Purple */
  --color-text-body: #615370;       /* Muted Violet Gray */
  --color-border-accent: rgba(197, 180, 227, 0.5);
  --color-shadow: rgba(123, 104, 238, 0.1);
}
```

---

### Theme 5: Guindo Floreciente
Romantic warm, like blooming quinces. Recommend for spring or autumn romantic celebrations.
Category: Romántico

```css
:root {
  --color-primary: #6c201f;
  --color-primary-dark: #4a1515;
  --color-primary-light: #ad4658;
  
  --color-accent: #D4AF37;
  --accent-gradient: linear-gradient(135deg, #D4AF37 0%, #F9E79F 50%, #B38728 100%);
  
  --color-bg-base: #d2b6b4;
  --color-bg-card: rgba(200, 133, 142, 0.2);
  --color-bg-translucent: rgba(210, 182, 180, 0.85);
  
  --color-text-headline: #6c201f;
  --color-text-body: #4a1515;
  --color-border-accent: rgba(226, 177, 104, 0.6);
  --color-shadow: rgba(108, 32, 31, 0.1);
}
```

---

### Theme 6: Malva Grisáceo Clásico
Classic wedding, sophisticated and romantic. Perfect for traditional, refined events.
Category: Clásico

```css
:root {
  --color-primary: #928387;
  --color-primary-dark: #63585b;
  --color-primary-light: #bfb2c3;
  
  --color-accent: #B76E79; /* Rose Gold */
  --accent-gradient: linear-gradient(135deg, #B76E79 0%, #E0BFB8 50%, #C07C88 100%);
  
  --color-bg-base: #faf9fe;
  --color-bg-card: #ded9df;
  --color-bg-translucent: rgba(250, 249, 254, 0.85);
  
  --color-text-headline: #63585b;
  --color-text-body: #928387;
  --color-border-accent: rgba(183, 110, 121, 0.4);
  --color-shadow: rgba(146, 131, 135, 0.1);
}
```

---

### Theme 7: Lila Misterioso
French chic, mysterious and attractive. Recommend for evening weddings or elegant boutique venues.
Category: Romántico / Moderno

```css
:root {
  --color-primary: #844b7a;
  --color-primary-dark: #583251;
  --color-primary-light: #b08aae;
  
  --color-accent: #C0C0C0; /* Silver */
  --accent-gradient: linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #A9A9A9 100%);
  
  --color-bg-base: #d2d2da;
  --color-bg-card: #c4b2ab;
  --color-bg-translucent: rgba(210, 210, 218, 0.85);
  
  --color-text-headline: #583251;
  --color-text-body: #844b7a;
  --color-border-accent: rgba(192, 192, 192, 0.4);
  --color-shadow: rgba(132, 75, 122, 0.1);
}
```

---

### Theme 8: Tropical Vibrante
Summer tropical but still premium. Ideal for destination or beach weddings.
Category: Tropical

```css
:root {
  --color-primary: #76e1f8;
  --color-primary-dark: #3fbcd5;
  --color-primary-light: #95d86a;
  
  --color-accent: #fe4e8d;
  --accent-gradient: linear-gradient(135deg, #fe4e8d 0%, #ff8fb7 50%, #e02468 100%);
  
  --color-bg-base: #fee7a3;
  --color-bg-card: #f2e8e7;
  --color-bg-translucent: rgba(254, 231, 163, 0.85);
  
  --color-text-headline: #2c7a8b;
  --color-text-body: #505050;
  --color-border-accent: rgba(254, 78, 141, 0.4);
  --color-shadow: rgba(118, 225, 248, 0.2);
}
```

---

### Theme 9: Violeta Cuento de Hadas
Fairy tale pastel, icy romantic. Best for winter weddings or ethereal themes.
Category: Fairy Tale

```css
:root {
  --color-primary: #9f858e;
  --color-primary-dark: #675b6e;
  --color-primary-light: #f3c5d2;
  
  --color-accent: #C0C0C0;
  --accent-gradient: linear-gradient(135deg, #E6E6FA 0%, #C0C0C0 50%, #9EA7B5 100%);
  
  --color-bg-base: #f6f7f9;
  --color-bg-card: #e5dbcd;
  --color-bg-translucent: rgba(246, 247, 249, 0.85);
  
  --color-text-headline: #675b6e;
  --color-text-body: #9f858e;
  --color-border-accent: rgba(192, 192, 192, 0.4);
  --color-shadow: rgba(103, 91, 110, 0.1);
}
```

---

### Theme 10: Chocolate Acogedor
Warm rustic, cozy hygge atmosphere. Recommend for barn, fall, or woodland weddings.
Category: Rústico

```css
:root {
  --color-primary: #794228;
  --color-primary-dark: #372214;
  --color-primary-light: #b8733a;
  
  --color-accent: #D4AF37;
  --accent-gradient: linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #9E7D3B 100%);
  
  --color-bg-base: #bec2cb;
  --color-bg-card: #34302c;
  --color-bg-translucent: rgba(190, 194, 203, 0.85);
  
  --color-text-headline: #372214;
  --color-text-body: #794228;
  --color-border-accent: rgba(212, 175, 55, 0.4);
  --color-shadow: rgba(55, 34, 20, 0.2);
}
```

---

### Theme 11: Vintage Brisa Marina
Coastal vintage, sea breeze calm. Suitable for seaside or vintage ocean themes.
Category: Clásico / Tropical

```css
:root {
  --color-primary: #518a8d;
  --color-primary-dark: #345c5e;
  --color-primary-light: #b9d3ce;
  
  --color-accent: #B76E79;
  --accent-gradient: linear-gradient(135deg, #B76E79 0%, #E0BFB8 50%, #84525e 100%);
  
  --color-bg-base: #8c8a8c;
  --color-bg-card: #edc3d1;
  --color-bg-translucent: rgba(140, 138, 140, 0.85);
  
  --color-text-headline: #345c5e;
  --color-text-body: #518a8d;
  --color-border-accent: rgba(183, 110, 121, 0.4);
  --color-shadow: rgba(81, 138, 141, 0.1);
}
```

---

### Theme 12: Bosque Nocturno
Dark forest, mysterious natural elegance. Best for evening nature retreats.
Category: Dark Luxury / Rústico

```css
:root {
  --color-primary: #2d424a;
  --color-primary-dark: #131917;
  --color-primary-light: #5f6468;
  
  --color-accent: #B87333; /* Copper */
  --accent-gradient: linear-gradient(135deg, #B87333 0%, #E29B65 50%, #8A5222 100%);
  
  --color-bg-base: #131917;
  --color-bg-card: rgba(45, 66, 74, 0.4);
  --color-bg-translucent: rgba(19, 25, 23, 0.85);
  
  --color-text-headline: #b4786b;
  --color-text-body: #5f6468;
  --color-border-accent: rgba(184, 115, 51, 0.4);
  --color-shadow: rgba(0, 0, 0, 0.5);
}
```

---

### Theme 13: Melocotón & Grafito
Modern soft contrast. Clean, contemporary weddings.
Category: Moderno

```css
:root {
  --color-primary: #798486;
  --color-primary-dark: #2c3837;
  --color-primary-light: #deafa7;
  
  --color-accent: #F2D2BD; /* Champagne */
  --accent-gradient: linear-gradient(135deg, #F2D2BD 0%, #FFF5EE 50%, #D2B48C 100%);
  
  --color-bg-base: #e9e9e9;
  --color-bg-card: #e4dedf;
  --color-bg-translucent: rgba(233, 233, 233, 0.85);
  
  --color-text-headline: #2c3837;
  --color-text-body: #798486;
  --color-border-accent: rgba(242, 210, 189, 0.6);
  --color-shadow: rgba(44, 56, 55, 0.1);
}
```

---

### Theme 14: Rosado Grisáceo Nata
Neutral elegant, creamy tender. Ultra-clean minimal romance.
Category: Romántico / Moderno

```css
:root {
  --color-primary: #878181;
  --color-primary-dark: #757c84;
  --color-primary-light: #baada5;
  
  --color-accent: #C3B091; /* Khaki Gold/Champagne */
  --accent-gradient: linear-gradient(135deg, #C3B091 0%, #E3CAAC 50%, #A39071 100%);
  
  --color-bg-base: #ded2c4;
  --color-bg-card: rgba(255, 255, 255, 0.6);
  --color-bg-translucent: rgba(222, 210, 196, 0.85);
  
  --color-text-headline: #505050;
  --color-text-body: #757c84;
  --color-border-accent: rgba(195, 176, 145, 0.4);
  --color-shadow: rgba(117, 124, 132, 0.1);
}
```

---

### Theme 15: Hygge Confort
Warm candle-lit comfort. Excellent for intimate winter gatherings.
Category: Rústico

```css
:root {
  --color-primary: #673929;
  --color-primary-dark: #332119;
  --color-primary-light: #A97164;
  
  --color-accent: #D4AF37;
  --accent-gradient: linear-gradient(135deg, #D4AF37 0%, #F5D38A 50%, #9E7D3B 100%);
  
  --color-bg-base: #D4D1C8;
  --color-bg-card: #D0B292;
  --color-bg-translucent: rgba(212, 209, 200, 0.85);
  
  --color-text-headline: #332119;
  --color-text-body: #673929;
  --color-border-accent: rgba(212, 175, 55, 0.4);
  --color-shadow: rgba(51, 33, 25, 0.15);
}
```

---

### Theme 16: Crema Romántico Vintage
Light vintage romantic elegance. Gentle, old-world charm.
Category: Clásico / Romántico

```css
:root {
  --color-primary: #ca6d7e;
  --color-primary-dark: #a85463;
  --color-primary-light: #d2aa9e;
  
  --color-accent: #D4AF37;
  --accent-gradient: linear-gradient(135deg, #D4AF37 0%, #F9F7F1 50%, #C5A059 100%);
  
  --color-bg-base: #f9f7f1;
  --color-bg-card: #fffbe0;
  --color-bg-translucent: rgba(249, 247, 241, 0.85);
  
  --color-text-headline: #a85463;
  --color-text-body: #ca6d7e;
  --color-border-accent: rgba(212, 175, 55, 0.3);
  --color-shadow: rgba(202, 109, 126, 0.1);
}
```

---

### Theme 17: Rosado & Verde Hierba
Garden party fresh. Perfect for daytime outdoor celebrations.
Category: Rústico / Tropical

```css
:root {
  --color-primary: #96132f;
  --color-primary-dark: #6e0e22;
  --color-primary-light: #d1939c;
  
  --color-accent: #82944d;
  --accent-gradient: linear-gradient(135deg, #82944d 0%, #a4b66f 50%, #5d6d35 100%);
  
  --color-bg-base: #e3dcd4;
  --color-bg-card: #a49182;
  --color-bg-translucent: rgba(227, 220, 212, 0.85);
  
  --color-text-headline: #6e0e22;
  --color-text-body: #96132f;
  --color-border-accent: rgba(130, 148, 77, 0.4);
  --color-shadow: rgba(150, 19, 47, 0.1);
}
```

---

### Theme 18: Boudoir Café & Rosado
Boudoir soft feminine. Sultry but delicate.
Category: Romántico

```css
:root {
  --color-primary: #89564a;
  --color-primary-dark: #633c33;
  --color-primary-light: #bea1a1;
  
  --color-accent: #B76E79;
  --accent-gradient: linear-gradient(135deg, #B76E79 0%, #E0BFB8 50%, #905f68 100%);
  
  --color-bg-base: #e9deca;
  --color-bg-card: #bca895;
  --color-bg-translucent: rgba(233, 222, 202, 0.85);
  
  --color-text-headline: #633c33;
  --color-text-body: #89564a;
  --color-border-accent: rgba(183, 110, 121, 0.4);
  --color-shadow: rgba(137, 86, 74, 0.1);
}
```

---

### Theme 19: Marrón Monocromático
Timeless sepia classic. Enduring photographic style.
Category: Clásico / Moderno

```css
:root {
  --color-primary: #624a2d;
  --color-primary-dark: #3c240d;
  --color-primary-light: #8d7053;
  
  --color-accent: #B87333; /* Copper */
  --accent-gradient: linear-gradient(135deg, #B87333 0%, #E29B65 50%, #8A5222 100%);
  
  --color-bg-base: #e4dacf;
  --color-bg-card: #c8bcb1;
  --color-bg-translucent: rgba(228, 218, 207, 0.85);
  
  --color-text-headline: #3c240d;
  --color-text-body: #624a2d;
  --color-border-accent: rgba(184, 115, 51, 0.4);
  --color-shadow: rgba(60, 36, 13, 0.1);
}
```

---

### Theme 20: Frambuesa & Nata
Sweet festive celebration. Cheerful and bright.
Category: Romántico / Moderno

```css
:root {
  --color-primary: #d93162;
  --color-primary-dark: #a82048;
  --color-primary-light: #faa7b8;
  
  --color-accent: #FFD700;
  --accent-gradient: linear-gradient(135deg, #FFD700 0%, #FFF080 50%, #CCA800 100%);
  
  --color-bg-base: #eef1ed;
  --color-bg-card: #efe9d7;
  --color-bg-translucent: rgba(238, 241, 237, 0.85);
  
  --color-text-headline: #a82048;
  --color-text-body: #d93162;
  --color-border-accent: rgba(255, 215, 0, 0.5);
  --color-shadow: rgba(217, 49, 98, 0.1);
}
```

---

### Theme 21: Burdeos Noble
Noble sophisticated deep. Majestic and luxurious.
Category: Dark Luxury / Clásico

```css
:root {
  --color-primary: #53060c;
  --color-primary-dark: #350306;
  --color-primary-light: #be5c6b;
  
  --color-accent: #D4AF37;
  --accent-gradient: linear-gradient(135deg, #D4AF37 0%, #F9E79F 50%, #9E7D3B 100%);
  
  --color-bg-base: #ccbeaa;
  --color-bg-card: #efd8d8;
  --color-bg-translucent: rgba(204, 190, 170, 0.85);
  
  --color-text-headline: #350306;
  --color-text-body: #53060c;
  --color-border-accent: rgba(212, 175, 55, 0.4);
  --color-shadow: rgba(83, 6, 12, 0.15);
}
```

---

### Theme 22: Sepia Emotivo
Nostalgic emotional warmth. Cinematic elegance.
Category: Romántico / Clásico

```css
:root {
  --color-primary: #524636;
  --color-primary-dark: #363634;
  --color-primary-light: #b19a78;
  
  --color-accent: #ac7330;
  --accent-gradient: linear-gradient(135deg, #ac7330 0%, #d49c5e 50%, #7d501b 100%);
  
  --color-bg-base: #d1c5ab;
  --color-bg-card: rgba(255, 255, 255, 0.6);
  --color-bg-translucent: rgba(209, 197, 171, 0.85);
  
  --color-text-headline: #363634;
  --color-text-body: #524636;
  --color-border-accent: rgba(172, 115, 48, 0.4);
  --color-shadow: rgba(54, 54, 52, 0.1);
}
```

---

### Theme 23: Édition Vogue & Haute Couture (Revista Editorial & Pasarela)
High-fashion editorial magazine aesthetic inspired by Paris, Lake Como, and Vogue Weddings. Clean newsprint contrast with liquid champagne gold and Parisian espresso noir.
Category: Editorial / High-Fashion / Haute Couture

```css
:root {
  /* Primary Tones */
  --color-primary: #1A1817;          /* Parisian Espresso Noir */
  --color-primary-dark: #121110;     /* Deep Ink Obsidian */
  --color-primary-light: #2D2926;    /* Soft Charcoal */
  
  /* Accent & Metallics */
  --color-accent: #C59B51;          /* Champagne Satin Gold */
  --color-accent-gold-light: #DFBA73;/* Specular Liquid Gold */
  --accent-gradient: linear-gradient(135deg, #9A7B4F 0%, #DFBA73 35%, #C59B51 70%, #8F6B38 100%);
  
  /* Runway Color Accents */
  --color-sage: #7A8B7B;            /* Sage Cashmere */
  --color-terracotta: #B87352;      /* Terracotta Silk */
  
  /* Backgrounds & Paper */
  --color-bg-base: #FBF8F3;         /* Warm French Linen Paper */
  --color-bg-card: #FFFFFF;         /* Editorial White Card */
  --color-bg-translucent: rgba(251, 248, 243, 0.92);
  
  /* Text & Borders */
  --color-text-headline: #1A1817;   /* Ink Black */
  --color-text-body: #2D2926;       /* High-contrast Subtitles & Body */
  --color-text-muted: #7E766D;      /* Secondary Captions & Dates */
  --color-border-accent: rgba(197, 155, 81, 0.4);
  --color-shadow: rgba(26, 24, 23, 0.08);
}
```

---

### Theme 24: Aurore Céleste & Or Rose (Alta Relojería en Oro Rosa & Nácar)
Feminine high-horology celestial aesthetic inspired by sunset nebulae, pink quartz, mother-of-pearl, and Swiss rose gold grand complications.
Category: Romántico / Alta Relojería / Femenino Prémium

```css
:root {
  /* Primary Tones */
  --color-primary: #200A11;          /* Deep Rosewood Noir */
  --color-primary-dark: #14060A;     /* Obsidian Wine Void */
  --color-primary-light: #32101B;    /* Rich Mauve Velvet */
  
  /* Accent & Rose Metallics */
  --color-accent: #E7A18C;          /* Liquid Rose Gold */
  --color-accent-gold-light: #F8D5CB;/* Specular Rose Quartz */
  --accent-gradient: linear-gradient(135deg, #B86855 0%, #F8D5CB 35%, #E7A18C 70%, #964736 100%);
  
  /* Celestial Accents */
  --color-blush: #F8E7E7;           /* Soft Peony Blush */
  --color-nacre: #FAF5F2;           /* Mother of Pearl / Nácar */
  --color-quartz: #F2D5D5;          /* Rose Quartz */
  
  /* Backgrounds & Card */
  --color-bg-base: #14060A;         /* Deep Sunset Void */
  --color-bg-card: rgba(32, 10, 17, 0.85); /* Rosewood Glass */
  --color-bg-translucent: rgba(20, 6, 10, 0.92);
  
  /* Text & Borders */
  --color-text-headline: #FAF5F2;   /* Pure Nacre Ivory */
  --color-text-body: #F2D5D5;       /* Warm Rose Quartz */
  --color-text-muted: #C498A3;      /* Muted Mauve Coordinates */
  --color-border-accent: rgba(231, 161, 140, 0.4);
  --color-shadow: rgba(20, 6, 10, 0.7);
}
```

---

## 2. Typography Stack (Google Fonts Integration)

Add this script load inside the HTML `<head>` for instant Google Fonts support. This includes all 20+ fonts needed for the recommended pairings.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Aleo:wght@300;400;700&family=Anonymous+Pro:wght@400;700&family=Arimo:wght@400;700&family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Forum&family=Great+Vibes&family=Hammersmith+One&family=Josefin+Sans:wght@300;400;600&family=Josefin+Slab:wght@300;400;600&family=League+Gothic&family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Mr+Dafoe&family=Open+Sans:wght@300;400;600&family=Pacifico&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Roboto:wght@300;400;500;700&family=Roboto+Condensed:wght@300;400;700&family=Vast+Shadow&family=Vidaloka&display=swap" rel="stylesheet">
```

*(Note: "Norwester" and "Kollektif" are often self-hosted but can be substituted with closest Google Fonts or loaded via custom fonts if required, shown here as conceptually part of the design system)*

### Recommended Pairings Table

| Pairing Name | Script/Display | Body | Best For |
|---|---|---|---|
| Classic Elegance | Great Vibes | Montserrat | Universal, safe choice |
| Editorial Luxe | Playfair Display | Montserrat Light | High-end formal |
| Vintage Charm | Pinyon Script | Forum | Rustic, vintage themes |
| Modern Romance | Bodoni Moda | Josefin Sans | Contemporary minimalist |
| Fairy Tale | Vidaloka | Lato | Whimsical, soft themes |
| Garden Party | Pacifico | Open Sans | Casual, outdoor |
| Dark Gala | Vast Shadow | Roboto Condensed | Dark/dramatic themes |
| Artisan Script | Mr. Dafoe | Anonymous Pro | Artistic, edgy |
| Bold Statement | League Gothic | Roboto | Modern bold |
| Retro Type | Norwester | Roboto | Clean retro |
| Refined Classic | Cormorant Garamond | Josefin Sans | Sophisticated serif |
| Minimalist | Montserrat | Montserrat | Ultra-clean modern |
| Slab Warmth | Josefin Sans | Josefin Slab | Warm, matched family |
| Cinematic | Cinzel Decorative | Montserrat | Grand, cinematic |
| Light & Airy | Aleo | Lato | Gentle, airy themes |


### Font Pairing Classes

```css
/* Script/Calligraphy Fonts (for couple names, monograms) */
.font-script-1 { font-family: 'Great Vibes', cursive; }
.font-script-2 { font-family: 'Alex Brush', cursive; }
.font-script-3 { font-family: 'Pinyon Script', cursive; }
.font-script-4 { font-family: 'Mr Dafoe', cursive; }
.font-script-5 { font-family: 'Pacifico', cursive; }

/* Serif Display Fonts (for section titles, dates) */
.font-serif-header { font-family: 'Playfair Display', serif; }
.font-serif-classic { font-family: 'Cormorant Garamond', serif; }
.font-cinzel { font-family: 'Cinzel Decorative', serif; }
.font-bodoni { font-family: 'Bodoni Moda', serif; }
.font-vidaloka { font-family: 'Vidaloka', serif; }
.font-aleo { font-family: 'Aleo', serif; }
.font-vast { font-family: 'Vast Shadow', cursive; }

/* Sans-Serif Body Fonts (for body text, labels, buttons) */
.font-sans-body { font-family: 'Montserrat', sans-serif; }
.font-sans-josefin { font-family: 'Josefin Sans', sans-serif; }
.font-sans-open { font-family: 'Open Sans', sans-serif; }
.font-sans-lato { font-family: 'Lato', sans-serif; }
.font-sans-roboto { font-family: 'Roboto', sans-serif; }
.font-sans-roboto-condensed { font-family: 'Roboto Condensed', sans-serif; }
.font-sans-arimo { font-family: 'Arimo', sans-serif; }
.font-sans-forum { font-family: 'Forum', cursive; }
.font-sans-anonymous { font-family: 'Anonymous Pro', monospace; }

/* Sans-Serif Display (for modern/bold headers) */
.font-display-league { font-family: 'League Gothic', sans-serif; }
/* .font-display-norwester { font-family: 'Norwester', sans-serif; } */
.font-display-hammersmith { font-family: 'Hammersmith One', sans-serif; }
/* .font-display-kollektif { font-family: 'Kollektif', sans-serif; } */

/* Slab Serif (for rustic/vintage accents) */
.font-slab-josefin { font-family: 'Josefin Slab', serif; }
```

---

## 3. Glassmorphism & UI Card Utility Classes

> **Note:** The accent gradient (`var(--accent-gradient)`) and primary colors should be adapted based on the selected palette above.

```css
/* Glassmorphism Card Container */
.glass-card {
  background: var(--color-bg-card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border-accent);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 var(--color-shadow);
  padding: 2rem 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px 0 var(--color-shadow);
}

/* Metallic/Accent Text Fill */
.gold-text {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

/* Accent Pill Button */
.btn-gold {
  background: var(--accent-gradient);
  color: var(--color-bg-base); /* Contrast text based on background */
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px var(--color-shadow);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--color-shadow);
  opacity: 0.95;
}

/* Primary Capsule Outline Button */
.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 0.85rem;
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: var(--color-primary);
  color: #FFFFFF;
}
```
