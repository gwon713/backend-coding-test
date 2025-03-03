import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const logDir = 'logs';  // logs 디렉토리 하위에 로그 파일 저장
const { combine, timestamp, printf, colorize} = winston.format;

// Define log format
const logFormat = printf(info => { return `[ ${info.level} ] ${info.timestamp} : ${info.message}`});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const logger = winston.createLogger({
    format: 
        combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat,
        ),
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 30,  // 30일치 로그 파일 저장
            zippedArchive: true, 
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

// Production 환경이 아닌 경우(dev 등) 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({ // 콘솔에 출력할 로그 포멧 설정
        format: combine(
            colorize({ all: true }),
            logFormat,
        )
    }));
}

export default logger;