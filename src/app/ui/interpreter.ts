import { get } from 'lodash';

function generatePrecedence() {
  const precedence: any = {};
  let priority = 0;

  precedence['||'] = priority;
  priority++;

  precedence['&&'] = priority;
  priority++;

  precedence['=='] = priority;
  precedence['!='] = priority;
  priority++;

  precedence['>'] = priority;
  precedence['>='] = priority;
  precedence['<'] = priority;
  precedence['<='] = priority;
  priority++;

  precedence['+'] = priority;
  precedence['-'] = priority;
  priority++;

  precedence['*'] = priority;
  precedence['/'] = priority;
  priority++;

  return precedence;
}

export class Interpreter {
  constructor(private environment: any) {}

  static precedence = generatePrecedence();

  primary(ast: any) {
    return JSON.parse(ast.value);
  }

  unary(ast: any) {
    const { op, expr } = ast;

    switch (op) {
      case '-':
        return -this.evaluate(expr);
      case '!':
        return !this.evaluate(expr);
      default:
        return; // never
    }
  }

  binary(ast: any) {
    const stack: any[] = [];
    let current = ast.expr;

    for (const { op, expr } of ast.operations) {
      while (
        stack.length > 0 &&
        Interpreter.precedence[stack[stack.length - 1].op] >=
          Interpreter.precedence[op]
      ) {
        const prevNode = stack.pop();
        prevNode.right = current;
        current = prevNode;
      }

      stack.push({ type: '_binary', left: current, op });
      current = expr;
    }

    while (stack.length > 0) {
      const prevNode = stack.pop();
      prevNode.right = current;
      current = prevNode;
    }

    return this.evaluate(current);
  }

  _binary(ast: any) {
    const left = this.evaluate(ast.left);
    const right = this.evaluate(ast.right);

    switch (ast.op) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      case '>':
        return left > right;
      case '>=':
        return left >= right;
      case '<':
        return left < right;
      case '<=':
        return left <= right;
      case '==':
        return left == right;
      case '!=':
        return left != right;
      case '&&':
        return left && right;
      case '||':
        return left || right;
      default:
        return; // never
    }
  }

  context(ast: any) {
    return JSON.parse(get(this.environment, ast.context));
  }

  getter(ast: any) {
    const object = this.evaluate(ast.object);
    const path = this.evaluate(ast.path);
    return get(object, path);
  }

  condition(ast: any) {
    for (const { ifExpr, thenExpr } of ast.ifThenExprs) {
      if (this.evaluate(ifExpr)) {
        return this.evaluate(thenExpr);
      }
    }

    if (ast.elseDisabled) {
      return; // never
    }

    return this.evaluate(ast.elseExpr);
  }

  evaluate(ast: any): any {
    switch (ast.type) {
      case 'primary':
        return this.primary(ast);
      case 'unary':
        return this.unary(ast);
      case 'binary':
        return this.binary(ast);
      case '_binary':
        return this._binary(ast);
      case 'context':
        return this.context(ast);
      case 'getter':
        return this.getter(ast);
      case 'condition':
        return this.condition(ast);
      default:
        return; // never
    }
  }
}
