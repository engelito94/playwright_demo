import * as fs from 'fs';
import * as path from 'path';

export interface Zaznam {
  meno: string;
  priezvisko: string;
  rc: string;
  cislo: string;
}

export interface DietaRiad {
  meno: string;
  priezvisko: string;
  rc: string;
}

export class Subor {
  /**
   * Načíta a vymaže náhodný záznam zo súboru
   * @param nazovSuboru Názov .txt súboru
   * @return Vráti dáta (meno, priezvisko, RC, číslo RC)
   */
  async nacitajNahodnyZaznam(nazovSuboru: string): Promise<Zaznam | null> {
    let riadky: string[] = [];

    try {
      const content = fs.readFileSync(nazovSuboru, 'utf-8');
      riadky = content.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
      const e = error as NodeJS.ErrnoException;
      console.log(`Chyba pri čítaní súboru: ${e.message}`);
      return null;
    }

    if (riadky.length === 0) {
      console.log('Súbor je prázdny.');
      return null;
    }

    const nahodnyIndex = Math.floor(Math.random() * riadky.length);
    const nahodnyRiadok = riadky[nahodnyIndex];

    // Odstranenie použitého riadku zo zoznamu
    riadky.splice(nahodnyIndex, 1);

    // Prepísanie súboru bez použitého riadku
    try {
      fs.writeFileSync(nazovSuboru, riadky.join('\n'), 'utf-8');
    } catch (error) {
      const e = error as NodeJS.ErrnoException;
      console.log(`Chyba pri písaní súboru: ${e.message}`);
      return null;
    }

    const udaje = nahodnyRiadok.split(';');
    if (udaje.length === 4) {
      return {
        meno: udaje[0],
        priezvisko: udaje[1],
        rc: udaje[2],
        cislo: udaje[3]
      };
    } else {
      console.log(`Nesprávny formát riadku v súbore: ${nahodnyRiadok}`);
      return null;
    }
  }

  /**
   * Načíta náhodný riadok pre dieťu s RC
   * @param nazovSuboru Názov .txt súboru
   * @return Vráti dáta (meno, priezvisko, RC)
   */
  async dajDietaRiadSS(nazovSuboru: string): Promise<DietaRiad | null> {
    let riadky: string[] = [];

    try {
      const content = fs.readFileSync(nazovSuboru, 'utf-8');
      riadky = content.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
      const e = error as NodeJS.ErrnoException;
      console.log(`Chyba pri čítaní súboru: ${e.message}`);
      return null;
    }

    if (riadky.length === 0) {
      console.log('Súbor je prázdny.');
      return null;
    }

    const nahodnyIndex = Math.floor(Math.random() * riadky.length);
    const nahodnyRiadok = riadky[nahodnyIndex];

    // Odstranenie použitého riadku zo zoznamu
    riadky.splice(nahodnyIndex, 1);

    // Prepísanie súboru bez použitého riadku
    try {
      fs.writeFileSync(nazovSuboru, riadky.join('\n'), 'utf-8');
    } catch (error) {
      const e = error as NodeJS.ErrnoException;
      console.log(`Chyba pri písaní súboru: ${e.message}`);
      return null;
    }

    const udaje = nahodnyRiadok.split(';');
    if (udaje.length >= 3) {
      return {
        meno: udaje[0],
        priezvisko: udaje[1],
        rc: udaje[2]
      };
    } else {
      console.log(`Nesprávny formát riadku v súbore: ${nahodnyRiadok}`);
      return null;
    }
  }

  /**
   * Zapíše údaje na prenos
   */
  async zapisUdajeNaPrenos(meno: string, priezvisko: string): Promise<void> {
    const prenosSoubor = path.join('Data Files', 'prenosUdajov.txt');
    fs.writeFileSync(prenosSoubor, `${meno}|${priezvisko}`, 'utf-8');
  }

  /**
   * Prečíta prenesené údaje
   */
  async precitajPreneseneUdaje(): Promise<{ meno: string; priezvisko: string }> {
    const prenosSoubor = path.join('Data Files', 'prenosUdajov.txt');

    if (!fs.existsSync(prenosSoubor)) {
      throw new RuntimeException('Súbor prenosUdajov.txt neexistuje!');
    }

    const riadok = fs.readFileSync(prenosSoubor, 'utf-8');
    const parts = riadok.split('|');

    return {
      meno: parts[0],
      priezvisko: parts[1]
    };
  }
}

// Helper class pre RuntimeException
class RuntimeException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RuntimeException';
  }
}