class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(mute: boolean): void {
    this.muted = mute;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    return this.muted;
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.08,
    delay = 0,
  ): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playClick(): void {
    this.playTone(540, 0.08, 'triangle', 0.05);
  }

  public playCorrect(): void {
    this.playTone(523.25, 0.16, 'triangle', 0.08, 0);
    this.playTone(659.25, 0.18, 'triangle', 0.08, 0.07);
    this.playTone(783.99, 0.24, 'sine', 0.09, 0.14);
  }

  public playError(): void {
    this.playTone(220, 0.16, 'sawtooth', 0.045, 0);
    this.playTone(185, 0.22, 'sawtooth', 0.045, 0.09);
  }

  public playLawUnlock(): void {
    this.playTone(440, 0.18, 'sine', 0.08, 0);
    this.playTone(554.37, 0.2, 'sine', 0.08, 0.08);
    this.playTone(659.25, 0.22, 'sine', 0.08, 0.16);
    this.playTone(880, 0.36, 'triangle', 0.09, 0.24);
  }

  public playBossHit(): void {
    this.playTone(320, 0.12, 'square', 0.05, 0);
    this.playTone(640, 0.22, 'triangle', 0.08, 0.06);
  }

  public playVictory(): void {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.34, 'triangle', 0.09, idx * 0.1);
    });
  }
}

export const soundEngine = new SoundEngine();
