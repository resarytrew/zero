export interface LinearForm {
  /** Coefficient of x */
  a: number;
  /** Constant term */
  b: number;
  hasVariable: boolean;
  hasOperator: boolean;
  hasBrackets: boolean;
  hasDivision: boolean;
}

export interface ParsedEquation {
  ok: true;
  left: LinearForm;
  right: LinearForm;
  /** Canonical form (left - right) = 0 => a*x + b = 0 */
  a: number;
  b: number;
  /** Unique root when a !== 0 */
  root: number | null;
  /** True when equation is trivial like "x = 5" without any algebraic operation */
  isTrivial: boolean;
  normalized: string;
}

export interface ParseFailure {
  ok: false;
  reason: 'empty' | 'missing_equals' | 'multiple_equals' | 'no_variable' | 'nonlinear' | 'div_zero' | 'syntax';
}

export type EquationParseResult = ParsedEquation | ParseFailure;

export interface ParsedArithmetic {
  ok: true;
  value: number;
  hasOperator: boolean;
  normalized: string;
}

export interface ArithmeticFailure {
  ok: false;
  reason: 'empty' | 'has_variable' | 'no_operator' | 'div_zero' | 'syntax';
}

export type ArithmeticParseResult = ParsedArithmetic | ArithmeticFailure;

const EPS = 1e-6;

export function normalizeMathInput(raw: string): string {
  return raw
    .trim()
    .replace(/[−–—]/g, '-')
    .replace(/[·×]/g, '*')
    .replace(/:/g, '/')
    .replace(/,/g, '.')
    .replace(/[хХXtTтТ]/g, 'x')
    .replace(/\s+/g, '');
}

type Token =
  | { type: 'num'; value: number }
  | { type: 'var' }
  | { type: 'op'; value: '+' | '-' | '*' | '/' }
  | { type: 'lparen' }
  | { type: 'rparen' };

function tokenize(expr: string): Token[] | null {
  const tokens: Token[] = [];
  let i = 0;

  while (i < expr.length) {
    const ch = expr[i];
    if (ch >= '0' && ch <= '9') {
      let start = i;
      let dotSeen = false;
      while (i < expr.length) {
        const c = expr[i];
        if (c >= '0' && c <= '9') {
          i++;
        } else if (c === '.' && !dotSeen) {
          dotSeen = true;
          i++;
        } else {
          break;
        }
      }
      const numStr = expr.slice(start, i);
      const val = Number(numStr);
      if (Number.isNaN(val)) return null;
      tokens.push({ type: 'num', value: val });
      continue;
    }

    if (ch === 'x') {
      tokens.push({ type: 'var' });
      i++;
      continue;
    }

    if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
      tokens.push({ type: 'op', value: ch });
      i++;
      continue;
    }

    if (ch === '(') {
      tokens.push({ type: 'lparen' });
      i++;
      continue;
    }

    if (ch === ')') {
      tokens.push({ type: 'rparen' });
      i++;
      continue;
    }

    return null;
  }

  return tokens;
}

class LinearParser {
  private pos = 0;
  private hasOperator = false;
  private hasBrackets = false;
  private hasDivision = false;
  private error: 'nonlinear' | 'div_zero' | 'syntax' | null = null;

  constructor(private readonly tokens: Token[]) {}

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private consume(): Token {
    return this.tokens[this.pos++];
  }

  parse(): { form: LinearForm } | { error: 'nonlinear' | 'div_zero' | 'syntax' } {
    if (this.tokens.length === 0) return { error: 'syntax' };
    const form = this.parseExpression();
    if (this.error) return { error: this.error };
    if (this.pos !== this.tokens.length) return { error: 'syntax' };
    return {
      form: {
        ...form,
        hasOperator: this.hasOperator,
        hasBrackets: this.hasBrackets,
        hasDivision: this.hasDivision,
      },
    };
  }

  private parseExpression(): { a: number; b: number; hasVariable: boolean } {
    let left = this.parseTerm();
    if (this.error) return left;

    while (true) {
      const tok = this.peek();
      if (tok && tok.type === 'op' && (tok.value === '+' || tok.value === '-')) {
        this.consume();
        this.hasOperator = true;
        const right = this.parseTerm();
        if (this.error) return left;
        const sign = tok.value === '+' ? 1 : -1;
        left = {
          a: left.a + sign * right.a,
          b: left.b + sign * right.b,
          hasVariable: left.hasVariable || right.hasVariable,
        };
      } else {
        break;
      }
    }

    return left;
  }

  private parseTerm(): { a: number; b: number; hasVariable: boolean } {
    let left = this.parseUnary();
    if (this.error) return left;

    while (true) {
      const tok = this.peek();
      if (tok && tok.type === 'op' && (tok.value === '*' || tok.value === '/')) {
        this.consume();
        this.hasOperator = true;
        if (tok.value === '/') this.hasDivision = true;
        const right = this.parseUnary();
        if (this.error) return left;

        if (tok.value === '*') {
          if (Math.abs(left.a) > EPS && Math.abs(right.a) > EPS) {
            this.error = 'nonlinear';
            return left;
          }
          left = {
            a: left.a * right.b + left.b * right.a,
            b: left.b * right.b,
            hasVariable: left.hasVariable || right.hasVariable,
          };
        } else {
          if (Math.abs(right.a) > EPS) {
            this.error = 'nonlinear';
            return left;
          }
          if (Math.abs(right.b) <= EPS) {
            this.error = 'div_zero';
            return left;
          }
          left = {
            a: left.a / right.b,
            b: left.b / right.b,
            hasVariable: left.hasVariable || right.hasVariable,
          };
        }
      } else if (tok && (tok.type === 'var' || tok.type === 'lparen')) {
        // Implicit multiplication: 4x, 2(10+x), (4+6)x, (1/2)x, 1/2x
        this.hasOperator = true;
        const right = this.parseUnary();
        if (this.error) return left;
        if (Math.abs(left.a) > EPS && Math.abs(right.a) > EPS) {
          this.error = 'nonlinear';
          return left;
        }
        left = {
          a: left.a * right.b + left.b * right.a,
          b: left.b * right.b,
          hasVariable: left.hasVariable || right.hasVariable,
        };
      } else {
        break;
      }
    }

    return left;
  }

