export class CPF {
  VALID_LENGTH = 11;
  FIRST_VERIFIER_DIGIT_FACTOR = 10;
  SECOND_VERIFIER_DIGIT_FACTOR = 11;

  constructor(readonly value: string) {
    if (!this.isValid(value)) throw new Error("CPF Inválido");
  }

  private isValid(cpf: string) {
    if (!cpf) return false;
    cpf = this.removeSpecialCharactersFromCPF(cpf);
    if (!this.hasCorrectLength(cpf)) return false;
    if (this.isAllTheSameCharOnCpf(cpf)) return false;

    const digit1 = this.getFactorDigit(cpf, this.FIRST_VERIFIER_DIGIT_FACTOR);
    const digit2 = this.getFactorDigit(cpf, this.SECOND_VERIFIER_DIGIT_FACTOR);
    let checkDigit = this.extractCheckDigit(cpf);
    const calculatedCheckDigit = `${digit1}${digit2}`;
    return checkDigit == calculatedCheckDigit;
  }

  private removeSpecialCharactersFromCPF(cpf: string) {
    return cpf.replace(/\D+/g, "");
  }

  private hasCorrectLength(cpf: string) {
    return cpf.length === this.VALID_LENGTH;
  }

  private isAllTheSameCharOnCpf(cpf: string) {
    const [firstDigit, ...restDigits] = cpf;
    return restDigits.every((digit) => digit === firstDigit);
  }

  private getFactorDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) {
        total += parseInt(digit) * factor--;
      }
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  private extractCheckDigit(cpf: string) {
    return cpf.slice(-2);
  }
}
