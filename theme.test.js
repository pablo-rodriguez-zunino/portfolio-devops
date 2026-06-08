import { describe, it, expect, vi } from 'vitest';
import { nextTheme, getStoredTheme, applyTheme, toggleTheme } from './theme.js';

describe('nextTheme', () => {
  it('returns light when current is dark', () => {
    expect(nextTheme('dark')).toBe('light');
  });

  it('returns dark when current is light', () => {
    expect(nextTheme('light')).toBe('dark');
  });
});

describe('getStoredTheme', () => {
  it('returns the stored theme', () => {
    const storage = { getItem: () => 'light' };
    expect(getStoredTheme(storage)).toBe('light');
  });

  it('defaults to dark when nothing is stored', () => {
    const storage = { getItem: () => null };
    expect(getStoredTheme(storage)).toBe('dark');
  });
});

describe('applyTheme', () => {
  it('sets data-theme attribute and saves to storage', () => {
    const root = { setAttribute: vi.fn() };
    const storage = { setItem: vi.fn() };
    applyTheme('light', root, storage);
    expect(root.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
    expect(storage.setItem).toHaveBeenCalledWith('theme', 'light');
  });
});

describe('toggleTheme', () => {
  it('toggles from dark to light', () => {
    const root = { setAttribute: vi.fn() };
    const storage = { getItem: () => 'dark', setItem: vi.fn() };
    expect(toggleTheme(root, storage)).toBe('light');
  });

  it('toggles from light to dark', () => {
    const root = { setAttribute: vi.fn() };
    const storage = { getItem: () => 'light', setItem: vi.fn() };
    expect(toggleTheme(root, storage)).toBe('dark');
  });
});