  private parseUnary(): { a: number; b: number; hasVariable: boolean } {
    const tok = this.peek();
    if (tok && tok.type === 'op' && (tok.value === '+' || tok.value === '-')) {
      this.consume();
      const inner = this.parseUnary();
      if (this.error) return inner;
      const sign = tok.value === '-' ? -1 : 1;
      return {
        a: sign * inner.a,
        b: sign * inner.b,
        hasVariable: inner.hasVariable,
      };
    }
    return this.parsePrimary();
  }

  private parsePrimary(): { a: number; b: number; hasVariable: boolean } {
    const tok = this.peek();
    if (!tok) {
      this.error = 'syntax';
      return { a: 0, b: 0, hasVariable: false };
    }

    if (tok.type === 'num') {
      this.consume();
      return { a: 0, b: tok.value, hasVariable: false };
    }

    if (tok.type === 'var') {
      this.consume();
      return { a: 1, b: 0, hasVariable: true };
    }

    if (tok.type === 'lparen') {
      this.consume();
      this.hasBrackets = true;
      const inner = this.parseExpression();
      if (this.error) return inner;
      const closing = this.peek();
      if (!closing || closing.type !== 'rparen') {
        this.error = 'syntax';
        return inner;
      }
      this.consume();
      return inner;
    }

    this.error = 'syntax';
    return { a: 0, b: 0, hasVariable: false };
  }
}

export function parseLinearEquation(rawInput: string): EquationParseResult {
  const normalized = normalizeMathInput(rawInput);
  if (!normalized) return { ok: false, reason: 'empty' };

  const parts = normalized.split('=');
  if (parts.length < 2) return { ok: false, reason: 'missing_equals' };
  if (parts.length > 2) return { ok: false, reason: 'multiple_equals' };

  const [leftRaw, rightRaw] = parts;
  if (!leftRaw || !rightRaw) return { ok: false, reason: 'syntax' };

  const leftTokens = tokenize(leftRaw);
  const rightTokens = tokenize(rightRaw);
  if (!leftTokens || !rightTokens) return { ok: false, reason: 'syntax' };

  const leftParsed = new LinearParser(leftTokens).parse();
  if ('error' in leftParsed) return { ok: false, reason: leftParsed.error };

  const rightParsed = new LinearParser(rightTokens).parse();
  if ('error' in rightParsed) return { ok: false, reason: rightParsed.error };

  const left = leftParsed.form;
  const right = rightParsed.form;

  if (!left.hasVariable && !right.hasVariable) {
    return { ok: false, reason: 'no_variable' };
  }

  const a = left.a - right.a;
  const b = left.b - right.b;
  const root = Math.abs(a) > EPS ? -b / a : null;

  const isBareVarLeft =
    Math.abs(Math.abs(left.a) - 1) <= EPS &&
    Math.abs(left.b) <= EPS &&
    !left.hasOperator &&
    Math.abs(right.a) <= EPS &&
    !right.hasOperator;
  const isBareVarRight =
    Math.abs(Math.abs(right.a) - 1) <= EPS &&
    Math.abs(right.b) <= EPS &&
    !right.hasOperator &&
    Math.abs(left.a) <= EPS &&
    !left.hasOperator;

  return {
    ok: true,
    left,
    right,
    a,
    b,
    root,
    isTrivial: isBareVarLeft || isBareVarRight,
    normalized,
  };
}

export function parseArithmeticExpression(rawInput: string): ArithmeticParseResult {
  const normalized = normalizeMathInput(rawInput);
  if (!normalized) return { ok: false, reason: 'empty' };
  if (normalized.includes('=')) {
    // Allow trailing "= <val>" or reject? Better: strip "= <ans>" only if RHS is a pure number?
    // Keep clean: arithmetic expression should not contain '='
    const parts = normalized.split('=');
    if (parts.length === 2 && parts[0] && parts[1]) {
      const lhsRes = parseArithmeticExpression(parts[0]);
      const rhsVal = Number(parts[1]);
      if (lhsRes.ok && !Number.isNaN(rhsVal) && Math.abs(lhsRes.value - rhsVal) <= EPS) {
        return lhsRes;
      }
    }
    return { ok: false, reason: 'syntax' };
  }

  const tokens = tokenize(normalized);
  if (!tokens) return { ok: false, reason: 'syntax' };

  const parsed = new LinearParser(tokens).parse();
  if ('error' in parsed) {
    return {
      ok: false,
      reason: parsed.error === 'div_zero' ? 'div_zero' : 'syntax',
    };
  }

  if (parsed.form.hasVariable) {
    return { ok: false, reason: 'has_variable' };
  }
  if (!parsed.form.hasOperator) {
    return { ok: false, reason: 'no_operator' };
  }

  return {
    ok: true,
    value: parsed.form.b,
    hasOperator: parsed.form.hasOperator,
    normalized,
  };
}

export function isEquationEquivalentToRoots(
  parsed: ParsedEquation,
  acceptedRoots: number[],
): boolean {
  if (parsed.root === null || parsed.isTrivial) return false;
  return acceptedRoots.some((expected) => Math.abs(parsed.root! - expected) <= 1e-4);
}
