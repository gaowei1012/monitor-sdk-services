import { createLogger, format, transports } from 'winston'

type ITypeProps = {
  type: string | 'info' | 'error' | 'debug',
  filename: string | 'logger.log'
}

export const logger = (Options: ITypeProps) => createLogger({
  transports: [
    new transports.File({
      filename: Options.filename,
      level: Options.type,
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
      )
    })
  ]
})