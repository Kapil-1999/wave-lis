import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-calculator-page',
  standalone: false,
  templateUrl: './calculator-page.component.html',
  styleUrls: ['./calculator-page.component.scss']
})
export class CalculatorPageComponent {
  currentOperand: string = '';
  previousOperand: string = '';
  operation: string | undefined = undefined;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardInput(event: KeyboardEvent) {
    event.preventDefault();
    
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
      this.appendNumber(event.key);
    }
    
    if (event.key === '+' || event.key === '-') {
      this.chooseOperation(event.key);
    }
    
    if (event.key === '*') {
      this.chooseOperation('×');
    }
    
    if (event.key === '/') {
      this.chooseOperation('÷');
    }
    
    if (event.key === 'Enter' || event.key === '=') {
      this.compute();
    }
    
    if (event.key === 'Backspace') {
      this.delete();
    }
    
    if (event.key === 'Escape') {
      this.clear();
    }
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number: string) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation: string) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = '';
  }
}
