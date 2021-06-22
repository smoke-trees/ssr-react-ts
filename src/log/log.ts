interface LoggerOptions {
  frontendLogging: boolean;
  backendLogging: boolean;
}

class Logger {
  options: LoggerOptions;
  backend: boolean;
  frontend: boolean;
  constructor (options?: Partial<LoggerOptions>) {
    this.options = {
      backendLogging: options?.backendLogging ?? false,
      frontendLogging: options?.frontendLogging ?? false
    }
    this.backend = typeof process !== 'undefined'
    this.frontend = typeof window !== 'undefined'
  }

  log (...args: any) {
    if (this.backend && !this.options.backendLogging) {
      return
    }
    if (this.frontend && !this.options.frontendLogging) {
      return
    }
    console.log('%c LOG: ', 'background:#222; color: #bada55;font-weight: bold;', ...args)
  }

  error (...args: any) {
    if (this.backend && !this.options.backendLogging) {
      return
    }
    if (this.frontend && !this.options.frontendLogging) {
      return
    }
    console.log('%c ERROR: ', 'background:#222; color: #d63031;font-weight: bold;', ...args)
  }

  warn (...args: any) {
    if (this.backend && !this.options.backendLogging) {
      return
    }
    if (this.frontend && !this.options.frontendLogging) {
      return
    }
    console.log('%c WARN: ', 'background:#222; color: #fdcb6e;font-weight: bold;', ...args)
  }

  debug (...args: any) {
    if (this.backend && !this.options.backendLogging) {
      return
    }
    if (this.frontend && !this.options.frontendLogging) {
      return
    }
    console.log('%c DEBUG: ', 'background:#222; color: #dfe6e9;font-weight: bold;', ...args)
  }

  info (...args: any) {
    if (this.backend && !this.options.backendLogging) {
      return
    }
    if (this.frontend && !this.options.frontendLogging) {
      return
    }
    console.log('%c INFO:', 'background:#222; color: #55efc4;font-weight: bold;', ...args)
  }
}

export const frontendLogger = new Logger({ frontendLogging: true, backendLogging: false })
export const backendLogger = new Logger({ frontendLogging: false, backendLogging: true })
const logger = new Logger({ frontendLogging: true, backendLogging: true })

export default logger
